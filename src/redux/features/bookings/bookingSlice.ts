import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Booking } from "@/services/booking/bookingStorage";

interface BookingsState {
  bookings: Booking[];
}

const initialState: BookingsState = {
  bookings: [],
};

const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
    },

    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },

    updateBookingInStore: (
      state,
      action: PayloadAction<{
        bookingId: string;
        updates: Partial<Booking>;
      }>
    ) => {
      const booking = state.bookings.find(
        (item) => item.bookingId === action.payload.bookingId
      );

      if (booking) {
        Object.assign(booking, action.payload.updates);
      }
    },

    cancelBookingInStore: (
      state,
      action: PayloadAction<string>
    ) => {
      const booking = state.bookings.find(
        (item) => item.bookingId === action.payload
      );

      if (booking) {
        booking.status = "cancelled";
      }
    },
  },
});

export const {
  setBookings,
  addBooking,
  updateBookingInStore,
  cancelBookingInStore,
} = bookingSlice.actions;

export default bookingSlice.reducer;