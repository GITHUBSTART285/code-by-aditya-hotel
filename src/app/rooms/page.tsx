
"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import RoomCard from "@/components/molecules/RoomCard";
import { rooms } from "@/data/rooms";

export default function RoomsPage() {
  const searchParams = useSearchParams();
  const bookingGuests = searchParams.get("guests") || "";
  const [search, setSearch] = useState("");
  const [guestFilter, setGuestFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [visibleRooms, setVisibleRooms] = useState(3);

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch = room.name
      .toLowerCase()
      .includes(search.toLowerCase());

   const matchesGuests =
  (guestFilter === "" && bookingGuests === "") ||
  room.guests >= Number(guestFilter || bookingGuests);

    const matchesPrice =
      priceFilter === "" ||
      room.price <= Number(priceFilter);

    return matchesSearch && matchesGuests && matchesPrice;
  });

  const sortedRooms = [...filteredRooms].sort((a, b) => {
  if (sortPrice === "low") {
    return a.price - b.price;
  }

  if (sortPrice === "high") {
    return b.price - a.price;
  }

  if (sortPrice === "nameAZ") {
    return a.name.localeCompare(b.name);
  }

  if (sortPrice === "nameZA") {
    return b.name.localeCompare(a.name);
  }

  return 0;
});

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <section className="bg-slate-900 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-amber-400 sm:text-sm">
            Stay With Us
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Our Rooms
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
            Choose from our comfortable rooms and luxurious suites designed
            for a relaxing and memorable stay.
          </p>
        </div>
      </section>

      {/* Rooms */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">

          {/* Search */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search rooms..."
              value={search}
              onChange={(e) => {setSearch(e.target.value);
                   setVisibleRooms(3);
  
                             }}
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-black placeholder:text-slate-500 outline-none focus:border-amber-500"
            />
          </div>

          {/* Guest Filter */}
          <select
            value={guestFilter}
           onChange={(e) => {setGuestFilter(e.target.value);              
                  setVisibleRooms(3);
                      }}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-black outline-none focus:border-amber-500"
          >
            <option value="">All Guests</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
          </select>

          {/* Price Filter */}
          <select
            value={priceFilter}
            onChange={(e) => {setPriceFilter(e.target.value);                     
                   setVisibleRooms(3);
                                       }} 
            className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-3 text-black outline-none focus:border-amber-500"
          >
            <option value="">All Prices</option>
            <option value="5000">Under ₹5,000</option>
            <option value="7000">Under ₹7,000</option>
            <option value="10000">Under ₹10,000</option>
          </select>

          {/* Price Sorting */}
          <select
            value={sortPrice}
            onChange={(e) => { setSortPrice(e.target.value);
                                 setVisibleRooms(3);
                                      }}
            className="mt-4 w-full rounded-lg border border-slate-300 px-4 py-3 text-black outline-none focus:border-amber-500"
          >
           <option value="">Default Sorting</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="nameAZ">Name: A to Z</option>
           <option value="nameZA">Name: Z to A</option>
          </select>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSearch("");
              setGuestFilter("");
              setPriceFilter("");
              setSortPrice("");
              setVisibleRooms(3);
            }}
            className="mt-4 rounded-lg bg-red-500 px-5 py-3 text-white hover:bg-red-600"
          >
            Clear Filters
          </button>

          {/* Rooms Grid */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {sortedRooms.length > 0 ? (
              sortedRooms.slice(0, visibleRooms).map((room) => (
                <RoomCard
                  key={room.id}
                  id={room.id}
                  name={room.name}
                  description={room.description}
                  price={room.price}
                  image={room.image}
                />
              ))
            ) : (
              <div className="col-span-full py-10 text-center">
                <h2 className="text-xl font-semibold text-slate-800">
                  No rooms found
                </h2>

                <p className="mt-2 text-slate-500">
                  Try changing your search or filters.
                </p>
              </div>
            )}
          </div>

          {/* Load More */}
          {visibleRooms < sortedRooms.length && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setVisibleRooms((prev) => prev + 3)}
                className="rounded-lg bg-slate-900 px-6 py-3 text-white hover:bg-slate-800"
              >
                Load More
              </button>
            </div>
          )}

        </div>
      </section>
    </main>
  );
}

