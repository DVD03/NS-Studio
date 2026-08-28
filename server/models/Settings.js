import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema(
  {
    primaryColor: { type: String, default: '#f59e0b' },
    secondaryColor: { type: String, default: '#10b981' },
    fontFamilySans: { type: String, default: 'Inter' },
    fontFamilySerif: { type: String, default: 'Playfair Display' },
    isGlobal: { type: Boolean, default: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Settings || mongoose.model('Settings', settingsSchema);
