// Builds each app in apps/* independently (each is a full standalone TanStack Start app,
// each producing its own Vercel Build Output API v3 output), then merges the outputs into
// a single top-level `.vercel/output` so this repo deploys as ONE Vercel project:
//   /insurance/demo    -> apps/callvibe-insurance
//   /travels/demo      -> apps/travel-demo
//   /haya              -> apps/haya-demo (own /register, /login, /demo routes)
// The bare domain root ("/") is intentionally unmatched and 404s.
import { execFileSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = import.meta.dirname;
const OUT = join(ROOT, ".vercel", "output");

// segments: [] means this app is mounted at the domain root, with no path prefix.
const apps = [
  { slug: "callvibe-insurance", segments: ["insurance", "demo"] },
  { slug: "travel-demo", segments: ["travels", "demo"] },
  { slug: "haya-demo", segments: ["haya"] },
];

function run(command, args, cwd, extraEnv = {}) {
  console.log(`\n[build] ${cwd} $ ${command} ${args.join(" ")}`);
  execFileSync(command, args, {
    cwd,
    stdio: "inherit",
    shell: process.platform === "win32",
    env: { ...process.env, ...extraEnv },
  });
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(join(OUT, "static"), { recursive: true });
mkdirSync(join(OUT, "functions"), { recursive: true });

const assetRoutes = [];
const destRoutes = [];
let rootApp = null;

for (const app of apps) {
  const appDir = join(ROOT, "apps", app.slug);
  const prefix = app.segments.length ? `/${app.segments.join("/")}` : "";

  run("npm", ["install"], appDir);
  // Force Nitro's Vercel preset even when building locally (Vercel's own build
  // containers already set this, so this is a no-op there and a simulation here).
  run("npm", ["run", "build"], appDir, { VERCEL: "1", VERCEL_ENV: "production" });

  const appOutput = join(appDir, ".vercel", "output");
  const appStatic = join(appOutput, "static");
  const appFunc = join(appOutput, "functions", "__server.func");

  if (!existsSync(appStatic) || !existsSync(appFunc)) {
    throw new Error(
      `[build] ${app.slug} did not produce the expected .vercel/output (static/__server.func). ` +
        "Check that nitro picked the 'vercel' preset for this build.",
    );
  }

  const staticDest = app.segments.length ? join(OUT, "static", ...app.segments) : join(OUT, "static");
  cpSync(appStatic, staticDest, { recursive: true });
  cpSync(appFunc, join(OUT, "functions", `${app.slug}.func`), { recursive: true });

  assetRoutes.push({
    src: `^${prefix}/assets/(.*)$`,
    headers: { "cache-control": "public, max-age=31536000, immutable" },
  });

  if (app.segments.length) {
    destRoutes.push({ src: `^${prefix}(?:/.*)?$`, dest: `/${app.slug}` });
  } else {
    // The root app is the fallback for anything not matched above — must be last.
    rootApp = app;
  }
}

const routes = [
  ...assetRoutes,
  { handle: "filesystem" },
  ...destRoutes,
  ...(rootApp ? [{ src: "^/.*$", dest: `/${rootApp.slug}` }] : []),
];

writeFileSync(join(OUT, "config.json"), JSON.stringify({ version: 3, routes }, null, 2));

console.log("\n[build] done — .vercel/output ready:");
for (const app of apps) {
  console.log(`  ${app.segments.length ? "/" + app.segments.join("/") : "/ (root)"} -> functions/${app.slug}.func`);
}
