import express from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

/**
 * @route   GET /api/categories
 * @desc    獲取所有分類
 * @access  公開
 */
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '獲取分類列表功能待實現'
  });
});

/**
 * @route   POST /api/categories
 * @desc    添加分類
 * @access  僅管理員
 */
router.post('/', authenticate, authorize('admin'), (req, res) => {
  res.status(201).json({
    success: true,
    message: '添加新分類功能待實現'
  });
});

export default router; 