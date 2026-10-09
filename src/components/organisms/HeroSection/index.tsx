import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[520px] items-center bg-slate-900 md:min-h-[600px]">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-6 sm:py-20">
        <div className="max-w-2xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-amber-400 sm:text-sm sm:tracking-[4px]">
            Welcome to Aditya Hotel
          </p>

          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-6xl">
            Experience Comfort,
            <span className="block text-amber-400">
              Elegance & Luxury
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
            Enjoy a comfortable stay with premium rooms, modern facilities,
            and warm hospitality at Aditya Hotel.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
            <Link
              href="/booking"
              className="w-full rounded-lg bg-amber-500 px-6 py-3 text-center font-semibold text-slate-900 transition hover:bg-amber-400 sm:w-auto"
            >
              Book Your Stay
            </Link>

            <Link
              href="/rooms"
              className="w-full rounded-lg border border-white px-6 py-3 text-center font-semibold text-white transition hover:bg-white hover:text-slate-900 sm:w-auto"
            >
              Explore Rooms
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}