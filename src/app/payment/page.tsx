"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { rooms } from "@/data/rooms";
import { useAppDispatch } from "@/redux/hooks";
import { updateBookingInStore } from "@/redux/features/bookings/bookingSlice";
import {
  expirePendingBookings,
  isBookingExpired,
} from "@/services/booking/bookingStorage";
import { useNow } from "@/hooks/useNow";
import CountdownBadge from "@/components/molecules/CountdownBadge";

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
  status?: "confirmed" | "cancelled";
  expiresAt?: number;
}

function PaymentContent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const bookingIdFromUrl = searchParams.get("id");

  const [booking, setBooking] = useState<BookingData | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const now = useNow();

  useEffect(() => {
    const bookings: BookingData[] = expirePendingBookings();

    if (bookings.length === 0) {
      return;
    }

    const found = bookingIdFromUrl
      ? bookings.find((item) => item.bookingId === bookingIdFromUrl)
      : bookings[bookings.length - 1];

    if (found) {
      setBooking(found);
    }
  }, [bookingIdFromUrl]);

  const selectedRoom = booking
    ? rooms.find((room) => room.id === booking.room)
    : null;

  const isBlocked =
    !!booking &&
    booking.paymentStatus !== "paid" &&
    (booking.status === "cancelled" || isBookingExpired(booking, now));

  const handlePayment = () => {
    if (!booking) {
      return;
    }

    if (booking.paymentStatus === "paid") {
      return;
    }

    if (isBlocked) {
      return;
    }

    setIsPaying(true);

    setTimeout(() => {
      dispatch(
        updateBookingInStore({
          bookingId: booking.bookingId,
          updates: { paymentStatus: "paid" },
        })
      );

      const savedBookings = localStorage.getItem("bookings");

      if (savedBookings) {
        const bookings: BookingData[] = JSON.parse(savedBookings);

        const updatedBookings = bookings.map((item) =>
          item.bookingId === booking.bookingId
            ? { ...item, paymentStatus: "paid" as const }
            : item
        );

        localStorage.setItem("bookings", JSON.stringify(updatedBookings));
      }

      router.push(`/booking-confirmation?id=${booking.bookingId}`);
    }, 1500);
  };

  if (!booking) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-5">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            No booking found
          </h1>

          <p className="mt-2 text-slate-600">
            Please create a booking first.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-slate-900 py-14">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-amber-400">
            Aditya Hotel
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Payment
          </h1>

          <p className="mt-4 text-slate-300">
            Complete your payment to confirm your booking.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-2xl px-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
            <h2 className="text-xl font-bold text-slate-900">
              Booking Summary
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between gap-4">
                <span className="text-slate-600">Booking ID</span>
                <span className="font-semibold text-slate-900">
                  {booking.bookingId}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-600">Room</span>
                <span className="font-semibold text-slate-900">
                  {selectedRoom?.name || "Room"}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-600">Check-in</span>
                <span className="font-semibold text-slate-900">
                  {booking.checkIn}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-600">Check-out</span>
                <span className="font-semibold text-slate-900">
                  {booking.checkOut}
                </span>
              </div>

              <div className="flex justify-between gap-4">
                <span className="text-slate-600">Guests</span>
                <span className="font-semibold text-slate-900">
                  {booking.guests}
                </span>
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-900">
                    Total Amount
                  </span>

                  <span className="text-xl font-bold text-slate-900">
                    ₹{booking.totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-sm font-semibold text-amber-800">
                Demo Payment
              </p>

              <p className="mt-1 text-sm text-amber-700">
                This is a frontend demo payment. No real money will be charged.
              </p>
            </div>

            {isBlocked && (
              <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
                <p className="text-sm font-semibold text-red-700">
                  This booking has expired or was cancelled. Please create a
                  new booking.
                </p>
              </div>
            )}

            {!isBlocked &&
              booking.paymentStatus !== "paid" &&
              booking.expiresAt && (
                <div className="mt-4">
                  <CountdownBadge expiresAt={booking.expiresAt} now={now} />
                </div>
              )}

            {booking.paymentStatus === "paid" && (
              <div className="mt-6 rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="text-sm font-semibold text-green-700">
                  This booking is already paid.
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={handlePayment}
              disabled={
                isPaying || isBlocked || booking.paymentStatus === "paid"
              }
              className="mt-6 w-full rounded-lg bg-amber-500 px-6 py-3 font-semibold text-slate-900 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {booking.paymentStatus === "paid"
                ? "Already Paid"
                : isBlocked
                ? "Booking Expired"
                : isPaying
                ? "Processing Payment..."
                : `Pay ₹${booking.totalAmount.toLocaleString("en-IN")}`}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={null}>
      <PaymentContent />
    </Suspense>
  );
}