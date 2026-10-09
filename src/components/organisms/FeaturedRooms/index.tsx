
import Link from "next/link";

import RoomCard from "@/components/molecules/RoomCard";
import { rooms } from "@/data/rooms";

export default function FeaturedRooms() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        {/* Section Heading */}
        <div className="mb-10 text-center sm:mb-12">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-amber-500 sm:text-sm">
            Stay With Us
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Featured Rooms
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
            Discover comfortable and elegant rooms designed to make your stay
            at Aditya Hotel memorable.
          </p>
        </div>

        {/* Room Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {rooms.slice(0, 3).map((room) => (
            <RoomCard
              key={room.id}
              id={room.id}
              name={room.name}
              description={room.description}
              price={room.price}
              image={room.image}
            />
          ))}
        </div>

        {/* View All Rooms */}
        <div className="mt-10 text-center">
          <Link
            href="/rooms"
            className="inline-block rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-amber-500 hover:text-slate-900"
          >
            View All Rooms
          </Link>
        </div>
      </div>
    </section>
  );
}

