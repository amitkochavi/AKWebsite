import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer({ siteName }: { siteName: string }) {
  return (
    <footer className="mt-16 border-t border-line py-8 text-sm text-muted">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <LanguageSwitcher />
        <a
          href="https://x.com/AmitKochavi"
          target="_blank"
          rel="noopener"
          className="text-accent hover:text-accent-dark"
        >
          X
        </a>
      </div>
      <p className="mt-4">© {siteName} 2026</p>
    </footer>
  );
}
