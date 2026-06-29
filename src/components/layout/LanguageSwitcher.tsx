"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";

/** Toggles between English and Hebrew while preserving the current path. */
export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("common");
  const [isPending, startTransition] = useTransition();

  const target = locale === "he" ? "en" : "he";

  return (
    <button
      type="button"
      aria-label={t("switchLanguageAria")}
      disabled={isPending}
      onClick={() =>
        startTransition(() => {
          router.replace(pathname, { locale: target });
        })
      }
      className="rounded border border-line px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-cream disabled:opacity-50"
    >
      {t("switchLanguage")}
    </button>
  );
}
