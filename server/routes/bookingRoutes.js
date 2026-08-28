import express from 'express';
import { bookingService } from '../services/bookingService.js';

const router = express.Router();

// GET /api/bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.json({ success: true, data: bookings, count: bookings.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/bookings
router.post('/', async (req, res) => {
  try {
    const { name, phone, email, eventType, eventDate, timeSlot, servicePackage, budget, message } = req.body;
    
    if (!name || !phone || !email || !eventDate || !timeSlot) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone, email, event date, and time are required.',
      });
    }

    const newBooking = await bookingService.createBooking({
      name,
      phone,
      email,
      eventType,
      eventDate,
      timeSlot,
      servicePackage,
      budget,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Booking request created successfully.',
      data: newBooking,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PATCH /api/bookings/:id/status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'Confirmed', 'Completed', 'Cancelled'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }

    const updated = await bookingService.updateBookingStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    res.json({ success: true, message: 'Status updated successfully.', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/bookings/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await bookingService.deleteBooking(id);
    res.json({ success: true, message: 'Booking deleted successfully.', data: deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
