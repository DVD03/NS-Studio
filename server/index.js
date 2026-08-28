import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import bookingRoutes from './routes/bookingRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));

// Connect Database
connectDB();

// API Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'NS Studio Gampaha Backend API',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/invoices', invoiceRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`[Express Backend] Server running on http://localhost:${PORT}`);
});
