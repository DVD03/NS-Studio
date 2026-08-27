import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['Weddings', 'Portraits', 'Cinematic Films', 'Drone Aerial', 'Commercials'],
      default: 'Weddings',
    },
    type: {
      type: String,
      enum: ['photo', 'video'],
      default: 'photo',
    },
    image: { type: String, required: true }, // Cover image
    images: { type: [String], default: [] }, // Array of multiple photos inside this album
    videoUrl: { type: String, default: '' },
    details: { type: String, default: '' },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema);
