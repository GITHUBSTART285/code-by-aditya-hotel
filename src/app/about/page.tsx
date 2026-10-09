import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | Aditya Hotel",
  description:
    "Learn more about Aditya Hotel, our hospitality, comfortable rooms, modern facilities, and commitment to a memorable guest experience.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-slate-900 py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-amber-400 sm:text-sm">
            About Aditya Hotel
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            Your Comfort Is Our Priority
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
            Discover a comfortable stay, modern facilities, and warm
            hospitality designed to make every guest feel at home.
          </p>
        </div>
      </section>

      {/* About Hotel */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12">
          {/* Image */}
          <div className="relative h-64 overflow-hidden rounded-2xl sm:h-80 lg:h-[450px]">
            <Image
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
              alt="Aditya Hotel"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[3px] text-amber-500 sm:text-sm">
              Who We Are
            </p>

            <h2 className="mt-3 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl md:text-4xl">
              A Comfortable Stay With Warm Hospitality
            </h2>

            <p className="mt-5 text-sm leading-6 text-slate-600 sm:mt-6 sm:text-base sm:leading-7">
              Aditya Hotel is designed to provide guests with a comfortable,
              relaxing, and memorable stay. Our focus is on clean rooms,
              modern facilities, quality service, and friendly hospitality.
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              Whether you are travelling for business, spending time with
              family, or enjoying a vacation, we aim to provide everything
              you need for a pleasant experience.
            </p>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-5">
              <div className="rounded-xl bg-white p-4 text-center sm:p-5">
                <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  6+
                </h3>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Room Types
                </p>
              </div>

              <div className="rounded-xl bg-white p-4 text-center sm:p-5">
                <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  24/7
                </h3>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Guest Support
                </p>
              </div>

              <div className="rounded-xl bg-white p-4 text-center sm:p-5">
                <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  100%
                </h3>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  Guest Focus
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-amber-500 sm:text-sm">
            Our Mission
          </p>

          <h2 className="mt-3 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl md:text-4xl">
            Making Every Stay Memorable
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-slate-600 sm:mt-5 sm:text-base sm:leading-7">
            Our mission is to create a welcoming environment where guests can
            relax, enjoy quality service, and experience a comfortable stay
            from check-in to check-out.
          </p>

          {/* Mission Cards */}
          <div className="mt-10 grid gap-5 sm:mt-12 md:grid-cols-3 md:gap-6">
            {/* Card 1 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
              <div className="text-3xl">🏨</div>

              <h3 className="mt-4 text-lg font-bold text-slate-900 sm:text-xl">
                Comfortable Rooms
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                Well-designed rooms with modern facilities for a relaxing
                experience.
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
              <div className="text-3xl">🤝</div>

              <h3 className="mt-4 text-lg font-bold text-slate-900 sm:text-xl">
                Friendly Service
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                Our team is focused on providing helpful and welcoming
                service.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-7">
              <div className="text-3xl">✨</div>

              <h3 className="mt-4 text-lg font-bold text-slate-900 sm:text-xl">
                Quality Experience
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                Thoughtful facilities and services designed around our
                guests.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}