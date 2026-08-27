import Portfolio from '../models/Portfolio.js';
import { getIsConnected } from '../config/db.js';

let memoryPortfolio = [
  {
    _id: 'pf-1',
    type: 'photo',
    title: 'Royal Beachfront Vows',
    category: 'Weddings',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85',
    images: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1400&q=85',
    ],
    details: 'Captured during sunset at Bentota Beach. Soft natural lighting with high-resolution detail.',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'pf-2',
    type: 'video',
    title: 'Cinematic Highlights - Amaya & Rohan',
    category: 'Cinematic Films',
    image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=85',
    images: ['https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1400&q=85'],
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    details: '4K 120fps slow-motion film with custom color grading and sound design.',
    createdAt: new Date().toISOString(),
  },
];

export const portfolioService = {
  async getAllPortfolioItems() {
    if (getIsConnected()) {
      const items = await Portfolio.find().sort({ createdAt: -1 });
      if (items.length > 0) return items;
    }
    return memoryPortfolio;
  },

  async createPortfolioItem(itemData) {
    const itemPayload = {
      ...itemData,
      images: Array.isArray(itemData.images) && itemData.images.length > 0
        ? itemData.images
        : [itemData.image],
    };

    if (getIsConnected()) {
      const item = new Portfolio(itemPayload);
      return await item.save();
    }
    const newItem = {
      _id: 'pf_' + Date.now(),
      ...itemPayload,
      createdAt: new Date().toISOString(),
    };
    memoryPortfolio.unshift(newItem);
    return newItem;
  },

  async deletePortfolioItem(id) {
    if (getIsConnected()) {
      return await Portfolio.findByIdAndDelete(id);
    }
    memoryPortfolio = memoryPortfolio.filter((item) => item._id !== id);
    return { success: true, id };
  },
};
