import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <section>
      <h1>404</h1>
      <hr className="title-rule" aria-hidden />
      <p className="text-lg text-muted">
        The page you are looking for could not be found.
      </p>
      <p className="mt-6">
        <Link href="/" className="text-accent hover:text-accent-dark">
          Return to the homepage
        </Link>
      </p>
    </section>
  );
}
