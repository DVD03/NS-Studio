import express from 'express';
import Settings from '../models/Settings.js';
import { getIsConnected } from '../config/db.js';

const router = express.Router();

let memorySettings = {
  primaryColor: '#f59e0b',
  secondaryColor: '#10b981',
  fontFamilySans: 'Inter',
  fontFamilySerif: 'Playfair Display'
};

// GET /api/settings
router.get('/', async (req, res) => {
  try {
    if (getIsConnected()) {
      let settings = await Settings.findOne({ isGlobal: true });
      if (!settings) {
        settings = await Settings.create({ isGlobal: true });
      }
      return res.json({ success: true, data: settings });
    }
    return res.json({ success: true, data: memorySettings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// PUT /api/settings
router.put('/', async (req, res) => {
  try {
    const { primaryColor, secondaryColor, fontFamilySans, fontFamilySerif } = req.body;
    
    if (getIsConnected()) {
      let settings = await Settings.findOne({ isGlobal: true });
      if (!settings) {
        settings = new Settings({ isGlobal: true });
      }
      if (primaryColor) settings.primaryColor = primaryColor;
      if (secondaryColor) settings.secondaryColor = secondaryColor;
      if (fontFamilySans) settings.fontFamilySans = fontFamilySans;
      if (fontFamilySerif) settings.fontFamilySerif = fontFamilySerif;
      
      await settings.save();
      return res.json({ success: true, data: settings });
    }
    
    if (primaryColor) memorySettings.primaryColor = primaryColor;
    if (secondaryColor) memorySettings.secondaryColor = secondaryColor;
    if (fontFamilySans) memorySettings.fontFamilySans = fontFamilySans;
    if (fontFamilySerif) memorySettings.fontFamilySerif = fontFamilySerif;
    
    res.json({ success: true, data: memorySettings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
