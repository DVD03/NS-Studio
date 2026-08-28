import express from 'express';
import { invoiceService } from '../services/invoiceService.js';

const router = express.Router();

// GET /api/invoices
router.get('/', async (req, res) => {
  try {
    const { phone } = req.query;
    let invoices;
    if (phone) {
      invoices = await invoiceService.getInvoicesByPhone(phone);
    } else {
      invoices = await invoiceService.getAllInvoices();
    }
    res.json({ success: true, data: invoices, count: invoices.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/invoices
router.post('/', async (req, res) => {
  try {
    const { clientName, clientPhone, items } = req.body;
    if (!clientName || !clientPhone || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Client name, phone number, and at least one item are required.',
      });
    }

    const newInvoice = await invoiceService.createInvoice(req.body);
    res.status(201).json({
      success: true,
      message: 'Quotation/Invoice generated successfully.',
      data: newInvoice,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/invoices/:id/payment
router.patch('/:id/payment', async (req, res) => {
  try {
    const { id } = req.params;
    const { paidAmount } = req.body;
    const updated = await invoiceService.updatePayment(id, paidAmount);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Invoice not found.' });
    }
    res.json({ success: true, message: 'Payment status updated successfully.', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/invoices/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await invoiceService.deleteInvoice(id);
    res.json({ success: true, message: 'Invoice deleted successfully.', data: deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
