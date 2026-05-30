"use client";

import { useEffect, useState } from "react";

/** True after the client has hydrated — use to gate SSR-unsafe animations. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
