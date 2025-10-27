import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-white">404</h1>
      <p className="mt-4 text-xl text-neutral-400">Page not found</p>
      <Link
        href="/"
        className="mt-6 rounded bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
}