import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    eventType: { type: String, default: 'Wedding' },
    eventDate: { type: String, required: true },
    servicePackage: { type: String, default: 'Wedding Film & Photo Classic' },
    budget: { type: String, default: '$1,000 - $2,500' },
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
