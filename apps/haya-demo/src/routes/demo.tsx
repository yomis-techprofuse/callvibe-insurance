import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import { useLayoutEffect, useState } from "react";
import { Sidebar } from "../components/mi/sidebar";
import { TopBar } from "../components/mi/topbar";
import { AUTH_KEY } from "../lib/auth-storage";

function DemoLayout() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);

  // Runs client-only, before paint — avoids a hydration mismatch (server
  // always renders unauthenticated) while still avoiding a visible flash
  // for a returning, already-authenticated visitor.
  useLayoutEffect(() => {
    if (localStorage.getItem(AUTH_KEY) === "1") {
      setAuthed(true);
    } else {
      router.navigate({ to: "/login" });
    }
  }, []);

  if (!authed) return null;

  return (
    <div className="min-h-screen bg-canvas">
      <Sidebar />
      <div className="pl-[240px]">
        <TopBar />
        <main className="px-6 py-5">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/demo")({
  component: DemoLayout,
});
