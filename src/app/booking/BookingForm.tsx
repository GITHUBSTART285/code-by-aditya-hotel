"use client";


import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { rooms } from "@/data/rooms";
import { useAppDispatch } from "@/redux/hooks";
import { setBookings } from "@/redux/features/bookings/bookingSlice";
interface BookingFormData {
  checkIn: string;
  checkOut: string;
  guests: string;
  room: string;
  name: string;
  email: string;
  phone: string;
  request: string;
}
export default function BookingForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const searchParams = useSearchParams();

  const roomId = searchParams.get("room");
  const checkInParam = searchParams.get("checkIn");
  const checkOutParam = searchParams.get("checkOut");
  const guestsParam = searchParams.get("guests");

  const today = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState<BookingFormData>({
    checkIn: "",
    checkOut: "",
    guests: "",
    room: "",
    name: "",
    email: "",
    phone: "",
    request: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
const [availability, setAvailability] = useState<
  "available" | "unavailable" | ""
>("");

 useEffect(() => {
  if (roomId || checkInParam || checkOutParam || guestsParam) {
    setFormData((previous) => ({
      ...previous,
      room: roomId || previous.room,
      checkIn: checkInParam || previous.checkIn,
      checkOut: checkOutParam || previous.checkOut,
      guests: guestsParam || previous.guests,
    }));
  }
}, [roomId, checkInParam, checkOutParam, guestsParam]);

  // Selected room
  const selectedRoom = rooms.find(
    (room) => room.id === formData.room
  );

  // Total nights calculation
  const totalNights =
    formData.checkIn && formData.checkOut
      ? Math.ceil(
          (new Date(formData.checkOut).getTime() -
            new Date(formData.checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  // Total amount calculation
  const totalAmount =
    selectedRoom && totalNights > 0
      ? selectedRoom.price * totalNights
      : 0;

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
      ...(name === "room" ? { guests: "" } : {}),
    }));

 setError("");
setSuccess("");

if (
  name === "room" ||
  name === "checkIn" ||
  name === "checkOut"
) {
  setAvailability("");
}}
const checkAvailability = () => {
  setError("");
  setAvailability("");

  if (!formData.room) {
    setError("Please select a room.");
    return;
  }

  if (!formData.checkIn || !formData.checkOut) {
    setError("Please select check-in and check-out dates.");
    return;
  }

  if (formData.checkOut <= formData.checkIn) {
    setError("Check-out date must be after check-in date.");
    return;
  }

  const existingBookings = localStorage.getItem("bookings");

  if (!existingBookings) {
    setAvailability("available");
    return;
  }

  const bookings = JSON.parse(existingBookings);

 const isRoomBooked = bookings.some(
  (booking: BookingFormData & { status?: string }) => {
    // Cancelled booking availability ko block nahi karegi
    if (booking.status === "cancelled") {
      return false;
    }

    if (booking.room !== formData.room) {
      return false;
    }

    return (
      formData.checkIn < booking.checkOut &&
      formData.checkOut > booking.checkIn
    );
  }
);

  if (isRoomBooked) {
    setAvailability("unavailable");
    setError("This room is already booked for the selected dates.");
    return;
  }

  setAvailability("available");
};
  // Handle form submit
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Required fields validation
    if (
      !formData.checkIn ||
      !formData.checkOut ||
      !formData.guests ||
      !formData.room ||
      !formData.name ||
      !formData.email ||
      !formData.phone
    ) {
      setError("Please fill all required fields.");
      return;
    }


    if (availability !== "available") {
  setError("Please check room availability first.");
  return;
}


    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))  {
      setError("Please enter a valid email address.");
      return;
    }

    // Check-in date validation
    if (formData.checkIn < today) {
      setError("Check-in date cannot be in the past.");
      return;
    }

    // Check-out date validation
    if (formData.checkOut <= formData.checkIn) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    // Guest capacity validation
    if (
      selectedRoom &&
      Number(formData.guests) > selectedRoom.guests
    ) {
      setError(
        `This room allows maximum ${selectedRoom.guests} guests.`
      );
      return;
    }

    // Phone validation
    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

   try {
  setIsSubmitting(true);
const bookingId = `ADH-${Date.now()}`;

const bookingData = {
  bookingId,
  ...formData,
  totalNights,
  totalAmount,
};

const existingBookings = localStorage.getItem("bookings");

let bookings = [];

if (existingBookings) {
  bookings = JSON.parse(existingBookings);
}

bookings.push(bookingData);

localStorage.setItem("bookings", JSON.stringify(bookings));
dispatch(setBookings(bookings));
      setSuccess("Booking details submitted successfully!");
router.push("/payment");
      setFormData({
        checkIn: "",
        checkOut: "",
        guests: "",
        room: "",
        name: "",
        email: "",
        phone: "",
        request: "",
      });
    } catch (error) {
      console.error("Booking Error:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-slate-900 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-5 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-amber-400 sm:text-sm">
            Aditya Hotel
          </p>

          <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Book Your Stay
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
            Fill in your details and choose a room for your
            comfortable stay.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-10 sm:py-14 lg:py-16">
        <div className="mx-auto max-w-5xl px-5 sm:px-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg sm:p-6 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Stay Details */}
              <div>
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  Stay Details
                </h2>

                <div className="mt-6 grid gap-5 sm:gap-6 md:grid-cols-2">
                  {/* Check In */}
                  <div>
                    <label
                      htmlFor="checkIn"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Check In
                    </label>

                    <input
                      id="checkIn"
                      name="checkIn"
                      type="date"
                      value={formData.checkIn}
                      onChange={handleChange}
                      min={today}
                      max="2050-12-31"
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-500"
                    />
                  </div>

                  {/* Check Out */}
                  <div>
                    <label
                      htmlFor="checkOut"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Check Out
                    </label>

                    <input
                      id="checkOut"
                      name="checkOut"
                      type="date"
                      value={formData.checkOut}
                      onChange={handleChange}
                      min={formData.checkIn || today}
                      max="2050-12-31"
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-500"
                    />
                  </div>

                  {/* Guests */}
                  <div>
                    <label
                      htmlFor="guests"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Guests
                    </label>

                    <select
                      id="guests"
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-500"
                    >
                      <option value="">Select Guests</option>

                      {Array.from(
                        {
                          length: selectedRoom?.guests ?? 6,
                        },
                        (_, index) => index + 1
                      ).map((guest) => (
                        <option key={guest} value={guest}>
                          {guest}{" "}
                          {guest === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Room */}
                  <div>
                    <label
                      htmlFor="room"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Select Room
                    </label>

                    <select
                      id="room"
                      name="room"
                      value={formData.room}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-amber-500"
                    >
                      <option value="">Select Room</option>

                      {rooms.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.name} - ₹
                          {room.price.toLocaleString("en-IN")} / night
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Guest Information */}
              <div className="border-t border-slate-200 pt-8">
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  Guest Information
                </h2>

                <div className="mt-6 grid gap-5 sm:gap-6 md:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Full Name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-amber-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email Address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-amber-500"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Phone Number
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter 10-digit phone number"
                      maxLength={10}
                      className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Special Request */}
                <div className="mt-5 sm:mt-6">
                  <label
                    htmlFor="request"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Special Request
                  </label>

                  <textarea
                    id="request"
                    name="request"
                    rows={5}
                    value={formData.request}
                    onChange={handleChange}
                    placeholder="Any special request?"
                    className="w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-amber-500"
                  />
                </div>
                      <button
                  type="button"
                 onClick={checkAvailability}
                   className="mt-6 w-full rounded-lg bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
                                 >
                   Check Room Availability
                              </button>

                      {availability === "available" && (
                        <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
                      Room is available for your selected dates.
                        </div>
                             )}


                              
                {/* Booking Summary */}
                {selectedRoom && totalNights > 0 && (
                  <div className="mt-6 rounded-lg border border-slate-200 bg-white p-5">
                    <h2 className="text-lg font-bold text-slate-900">
                      Booking Summary
                    </h2>

                    <div className="mt-4 space-y-2 text-sm text-slate-700">
                      <p className="flex justify-between">
                        <span>Room</span>

                        <span className="font-semibold text-slate-900">
                          {selectedRoom.name}
                        </span>
                      </p>

                      <p className="flex justify-between">
                        <span>Price Per Night</span>

                        <span className="font-semibold text-slate-900">
                          ₹
                          {selectedRoom.price.toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      </p>

                      <p className="flex justify-between">
                        <span>Total Nights</span>

                        <span className="font-semibold text-slate-900">
                          {totalNights}
                        </span>
                      </p>

                      <div className="border-t border-slate-200 pt-3">
                        <p className="flex justify-between text-base font-bold text-slate-900">
                          <span>Total Amount</span>

                          <span>
                            ₹
                            {totalAmount.toLocaleString("en-IN")}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
                  {error}
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700">
                  {success}
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <Link
                  href="/rooms"
                  className="w-full rounded-lg border border-slate-300 bg-white px-6 py-3 text-center font-semibold text-slate-900 transition hover:bg-slate-100 sm:w-auto"
                >
                  Back to Rooms
                </Link>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-amber-500 px-7 py-3 text-center font-semibold text-slate-900 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {isSubmitting
                    ? "Booking..."
                    : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}