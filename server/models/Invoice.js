import mongoose from 'mongoose';

const invoiceItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  qty: { type: Number, required: true, default: 1 },
  rate: { type: Number, required: true, default: 0 },
  amount: { type: Number, required: true, default: 0 },
});

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true, trim: true },
    clientName: { type: String, required: true, trim: true },
    clientPhone: { type: String, required: true, trim: true },
    clientEmail: { type: String, default: '' },
    clientAddress: { type: String, default: 'Sri Lanka' },
    invoiceDate: { type: String, required: true },
    dueDate: { type: String, required: true },
    terms: { type: String, default: 'Due on Receipt' },
    items: [invoiceItemSchema],
    subTotal: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true, default: 0 },
    paidAmount: { type: Number, default: 0 },
    balanceDue: { type: Number, required: true, default: 0 },
    paymentStatus: {
      type: String,
      enum: ['Unpaid', 'Partially Paid', 'Paid'],
      default: 'Unpaid',
    },
    notes: { type: String, default: 'Thanks for your business.' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Invoice || mongoose.model('Invoice', invoiceSchema);
