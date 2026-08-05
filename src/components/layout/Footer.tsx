export function Footer({ siteName }: { siteName: string }) {
  return (
    <footer className="mt-16 border-t border-line py-8 text-sm text-muted">
      <div className="flex flex-wrap items-center gap-4">
        <a
          href="https://x.com/AmitKochavi"
          target="_blank"
          rel="me noopener"
          className="text-accent hover:text-accent-dark"
        >
          X
        </a>
        <a
          href="https://www.linkedin.com/in/amitkochavi/"
          target="_blank"
          rel="me noopener"
          className="text-accent hover:text-accent-dark"
        >
          LinkedIn
        </a>
      </div>
      <p className="mt-4">© {siteName} 2026</p>
    </footer>
  );
}
