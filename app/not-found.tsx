import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="grid min-h-[60vh] place-items-center px-5 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-3xl font-bold">Page not found</h1>
        <p className="mt-3 text-ink-soft">The page you are looking for doesn’t exist.</p>
        <Link href="/en" className="btn-primary mt-6">
          Go home
        </Link>
      </div>
    </div>
  );
}
