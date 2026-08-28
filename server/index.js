import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import bookingRoutes from './routes/bookingRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

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
app.use('/api/settings', settingsRoutes);

// Start Server
const server = app.listen(PORT, () => {
  console.log(`[Express Backend] Server running on http://localhost:${PORT}`);
});

server.on('close', () => console.log('Express Server closed'));
server.on('error', (err) => console.error('Express Server error:', err));
process.on('exit', (code) => console.log('Node process exiting with code', code));
