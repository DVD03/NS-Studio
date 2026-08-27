import Booking from '../models/Booking.js';
import { getIsConnected } from '../config/db.js';

// In-memory persistent fallback store for client demos if MongoDB daemon is offline
let memoryBookings = [
  {
    _id: 'demo-b1',
    name: 'Kasun & Dinusha Perera',
    phone: '+94 77 123 4567',
    email: 'kasun.p@example.com',
    eventType: 'Wedding',
    eventDate: '2026-11-20',
    servicePackage: 'Wedding Film & Photo Classic',
    budget: '$1,000 - $2,500',
    message: 'Looking for full day coverage at Shangri-La Colombo. Ceremony starts at 9 AM.',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    _id: 'demo-b2',
    name: 'Shehan De Silva',
    phone: '+94 71 987 6543',
    email: 'shehan.ds@example.com',
    eventType: 'Commercial',
    eventDate: '2026-10-05',
    servicePackage: 'Ultimate Cinema & Drone Combo',
    budget: '$2,500+',
    message: 'Need dynamic tracking shots for luxury resort promotional video in Galle.',
    status: 'Pending',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];

export const bookingService = {
  // Create new booking inquiry
  async createBooking(bookingData) {
    if (getIsConnected()) {
      const booking = new Booking(bookingData);
      return await booking.save();
    }
    const newBooking = {
      _id: 'bk_' + Date.now(),
      ...bookingData,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    memoryBookings.unshift(newBooking);
    return newBooking;
  },

  // Get all booking inquiries
  async getAllBookings() {
    if (getIsConnected()) {
      return await Booking.find().sort({ createdAt: -1 });
    }
    return memoryBookings;
  },

  // Update booking status (Pending, Confirmed, Completed, Cancelled)
  async updateBookingStatus(id, status) {
    if (getIsConnected()) {
      return await Booking.findByIdAndUpdate(id, { status }, { new: true });
    }
    const item = memoryBookings.find(b => b._id === id);
    if (item) {
      item.status = status;
    }
    return item;
  },

  // Delete booking inquiry
  async deleteBooking(id) {
    if (getIsConnected()) {
      return await Booking.findByIdAndDelete(id);
    }
    memoryBookings = memoryBookings.filter(b => b._id !== id);
    return { success: true, id };
  },
};
