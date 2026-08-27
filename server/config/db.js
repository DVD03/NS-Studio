import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/photographer_db';

let isConnected = false;

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI, {
      serverSelectionTimeoutMS: 10000,
    });
    isConnected = true;
    console.log(`[MongoDB Atlas] Connected successfully to host: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`[MongoDB Warning] Could not connect to Atlas URI (${error.message}). Operating in resilient mode.`);
    isConnected = false;
  }
};

export const getIsConnected = () => isConnected;
