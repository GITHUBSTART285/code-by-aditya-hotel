const facilities = [
  {
    icon: "📶",
    title: "Free Wi-Fi",
    description:
      "High-speed internet available throughout the hotel.",
  },
  {
    icon: "🏊",
    title: "Swimming Pool",
    description:
      "Relax and enjoy our clean and comfortable swimming pool.",
  },
  {
    icon: "🍽️",
    title: "Restaurant",
    description:
      "Enjoy delicious meals prepared by our professional chefs.",
  },
  {
    icon: "🚗",
    title: "Free Parking",
    description:
      "Safe and convenient parking available for our guests.",
  },
  {
    icon: "🛎️",
    title: "Room Service",
    description:
      "Get quality service and assistance whenever you need it.",
  },
  {
    icon: "💪",
    title: "Fitness Center",
    description:
      "Stay active with our modern fitness facilities.",
  },
];

export default function Facilities() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">

        {/* Heading */}
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-amber-500 sm:text-sm">
            Hotel Facilities
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Everything You Need
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            Enjoy modern facilities and thoughtful services designed
            to make your stay comfortable and relaxing.
          </p>
        </div>

        {/* Facilities */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {facilities.map((facility) => (
            <div
              key={facility.title}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:shadow-lg sm:p-7"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-amber-100 text-2xl">
                {facility.icon}
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900 sm:text-xl">
                {facility.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                {facility.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}