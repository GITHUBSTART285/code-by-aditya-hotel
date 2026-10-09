
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { rooms } from "@/data/rooms";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const room = rooms.find((item) => item.id === id);

  if (!room) {
    return {
      title: "Room Not Found | Aditya Hotel",
      description: "The requested room could not be found.",
    };
  }

  return {
    title: `${room.name} | Aditya Hotel`,
    description: room.description,
  };
}

export default async function RoomDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  }>;
}) {
  const { id } = await params;
  const { checkIn, checkOut, guests } = await searchParams;


 const room = rooms.find((item) => item.id === id);

if (!room) {
  notFound();
}

const relatedRooms = rooms
  .filter((item) => item.id !== room.id)
  .slice(0, 3);



  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-900 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <Link
            href="/rooms"
            className="text-sm font-medium text-amber-400 hover:text-amber-300"
          >
            ← Back to Rooms
          </Link>

          <h1 className="mt-5 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            {room.name}
          </h1>
        </div>
      </section>
{/* Related Rooms */}
<section className="border-t border-slate-200 py-10 sm:py-14 lg:py-20">
  <div className="mx-auto max-w-7xl px-5 sm:px-6">
    <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
      You May Also Like
    </h2>

    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {relatedRooms.map((relatedRoom) => (
        <div
          key={relatedRoom.id}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="relative h-56">
            <Image
              src={relatedRoom.image}
              alt={relatedRoom.name}
              fill
              unoptimized
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover"
            />
          </div>

          <div className="p-5">
            <h3 className="text-xl font-bold text-slate-900">
              {relatedRoom.name}
            </h3>

            <p className="mt-2 text-sm text-slate-600">
              ₹{relatedRoom.price.toLocaleString("en-IN")} / night
            </p>

            <Link
              href={`/rooms/${relatedRoom.id}`}
              className="mt-4 inline-block rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-500 hover:text-slate-900"
            >
              View Room
            </Link>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
      {/* Details */}
      <section className="py-10 sm:py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Image */}
            <div className="relative h-72 overflow-hidden rounded-2xl sm:h-96 lg:h-[500px]">
              <Image
                src={room.image}
                alt={room.name}
                fill
                unoptimized
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <p className="text-sm font-semibold uppercase tracking-[2px] text-amber-500">
                Room Details
              </p>

              <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                {room.name}
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                {room.description}
              </p>

              {/* Price */}
              <div className="mt-6">
                <span className="text-3xl font-bold text-slate-900">
                  ₹{room.price.toLocaleString("en-IN")}
                </span>

                <span className="ml-2 text-sm text-slate-500">
                  / night
                </span>
              </div>

              {/* Guests */}
              <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4">
                <p className="text-sm font-semibold text-slate-700">
                  👥 Maximum Guests
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Up to {room.guests} guests
                </p>
              </div>

              {/* Amenities */}
              <div className="mt-6">
                <h3 className="text-lg font-bold text-slate-900">
                  Amenities
                </h3>

                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {room.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="rounded-lg bg-white p-3 text-sm text-slate-700"
                    >
                      ✓ {amenity}
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking Button */}
              <Link
                href={`/booking?room=${room.id}&checkIn=${checkIn || ""}&checkOut=${checkOut || ""}&guests=${guests || ""}`}
                className="mt-8 w-full rounded-lg bg-amber-500 px-6 py-3 text-center font-semibold text-slate-900 transition hover:bg-amber-400 sm:w-auto"
              >
                Book This Room
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

