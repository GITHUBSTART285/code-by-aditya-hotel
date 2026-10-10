"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { rooms } from "@/data/rooms";

interface BookingData {
  bookingId: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  room: string;
  name: string;
  email: string;
  phone: string;
  request: string;
  totalNights: number;
  totalAmount: number;
  paymentStatus?: "pending" | "paid";
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const bookingIdFromUrl = searchParams.get("id");

  const [booking, setBooking] = useState<BookingData | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedBookings = localStorage.getItem("bookings");

    if (savedBookings) {
      const data: BookingData[] = JSON.parse(savedBookings);

      const found = bookingIdFromUrl
        ? data.find((item) => item.bookingId === bookingIdFromUrl)
        : data[data.length - 1];

      setBooking(found ?? null);
    }

    setLoaded(true);
  }, [bookingIdFromUrl]);

  const selectedRoom = booking
    ? rooms.find((room) => room.id === booking.room)
    : null;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-slate-900 py-14 sm:py-16">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-amber-400 sm:text-sm">
            Aditya Hotel
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Booking Confirmed
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
            Thank you for booking your stay with Aditya Hotel.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-10">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl">
                ✓
              </div>

              <h2 className="mt-5 text-2xl font-bold text-slate-900">
                Your booking was successful!
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                We have received your booking details.
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-slate-900">
                Booking Details
              </h2>
            </div>

            {loaded && !booking ? (
              <div className="mt-6 rounded-lg bg-slate-100 p-5 text-center text-sm text-slate-600">
                No booking found.
              </div>
            ) : booking ? (
              <div className="mt-6 rounded-xl border border-slate-200 p-5">
                <div className="rounded-lg bg-slate-100 p-4">
                  <p className="text-sm text-slate-600">Booking ID</p>

                  <p className="mt-1 text-lg font-bold text-slate-900">
                    {booking.bookingId}
                  </p>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-slate-500">Room</p>
                    <p className="font-semibold text-slate-900">
                      {selectedRoom?.name || "Room"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Guests</p>
                    <p className="font-semibold text-slate-900">
                      {booking.guests}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Check-in</p>
                    <p className="font-semibold text-slate-900">
                      {booking.checkIn}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Check-out</p>
                    <p className="font-semibold text-slate-900">
                      {booking.checkOut}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Total Nights</p>
                    <p className="font-semibold text-slate-900">
                      {booking.totalNights}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Guest Name</p>
                    <p className="font-semibold text-slate-900">
                      {booking.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500">Payment Status</p>
                    <p
                      className={`font-semibold ${
                        booking.paymentStatus === "paid"
                          ? "text-green-600"
                          : "text-amber-600"
                      }`}
                    >
                      {booking.paymentStatus === "paid" ? "Paid" : "Pending"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-slate-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-700">
                      Total Amount
                    </span>

                    <span className="text-lg font-bold text-slate-900">
                      ₹{booking.totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>
            ) : null}

            <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:justify-center">
              <Link
                href="/my-bookings"
                className="rounded-lg bg-amber-500 px-6 py-3 text-center font-semibold text-slate-900 transition hover:bg-amber-400"
              >
                My Bookings
              </Link>

              <Link
                href="/rooms"
                className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-center font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                View Rooms
              </Link>

              <Link
                href="/"
                className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-center font-semibold text-slate-900 transition hover:bg-slate-100"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense fallback={null}>
      <ConfirmationContent />
    </Suspense>
  );
}