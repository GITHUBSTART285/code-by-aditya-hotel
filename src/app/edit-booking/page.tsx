"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Booking,
  getBookings,
  updateBooking,
} from "@/services/booking/bookingStorage";

export default function EditBookingPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");

  const [booking, setBooking] = useState<Booking | null>(null);
  const [checkIn, setCheckIn] = useState("");
const [checkOut, setCheckOut] = useState("");
const [guests, setGuests] = useState("");
const [request, setRequest] = useState("");

  useEffect(() => {
    if (!bookingId) return;

    const bookings = getBookings();

    const foundBooking = bookings.find(
      (item) => item.bookingId === bookingId
    );

    setBooking(foundBooking ?? null);

if (foundBooking) {
  setCheckIn(foundBooking.checkIn);
  setCheckOut(foundBooking.checkOut);
  setGuests(foundBooking.guests);
  setRequest(foundBooking.request);
}
  }, [bookingId]);

  if (!booking) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <h1 className="text-2xl font-bold text-slate-900">
          Booking not found
        </h1>

        <Link
          href="/my-bookings"
          className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 text-white"
        >
          Back to My Bookings
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/my-bookings"
          className="mb-6 inline-block text-sm font-medium text-slate-600"
        >
          ← Back to My Bookings
        </Link>

        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Edit Booking
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Booking ID: {booking.bookingId}
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Check-in
              </label>

              <input
                type="date"
                defaultValue={booking.checkIn}
                 onChange={(e) => setCheckIn(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Check-out
              </label>

              <input
               value={checkOut}
               onChange={(e) => setCheckOut(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Guests
              </label>

              <input
                type="number"
                min="1"
                defaultValue={booking.guests}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Special Request
              </label>

              <textarea
                defaultValue={booking.request}
                rows={4}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-black"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-lg bg-slate-900 px-5 py-3 font-semibold text-white hover:bg-slate-800"
            >
              Update Booking
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}