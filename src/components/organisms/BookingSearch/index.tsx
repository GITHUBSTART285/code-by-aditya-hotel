"use client";


import { useRouter } from "next/navigation";
import { useState } from "react";




export default function BookingSearch() {
  const router = useRouter();

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");
  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg sm:p-6">
          <div className="grid gap-5 md:grid-cols-4">

            <div>
              <label
                htmlFor="checkIn"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Check In
              </label>

              <input
           id="checkIn"
           type="date"
           value={checkIn}
           onChange={(e) => setCheckIn(e.target.value)}
           className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-500"
/>
              
            </div>

            <div>
              <label
                htmlFor="checkOut"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Check Out
              </label>

              <input
  id="checkOut"
  type="date"
  value={checkOut}
  onChange={(e) => setCheckOut(e.target.value)}
  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-500"
/>
            </div>

            <div>
              <label
                htmlFor="guests"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Guests
              </label>

              <select
  id="guests"
  value={guests}
  onChange={(e) => setGuests(e.target.value)}
  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-500"
>
                <option value="1">1 Guest</option>
                 <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                 <option value="4">4 Guests</option>
                 <option value="5">5+ Guests</option>
              </select>
            </div>

            <div className="flex items-end">
    <button
  type="button"
  onClick={() => {
    router.push(
      `/rooms?checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
    );
  }}
  className="w-full rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white transition hover:bg-amber-500 hover:text-slate-900"
>
  Search Rooms
</button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}