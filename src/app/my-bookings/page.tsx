"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { rooms } from "@/data/rooms";
import {
  BookingTab,
  cancelBooking,
  expirePendingBookings,
  isBookingExpired,
  getTab,
} from "@/services/booking/bookingStorage";
import { useNow } from "@/hooks/useNow";
import CountdownBadge from "@/components/molecules/CountdownBadge";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  cancelBookingInStore,
  setBookings,
} from "@/redux/features/bookings/bookingSlice";

const TABS: { key: BookingTab; label: string }[] = [
  { key: "upcoming", label: "Upcoming" },
  { key: "past", label: "Past" },
  { key: "cancelled", label: "Cancelled" },
];

const BADGE: Record<BookingTab, { text: string; cls: string }> = {
  upcoming: {
    text: "Confirmed",
    cls: "bg-green-100 text-green-700",
  },
  past: {
    text: "Completed",
    cls: "bg-slate-200 text-slate-700",
  },
  cancelled: {
    text: "Cancelled",
    cls: "bg-red-100 text-red-700",
  },
};

export default function MyBookingsPage() {
 const dispatch = useAppDispatch();

const bookings = useAppSelector(
  (state) => state.bookings.bookings
);
  const [activeTab, setActiveTab] =
    useState<BookingTab>("upcoming");
  const [loaded, setLoaded] = useState(false);
  const [searchBookingId, setSearchBookingId] = useState("");
const now = useNow();  

useEffect(() => {
  const savedBookings = expirePendingBookings();
  dispatch(setBookings(savedBookings));
  setLoaded(true);
}, [dispatch]);
  
  useEffect(() => {
    if (!loaded) return;

    if (bookings.some((booking) => isBookingExpired(booking, now))) {
      dispatch(setBookings(expirePendingBookings()));
    }
  }, [now, loaded, bookings, dispatch]);




const handleExportBookings = () => {
  if (bookings.length === 0) {
    alert("No bookings available to export.");
    return;
  }

  const headers = [
    "Booking ID",
    "Room",
    "Guest Name",
    "Email",
    "Phone",
    "Check-in",
    "Check-out",
    "Guests",
    "Total Nights",
    "Total Amount",
    "Payment Status",
    "Booking Status",
  ];

  const rows = bookings.map((booking) => {
    const room = rooms.find((item) => item.id === booking.room);

    return [
      booking.bookingId,
      room?.name || "Room",
      booking.name,
      booking.email,
      booking.phone,
      booking.checkIn,
      booking.checkOut,
      booking.guests,
      booking.totalNights,
      booking.totalAmount,
      booking.paymentStatus === "paid" ? "Paid" : "Pending",
      booking.status === "cancelled" ? "Cancelled" : "Confirmed",
    ];
  });

  const csvContent = [headers, ...rows]
    .map((row) =>
      row
        .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob(["\uFEFF" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "aditya-hotel-bookings.csv";
  link.click();

  URL.revokeObjectURL(url);
};


const handleCancel = (bookingId: string) => {
  const ok = window.confirm(
    "Are you sure you want to cancel this booking?"
  );

  if (!ok) {
    return;
  }

  cancelBooking(bookingId);
  dispatch(cancelBookingInStore(bookingId));
};


  const counts: Record<BookingTab, number> = {
    upcoming: bookings.filter(
      (booking) => getTab(booking) === "upcoming"
    ).length,

    past: bookings.filter(
      (booking) => getTab(booking) === "past"
    ).length,

    cancelled: bookings.filter(
      (booking) => getTab(booking) === "cancelled"
    ).length,
  };

    const activeBookings = bookings.filter(
    (booking) => booking.status !== "cancelled"
  );

  const paidBookings = activeBookings.filter(
    (booking) => booking.paymentStatus === "paid"
  );

  const stats = {
    total: bookings.length,
    revenue: paidBookings.reduce(
      (sum, booking) => sum + booking.totalAmount,
      0
    ),
    paid: paidBookings.length,
    pending: activeBookings.length - paidBookings.length,
    upcoming: counts.upcoming,
  };

  const visible = bookings
  .filter((booking) => getTab(booking) === activeTab)
  .filter((booking) =>
    booking.bookingId
      .toLowerCase()
      .includes(searchBookingId.trim().toLowerCase())
  )
  .slice()
  .reverse();

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-900 py-14">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-amber-400">
            Aditya Hotel
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            My Bookings
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300">
            View your booking details and stay information.
          </p>
        </div>
      </section>
            {/* Stats */}
      <section className="-mt-8 px-5 sm:px-6">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard label="Total Bookings" value={String(stats.total)} />
          <StatCard
            label="Total Revenue"
            value={`₹${stats.revenue.toLocaleString("en-IN")}`}
            valueClass="text-amber-600"
          />
          <StatCard
            label="Paid / Pending"
            value={`${stats.paid} / ${stats.pending}`}
          />
          <StatCard
            label="Upcoming Stays"
            value={String(stats.upcoming)}
            valueClass="text-green-600"
          />
        </div>
      </section>

      {/* Bookings */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-5 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-lg sm:p-8">
            
<div className="mb-5 flex justify-end">
  <button
    type="button"
    onClick={handleExportBookings}
    className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
  >
    Export Bookings CSV
  </button>
</div>


            {/* Tabs */}
            <div className="flex gap-2 overflow-x-auto border-b border-slate-200 pb-3">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${
                    activeTab === tab.key
                      ? "bg-amber-500 text-slate-900"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab.label} ({counts[tab.key]})
                </button>
              ))}
            </div>
            {/* Search Booking */}
<div className="mt-5">
  <label
    htmlFor="bookingSearch"
    className="mb-2 block text-sm font-semibold text-slate-700"
  >
    Search by Booking ID
  </label>

  <input
    id="bookingSearch"
    type="text"
    value={searchBookingId}
    onChange={(event) => setSearchBookingId(event.target.value)}
    placeholder="Enter Booking ID, e.g. ADH-123"
    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-amber-500"
  />
</div>

            {/* Empty State */}
            {loaded && visible.length === 0 && (
              <p className="mt-6 text-sm text-slate-600">
                No {activeTab} bookings found.
              </p>
            )}

            {/* Booking List */}
            <div className="mt-6 space-y-5">
              {visible.map((booking) => {
                const room = rooms.find(
                  (room) => room.id === booking.room
                );

                const tab = getTab(booking);
                const badge = BADGE[tab];

                return (
                  <div
                    key={booking.bookingId}
                    className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                  >
                    {/* Booking Header */}
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <p className="font-bold text-slate-900">
                        {booking.bookingId}
                      </p>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${badge.cls}`}
                      >
                        {badge.text}
                      </span>
                    </div>

                    {/* Booking Information */}
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Info
                        label="Room"
                        value={room?.name || "Room"}
                      />

                      <Info
                        label="Guest Name"
                        value={booking.name}
                      />

                      <Info
                        label="Check-in"
                        value={booking.checkIn}
                      />

                      <Info
                        label="Check-out"
                        value={booking.checkOut}
                      />

                      <Info
                        label="Guests"
                        value={booking.guests}
                      />

                      <Info
                        label="Total Nights"
                        value={String(booking.totalNights)}
                      />

                      <div>
                        <p className="text-sm text-slate-500">
                          Total Amount
                        </p>

                        <p className="mt-1 text-lg font-bold text-amber-600">
                          ₹
                          {booking.totalAmount.toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>
                    </div>
                       <div className="mt-5">
                      <p className="text-sm text-slate-500">
                        Payment Status
                      </p>

                      <p
                        className={`mt-1 font-semibold ${
                          booking.paymentStatus === "paid"
                            ? "text-green-600"
                            : "text-amber-600"
                        }`}
                      >
                        {booking.paymentStatus === "paid"
                          ? "Paid"
                          : "Pending"}
                      </p>

                      {tab === "upcoming" &&
                        booking.paymentStatus !== "paid" &&
                        booking.expiresAt && (
                          <div className="mt-2">
                            <CountdownBadge
                              expiresAt={booking.expiresAt}
                              now={now}
                            />
                          </div>
                        )}
                    </div>
 <div className="mt-4 flex flex-wrap gap-3">
  <Link
    href={`/booking-details?id=${booking.bookingId}`}
    className="inline-block rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
  >
    View Details
  </Link>

  {tab === "upcoming" && booking.paymentStatus !== "paid" && (
    <Link
      href={`/payment?id=${booking.bookingId}`}
      className="inline-block rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-amber-400"
    >
      Pay Now
    </Link>
  )}
</div>
                    {/* Cancel Button */}
                    {tab === "upcoming" && (
                      <button
                        type="button"
                        onClick={() =>
                          handleCancel(booking.bookingId)
                        }
                        className="mt-6 w-full rounded-lg bg-red-500 px-6 py-3 font-semibold text-white transition hover:bg-red-600"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Browse Rooms */}
            <div className="mt-8">
              <Link
                href="/rooms"
                className="inline-block rounded-lg bg-amber-500 px-6 py-3 font-semibold text-slate-900 transition hover:bg-amber-400"
              >
                Browse Rooms
              </Link>
            </div>
          </div>
        </div>
      </section>
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
    <div>
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}
function StatCard({
  label,
  value,
  valueClass = "text-slate-900",
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-md">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className={`mt-2 text-2xl font-bold ${valueClass}`}>{value}</p>
    </div>
  );
}