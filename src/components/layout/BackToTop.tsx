"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Floating "back to top" control. Appears once the page is scrolled and is
 * shown on phones and tablets (hidden on large screens where the page is
 * short and a mouse makes scrolling easy).
 */
export function BackToTop() {
  const t = useTranslations("common");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label={t("backToTop")}
      className="fixed bottom-5 end-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-lg text-accent shadow-sm hover:border-accent lg:hidden"
    >
      <span aria-hidden>↑</span>
    </button>
  );
}
