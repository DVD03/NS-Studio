import Booking from '../models/Booking.js';
import { getIsConnected } from '../config/db.js';

let memoryBookings = [
  {
    _id: 'demo-b1',
    name: 'Kasun & Dinusha Perera',
    phone: '+94 77 123 4567',
    email: 'kasun.p@example.com',
    eventType: 'Wedding',
    eventDate: '2026-11-20',
    timeSlot: '08:00 - 16:00',
    servicePackage: 'Wedding Film & Photo Classic',
    budget: 'LKR 375,000',
    advancePaid: 100000,
    balanceDue: 275000,
    paymentStatus: 'Partially Paid',
    message: 'Looking for full day coverage in Gampaha. Ceremony starts at 9 AM.',
    status: 'Confirmed',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    _id: 'demo-b2',
    name: 'Shehan De Silva',
    phone: '+94 77 305 3014',
    email: 'shehan.ds@example.com',
    eventType: 'Commercial',
    eventDate: '2026-10-05',
    timeSlot: '13:00 - 18:00',
    servicePackage: 'Ultimate Cinema & Drone Combo',
    budget: 'Above LKR 750,000',
    advancePaid: 0,
    balanceDue: 750000,
    paymentStatus: 'Unpaid',
    message: 'Need dynamic tracking shots for luxury promotional video.',
    status: 'Pending',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
];

export const bookingService = {
  // Create new booking inquiry
  async createBooking(bookingData) {
    const payload = {
      timeSlot: bookingData.timeSlot || '09:00 - 17:00',
      advancePaid: Number(bookingData.advancePaid) || 0,
      balanceDue: Number(bookingData.balanceDue) || 0,
      paymentStatus: bookingData.paymentStatus || 'Unpaid',
      ...bookingData,
    };

    if (getIsConnected()) {
      const booking = new Booking(payload);
      return await booking.save();
    }
    const newBooking = {
      _id: 'bk_' + Date.now(),
      ...payload,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };
    memoryBookings.unshift(newBooking);
    return newBooking;
  },

  // Get all booking inquiries
  async getAllBookings() {
    if (getIsConnected()) {
      const dbBookings = await Booking.find().sort({ createdAt: -1 });
      if (dbBookings.length > 0) return dbBookings;
    }
    return memoryBookings;
  },

  // Update booking status
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
