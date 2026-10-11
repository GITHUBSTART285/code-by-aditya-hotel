"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { rooms } from "@/data/rooms";
import { Booking, getBookings } from "@/services/booking/bookingStorage";

function ReceiptContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const found = getBookings().find((item) => item.bookingId === bookingId);
    setBooking(found ?? null);
    setLoaded(true);
  }, [bookingId]);

  if (!loaded) {
    return null;
  }

  if (!booking) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <h1 className="text-2xl font-bold text-slate-900">Booking not found</h1>
        <Link
          href="/my-bookings"
          className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-3 text-white"
        >
          Back to My Bookings
        </Link>
      </main>
    );
  }

  if (booking.paymentStatus !== "paid") {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <h1 className="text-2xl font-bold text-slate-900">
          Receipt is available after payment
        </h1>
        <Link
          href={`/payment?id=${booking.bookingId}`}
          className="mt-6 inline-block rounded-lg bg-amber-500 px-5 py-3 font-semibold text-slate-900"
        >
          Pay Now
        </Link>
      </main>
    );
  }

  const room = rooms.find((item) => item.id === booking.room);
  const issuedOn = new Date().toLocaleDateString("en-IN");

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 print:bg-white print:p-0">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex flex-wrap gap-3 print:hidden">
          <Link
            href="/my-bookings"
            className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-100"
          >
            ← Back
          </Link>

          <button
            type="button"
            onClick={() => window.print()}
            className="rounded-lg bg-amber-500 px-5 py-3 font-semibold text-slate-900 hover:bg-amber-400"
          >
            Print / Save as PDF
          </button>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm print:border-0 print:shadow-none">
          <div className="flex items-start justify-between border-b border-slate-200 pb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Aditya Hotel</h1>
              <p className="mt-1 text-sm text-slate-600">Gwalior, Madhya Pradesh</p>
              <p className="text-sm text-slate-600">+91 98765 43210</p>
              <p className="text-sm text-slate-600">info@adityahotel.com</p>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-slate-900">PAYMENT RECEIPT</p>
              <p className="mt-1 text-sm text-slate-600">Issued: {issuedOn}</p>
              <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                PAID
              </span>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Row label="Booking ID" value={booking.bookingId} />
            <Row label="Guest Name" value={booking.name} />
            <Row label="Email" value={booking.email} />
            <Row label="Phone" value={booking.phone} />
          </div>

          <div className="mt-6 border-t border-slate-200 pt-6">
            <h2 className="text-lg font-bold text-slate-900">Stay Details</h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Row label="Room" value={room?.name ?? booking.room} />
              <Row label="Guests" value={booking.guests} />
              <Row label="Check-in" value={booking.checkIn} />
              <Row label="Check-out" value={booking.checkOut} />
              <Row label="Total Nights" value={String(booking.totalNights)} />
              <Row
                label="Price per Night"
                value={room ? `₹${room.price.toLocaleString("en-IN")}` : "-"}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-6">
            <span className="text-lg font-bold text-slate-900">Total Paid</span>
            <span className="text-2xl font-bold text-slate-900">
              ₹{booking.totalAmount.toLocaleString("en-IN")}
            </span>
          </div>

          <p className="mt-8 text-center text-xs text-slate-500">
            This is a demo receipt. Thank you for staying with Aditya Hotel.
          </p>
        </div>
      </div>
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-slate-900">{value}</p>
    </div>
  );
}

export default function ReceiptPage() {
  return (
    <Suspense fallback={null}>
      <ReceiptContent />
    </Suspense>
  );
}