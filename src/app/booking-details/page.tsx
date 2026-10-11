
"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { rooms } from "@/data/rooms";
import {
  Booking,
  getBookings,
  getTab,
  updateBooking,
} from "@/services/booking/bookingStorage";

export default function BookingDetailsPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");

  const [booking, setBooking] = useState<Booking | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("1");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    }
  }, [bookingId]);

  const startEditing = () => {
    if (!booking) return;

    setCheckIn(booking.checkIn);
    setCheckOut(booking.checkOut);
    setGuests(booking.guests);
    setError("");
    setSuccess("");
    setIsEditing(true);
  };

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!booking) return;

    setError("");
    setSuccess("");

    const room = rooms.find((item) => item.id === booking.room);

    if (!room) {
      setError("Room details could not be found.");
      return;
    }

    if (!checkIn || !checkOut || !guests) {
      setError("Please fill in all fields.");
      return;
    }

    const today = new Date();
    const todayString = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");

    if (checkIn < todayString) {
      setError("Check-in date cannot be in the past.");
      return;
    }

    if (checkOut <= checkIn) {
      setError("Check-out must be after check-in.");
      return;
    }

    const guestCount = Number(guests);

    if (
      !Number.isInteger(guestCount) ||
      guestCount < 1 ||
      guestCount > room.guests
    ) {
      setError(`This room allows 1 to ${room.guests} guests.`);
      return;
    }

    const allBookings = getBookings();

    const roomAlreadyBooked = allBookings.some((item) => {
      if (item.bookingId === booking.bookingId) return false;
      if (item.status === "cancelled") return false;
      if (item.room !== booking.room) return false;

      return checkIn < item.checkOut && checkOut > item.checkIn;
    });

    if (roomAlreadyBooked) {
      setError(
        "This room is already booked for these dates. Please choose different dates."
      );
      return;
    }

    const startDate = new Date(`${checkIn}T00:00:00Z`);
    const endDate = new Date(`${checkOut}T00:00:00Z`);

    const totalNights = Math.round(
      (endDate.getTime() - startDate.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (totalNights < 1) {
      setError("Please select valid check-in and check-out dates.");
      return;
    }

    const totalAmount = room.price * totalNights;

    updateBooking(booking.bookingId, {
      checkIn,
      checkOut,
      guests,
      totalNights,
      totalAmount,
    });

    const updatedBooking = getBookings().find(
      (item) => item.bookingId === booking.bookingId
    );

    if (updatedBooking) {
      setBooking(updatedBooking);
    }

    setIsEditing(false);
    setSuccess("Your booking has been updated successfully.");
  };

  if (!bookingId) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <h1 className="text-2xl font-bold text-slate-900">
          Booking ID not found
        </h1>
      </main>
    );
  }

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

  const room = rooms.find((item) => item.id === booking.room);
  const status = getTab(booking);

  const statusText =
    status === "cancelled"
      ? "Cancelled"
      : status === "past"
        ? "Completed"
        : "Confirmed";

  const canModify = status === "upcoming";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/my-bookings"
          className="mb-6 inline-block text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          ← Back to My Bookings
        </Link>

        <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-slate-500">Booking ID</p>
              <h1 className="mt-1 text-2xl font-bold text-slate-900">
                {booking.bookingId}
              </h1>
            </div>

            <span
              className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${
                status === "cancelled"
                  ? "bg-red-100 text-red-700"
                  : status === "past"
                    ? "bg-slate-200 text-slate-700"
                    : "bg-green-100 text-green-700"
              }`}
            >
              {statusText}
            </span>
          </div>

          {success && (
            <p className="mt-5 rounded-lg bg-green-100 p-3 text-sm text-green-800">
              {success}
            </p>
          )}

          {isEditing ? (
            <form onSubmit={handleSave} className="mt-6 space-y-5">
              <h2 className="text-lg font-bold text-slate-900">
                Modify Your Booking
              </h2>

              <div>
                <label
                  htmlFor="checkIn"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Check-in
                </label>
                <input
                  id="checkIn"
                  type="date"
                  min={new Date().toLocaleDateString("en-CA")}
                  max="2050-12-31"
                  value={checkIn}
                  onChange={(event) => setCheckIn(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="checkOut"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Check-out
                </label>
                <input
                  id="checkOut"
                  type="date"
                  min={checkIn || new Date().toLocaleDateString("en-CA")}
                  max="2050-12-31"
                  value={checkOut}
                  onChange={(event) => setCheckOut(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="guests"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Number of Guests
                </label>
                <select
                  id="guests"
                  value={guests}
                  onChange={(event) => setGuests(event.target.value)}
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900"
                  required
                >
                  {Array.from(
                    { length: room?.guests ?? 1 },
                    (_, index) => index + 1
                  ).map((count) => (
                    <option key={count} value={String(count)}>
                      {count} {count === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>
              

              {room && checkIn && checkOut && checkOut > checkIn && (
                <div className="rounded-lg bg-amber-50 p-4">
                  <p className="text-sm text-slate-600">
                    Room price: ₹{room.price.toLocaleString("en-IN")} per night
                  </p>
                  <p className="mt-1 font-bold text-slate-900">
                    Estimated total: ₹
                    {(
                      room.price *
                      Math.round(
                        (new Date(`${checkOut}T00:00:00Z`).getTime() -
                          new Date(`${checkIn}T00:00:00Z`).getTime()) /
                          (1000 * 60 * 60 * 24)
                      )
                    ).toLocaleString("en-IN")}
                  </p>
                </div>
              )}

              {error && (
                <p className="rounded-lg bg-red-100 p-3 text-sm text-red-700">
                  {error}
                </p>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="rounded-lg bg-amber-500 px-5 py-3 font-semibold text-slate-900 hover:bg-amber-400"
                >
                  Save Changes
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setError("");
                  }}
                  className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="mt-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Room Details
                </h2>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Info label="Room" value={room?.name ?? booking.room} />

                  <Info
                    label="Guests"
                    value={`${booking.guests} ${
                      booking.guests === "1" ? "Guest" : "Guests"
                    }`}
                  />

                  <Info label="Check-in" value={booking.checkIn} />
                  <Info label="Check-out" value={booking.checkOut} />

                  <Info
                    label="Total Nights"
                    value={`${booking.totalNights} ${
                      booking.totalNights === 1 ? "Night" : "Nights"
                    }`}
                  />

                  <Info
                    label="Total Amount"
                    value={`₹${booking.totalAmount.toLocaleString("en-IN")}`}
                  />

                  <Info
                    label="Payment Status"
                    value={booking.paymentStatus === "paid" ? "Paid" : "Pending"}
                  />
                </div>
              </div>

              <div className="mt-8 border-t border-slate-200 pt-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Guest Details
                </h2>
                 
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <Info label="Name" value={booking.name} />
                  <Info label="Email" value={booking.email} />
                  <Info label="Phone" value={booking.phone} />
                  <Info
                    label="Special Request"
                    value={booking.request || "No special request"}
                  />
                </div>
                              {booking.paymentStatus === "paid" && status !== "cancelled" && (
                <div className="mt-8 border-t border-slate-200 pt-6">
                  <Link
                    href={`/receipt?id=${booking.bookingId}`}
                    className="inline-block rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-700"
                  >
                    Download Receipt
                  </Link>
                </div>
              )}
              </div>

              {canModify && (
                <div className="mt-8 border-t border-slate-200 pt-6">
                  <button
                    type="button"
                    onClick={startEditing}
                    className="rounded-lg bg-amber-500 px-6 py-3 font-semibold text-slate-900 hover:bg-amber-400"
                  >
                    Modify Booking
                  </button>

                  {booking.paymentStatus === "paid" && (
                    <p className="mt-3 text-sm text-slate-500">
                      Note: This demo updates the booking dates and estimated
                      amount only. It does not process extra payments or refunds.
                    </p>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-slate-900">{value}</p>
    </div>
  );
}
