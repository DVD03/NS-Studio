import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    eventType: { type: String, default: 'Wedding' },
    eventDate: { type: String, required: true },
    timeSlot: { type: String, default: '09:00 - 17:00' },
    servicePackage: { type: String, default: 'Wedding Film & Photo Classic' },
    budget: { type: String, default: 'LKR 375,000' },
    advancePaid: { type: Number, default: 0 },
    balanceDue: { type: Number, default: 0 },
    paymentStatus: {
      type: String,
      enum: ['Unpaid', 'Partially Paid', 'Paid'],
      default: 'Unpaid',
    },
    message: { type: String, default: '' },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
