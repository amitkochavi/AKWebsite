import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-serif text-6xl font-bold text-brand">404</p>
      <h1 className="mt-4 text-2xl font-bold">Page not found</h1>
      <Link
        href="/"
        className="mt-6 rounded bg-ink px-5 py-2.5 text-sm font-semibold text-white hover:bg-ink-soft"
      >
        ← Home
      </Link>
    </Container>
  );
}
