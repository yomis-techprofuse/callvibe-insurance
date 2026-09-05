import { PRODUCT, CONFIG_LABEL } from "@/data/techtar";

export function BrandHeader() {
  return (
    <div className="mb-6 flex flex-col items-center text-center">
      <img
        src={`${import.meta.env.BASE_URL}favicon.png`}
        alt={`${PRODUCT} logo`}
        className="mb-3 h-12 w-12 rounded-xl shadow-sm"
      />
      <span className="text-[15px] font-semibold tracking-tight text-foreground">{PRODUCT}</span>
      <span className="text-[11.5px] font-medium text-muted-foreground">{CONFIG_LABEL}</span>
    </div>
  );
}
