const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Business Traveler",
    message:
      "The rooms were very clean and comfortable. The staff was friendly and the overall experience was excellent.",
  },
  {
    name: "Priya Verma",
    role: "Family Guest",
    message:
      "We had a wonderful stay at Aditya Hotel. The facilities were great and the service was very helpful.",
  },
  {
    name: "Amit Singh",
    role: "Regular Guest",
    message:
      "A comfortable place with modern rooms, good service, and a peaceful atmosphere. I would definitely visit again.",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-slate-900 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {/* Heading */}
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-amber-400 sm:text-sm">
            Guest Reviews
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            What Our Guests Say
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
            Hear from our guests about their experience at Aditya Hotel.
          </p>
        </div>

        {/* Testimonials */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-2xl border border-slate-700 bg-slate-800 p-6 transition hover:-translate-y-1 hover:shadow-lg sm:p-7"
            >
              {/* Stars */}
              <div className="text-lg tracking-wide text-amber-400">
                ★★★★★
              </div>

              {/* Message */}
              <p className="mt-5 text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
                "{testimonial.message}"
              </p>

              {/* User */}
              <div className="mt-6 border-t border-slate-700 pt-5">
                <h3 className="font-bold text-white">
                  {testimonial.name}
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}