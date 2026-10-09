import Image from "next/image";
import Link from "next/link";

const galleryImages = [
  {
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945",
    title: "Hotel Exterior",
  },
  {
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a",
    title: "Luxury Room",
  },
  {
    image:
      "https://images.unsplash.com/photo-1540541338287-41700207dee6",
    title: "Swimming Pool",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    title: "Restaurant",
  },
  {
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427",
    title: "Premium Room",
  },
  {
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa",
    title: "Hotel Interior",
  },
];

export default function Gallery() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-amber-500 sm:text-sm">
            Explore Our Hotel
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Hotel Gallery
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            Take a look at our beautiful rooms, facilities, restaurant, and
            hotel spaces.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {galleryImages.map((item) => (
            <div
              key={item.title}
              className="group relative h-64 overflow-hidden rounded-2xl sm:h-72"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                //unoptimized
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-black/10 to-transparent p-5 sm:p-6">
                <h3 className="text-lg font-bold text-white sm:text-xl">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/gallery"
            className="inline-block rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-500 hover:text-slate-900"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}