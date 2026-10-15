export interface Booking {
  bookingId: string;
  room: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  name: string;
  email: string;
  phone: string;
  request: string;
  totalNights: number;
  totalAmount: number;
  status?: "confirmed" | "cancelled";
   paymentStatus?: "pending" | "paid";
  expiresAt?: number;

}

export type BookingTab = "upcoming" | "past" | "cancelled";

const STORAGE_KEY = "bookings";
// Testing ke liye 60 * 1000 (1 minute) rakho, baad mein 24 ghante
export const PAYMENT_WINDOW_MS = 24 * 60 * 60 * 1000;
export function getBookings(): Booking[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const savedBookings = localStorage.getItem(STORAGE_KEY);

    if (!savedBookings) {
      return [];
    }

    return JSON.parse(savedBookings) as Booking[];
  } catch (error) {
    console.error("Error reading bookings:", error);
    return [];
  }
}

export function saveBookings(bookings: Booking[]): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
}

export function addBooking(booking: Booking): Booking[] {
  const bookings = getBookings();

  const newBooking: Booking = {
    ...booking,
    expiresAt:
      booking.expiresAt ?? Date.now() + PAYMENT_WINDOW_MS,
  };

  const updatedBookings = [...bookings, newBooking];

  saveBookings(updatedBookings);

  return updatedBookings;
}

export function updateBooking(
  bookingId: string,
  updates: Partial<Booking>
): Booking[] {
  const bookings = getBookings();

  const updatedBookings = bookings.map((booking) =>
    booking.bookingId === bookingId
      ? { ...booking, ...updates }
      : booking
  );

  saveBookings(updatedBookings);

  return updatedBookings;
}

export function cancelBooking(bookingId: string): Booking[] {
  return updateBooking(bookingId, {
    status: "cancelled",
  });
}

export function getBookingById(
  bookingId: string
): Booking | undefined {
  return getBookings().find(
    (booking) => booking.bookingId === bookingId
  );
}

export function getTab(booking: Booking): BookingTab {
  if (booking.status === "cancelled") {
    return "cancelled";
  }

  const today = new Date().toISOString().split("T")[0];

  if (booking.checkOut < today) {
    return "past";
  }

  return "upcoming";
}


export function isBookingExpired(
  booking: Booking,
  now: number = Date.now()
): boolean {
  return (
    booking.status !== "cancelled" &&
    booking.paymentStatus !== "paid" &&
    booking.expiresAt !== undefined &&
    now >= booking.expiresAt
  );
}

export function expirePendingBookings(): Booking[] {
  const bookings = getBookings();
  const now = Date.now();
  let changed = false;

  const updatedBookings = bookings.map((booking) => {
    if (isBookingExpired(booking, now)) {
      changed = true;
      return { ...booking, status: "cancelled" as const };
    }

    return booking;
  });

  if (changed) {
    saveBookings(updatedBookings);
  }

  return updatedBookings;
}