export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[3px] text-amber-500">
          Aditya Hotel
        </p>

        <h1 className="mt-3 text-6xl font-bold text-slate-900">
          404
        </h1>

        <h2 className="mt-3 text-2xl font-bold text-slate-900">
          Page Not Found
        </h2>

        <p className="mt-3 text-slate-600">
          Sorry, the page you are looking for does not exist.
        </p>

        <a
          href="/"
          className="mt-6 inline-block rounded-lg bg-amber-500 px-6 py-3 font-semibold text-slate-900 transition hover:bg-amber-400"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}