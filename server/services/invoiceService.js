import Invoice from '../models/Invoice.js';
import { getIsConnected } from '../config/db.js';

// Initial demo invoice matching uploaded sample invoice image # INV-026
let memoryInvoices = [
  {
    _id: 'demo-inv-026',
    invoiceNumber: 'INV-026',
    clientName: 'Kasun Malaka',
    clientPhone: '+94 77 123 4567',
    clientEmail: 'kasun.p@example.com',
    clientAddress: 'Gampaha, Sri Lanka',
    invoiceDate: '17 May 2026',
    dueDate: '17 May 2026',
    terms: 'Due on Receipt',
    items: [
      { description: '16*24 page 30 Album', qty: 1, rate: 0, amount: 0 },
      { description: '20*30 Enlargement 02', qty: 2, rate: 0, amount: 0 },
      { description: '16*24 Enlargement 01', qty: 1, rate: 0, amount: 0 },
      { description: 'Thank You Card', qty: 150, rate: 0, amount: 0 },
      { description: 'Video 2 Camera', qty: 1, rate: 0, amount: 0 },
      { description: 'Full Wedding Coverage Total', qty: 1, rate: 243000, amount: 243000 },
    ],
    subTotal: 243000,
    total: 243000,
    paidAmount: 0,
    balanceDue: 243000,
    paymentStatus: 'Unpaid',
    notes: 'Thanks for your business.',
    createdAt: new Date().toISOString(),
  },
];

export const invoiceService = {
  // Get all invoices
  async getAllInvoices() {
    if (getIsConnected()) {
      const dbInvoices = await Invoice.find().sort({ createdAt: -1 });
      if (dbInvoices.length > 0) return dbInvoices;
    }
    return memoryInvoices;
  },

  // Lookup invoices by phone
  async getInvoicesByPhone(phone) {
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (getIsConnected()) {
      const all = await Invoice.find().sort({ createdAt: -1 });
      return all.filter((inv) => inv.clientPhone.replace(/[^0-9]/g, '').includes(cleanPhone));
    }
    return memoryInvoices.filter((inv) => inv.clientPhone.replace(/[^0-9]/g, '').includes(cleanPhone));
  },

  // Create new invoice
  async createInvoice(invoiceData) {
    // Generate next invoice number if not provided
    if (!invoiceData.invoiceNumber) {
      const count = getIsConnected() ? await Invoice.countDocuments() : memoryInvoices.length;
      invoiceData.invoiceNumber = `INV-${String(count + 27).padStart(3, '0')}`;
    }

    // Calculate totals
    const items = invoiceData.items || [];
    const subTotal = items.reduce((acc, item) => acc + (Number(item.amount) || (Number(item.qty) * Number(item.rate)) || 0), 0);
    const total = invoiceData.total || subTotal;
    const paidAmount = Number(invoiceData.paidAmount) || 0;
    const balanceDue = Math.max(0, total - paidAmount);

    let paymentStatus = 'Unpaid';
    if (paidAmount >= total && total > 0) {
      paymentStatus = 'Paid';
    } else if (paidAmount > 0) {
      paymentStatus = 'Partially Paid';
    }

    const finalPayload = {
      ...invoiceData,
      subTotal,
      total,
      paidAmount,
      balanceDue,
      paymentStatus,
    };

    if (getIsConnected()) {
      const inv = new Invoice(finalPayload);
      return await inv.save();
    }

    const newInv = {
      _id: 'inv_' + Date.now(),
      ...finalPayload,
      createdAt: new Date().toISOString(),
    };
    memoryInvoices.unshift(newInv);
    return newInv;
  },

  // Update payment status / paid amount
  async updatePayment(id, paidAmount) {
    const numericPaid = Number(paidAmount) || 0;
    
    if (getIsConnected()) {
      const inv = await Invoice.findById(id);
      if (!inv) return null;
      
      inv.paidAmount = numericPaid;
      inv.balanceDue = Math.max(0, inv.total - numericPaid);
      if (numericPaid >= inv.total && inv.total > 0) {
        inv.paymentStatus = 'Paid';
      } else if (numericPaid > 0) {
        inv.paymentStatus = 'Partially Paid';
      } else {
        inv.paymentStatus = 'Unpaid';
      }
      return await inv.save();
    }

    const inv = memoryInvoices.find((i) => i._id === id);
    if (inv) {
      inv.paidAmount = numericPaid;
      inv.balanceDue = Math.max(0, inv.total - numericPaid);
      if (numericPaid >= inv.total && inv.total > 0) {
        inv.paymentStatus = 'Paid';
      } else if (numericPaid > 0) {
        inv.paymentStatus = 'Partially Paid';
      } else {
        inv.paymentStatus = 'Unpaid';
      }
    }
    return inv;
  },

  // Delete invoice
  async deleteInvoice(id) {
    if (getIsConnected()) {
      return await Invoice.findByIdAndDelete(id);
    }
    memoryInvoices = memoryInvoices.filter((i) => i._id !== id);
    return { success: true, id };
  },
};
