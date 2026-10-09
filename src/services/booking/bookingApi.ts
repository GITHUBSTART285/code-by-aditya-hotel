import type { Booking } from "./bookingStorage";

export async function createBooking(booking: Booking) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is missing in .env.local");
  }

  const response = await fetch(`${apiUrl}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking),
  });

  if (!response.ok) {
    throw new Error(`Booking request failed: ${response.status}`);
  }

  return response.json();
}