import { BrandLogo } from "@/components/ui/BrandLogo";
import { BRAND_LOGO } from "@/data/brand";

export default function Loading() {
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center bg-navy-deep px-4">
      <BrandLogo
        variant="reverse"
        height={BRAND_LOGO.sizes.navbarDesktop}
        className="h-11 w-auto md:h-12"
      />
      <p className="mt-6 text-[14px] font-medium tracking-wide text-white/60">
        Loading premium properties…
      </p>
    </div>
  );
}
