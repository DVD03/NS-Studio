import express from 'express';
import { portfolioService } from '../services/portfolioService.js';

const router = express.Router();

// GET /api/portfolio
router.get('/', async (req, res) => {
  try {
    const items = await portfolioService.getAllPortfolioItems();
    res.json({ success: true, data: items, count: items.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/portfolio
router.post('/', async (req, res) => {
  try {
    const { title, category, type, image, images, videoUrl, details } = req.body;

    if (!title || !category || !image) {
      return res.status(400).json({
        success: false,
        message: 'Title, category, and image URL are required.',
      });
    }

    const newItem = await portfolioService.createPortfolioItem({
      title,
      category,
      type: type || 'photo',
      image,
      images: Array.isArray(images) && images.length > 0 ? images : [image],
      videoUrl: videoUrl || '',
      details: details || '',
    });

    res.status(201).json({
      success: true,
      message: 'Portfolio album item added successfully.',
      data: newItem,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// DELETE /api/portfolio/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await portfolioService.deletePortfolioItem(id);
    res.json({ success: true, message: 'Portfolio album item deleted successfully.', data: deleted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
