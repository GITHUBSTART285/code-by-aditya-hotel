export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header Skeleton */}
      <section className="bg-slate-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 text-center sm:px-6">
          <div className="mx-auto h-4 w-24 animate-pulse rounded bg-slate-700" />

          <div className="mx-auto mt-4 h-10 w-52 animate-pulse rounded bg-slate-700" />

          <div className="mx-auto mt-5 h-5 max-w-xl animate-pulse rounded bg-slate-700" />
        </div>
      </section>

      {/* Room Cards Skeleton */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                {/* Image Skeleton */}
                <div className="h-56 animate-pulse bg-slate-200" />

                {/* Content Skeleton */}
                <div className="space-y-4 p-6">
                  <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200" />

                  <div className="h-4 w-full animate-pulse rounded bg-slate-200" />

                  <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />

                  <div className="flex items-center justify-between pt-3">
                    <div className="h-6 w-24 animate-pulse rounded bg-slate-200" />

                    <div className="h-10 w-28 animate-pulse rounded-lg bg-slate-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}