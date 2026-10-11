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
}

export type BookingTab = "upcoming" | "past" | "cancelled";

const STORAGE_KEY = "bookings";

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
  const updatedBookings = [...bookings, booking];

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
export function deleteBooking(bookingId: string): Booking[] {
  const updatedBookings = getBookings().filter(
    (booking) => booking.bookingId !== bookingId
  );

  saveBookings(updatedBookings);

  return updatedBookings;
}

export function clearCancelledBookings(): Booking[] {
  const updatedBookings = getBookings().filter(
    (booking) => booking.status !== "cancelled"
  );

  saveBookings(updatedBookings);

  return updatedBookings;
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