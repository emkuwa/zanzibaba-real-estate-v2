"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

const CLARITY_PROJECT_ID = "wz5621zcbf";

declare global {
  interface Window {
    clarity: (
      command: "set" | "upgrade" | "identify" | "consent",
      ...args: (string | Record<string, string | number | boolean>)[]
    ) => void;
  }
}

export function MicrosoftClarity() {
  const pathname = usePathname();

  // Notify Clarity of route changes in the SPA
  useEffect(() => {
    if (typeof window !== "undefined" && window.clarity) {
      window.clarity("set", "pageview");
    }
  }, [pathname]);

  return (
    <Script
      id="microsoft-clarity-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");`,
      }}
    />
  );
}
