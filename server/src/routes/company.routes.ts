import express from 'express';
import { authenticate } from '../middleware/auth';

const router = express.Router();

/**
 * @route   GET /api/companies
 * @desc    獲取所有公司
 * @access  公開
 */
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '獲取公司列表功能待實現'
  });
});

/**
 * @route   GET /api/companies/:id
 * @desc    獲取單個公司
 * @access  公開
 */
router.get('/:id', (req, res) => {
  res.status(200).json({
    success: true,
    message: `獲取公司ID: ${req.params.id}的詳細信息功能待實現`
  });
});

/**
 * @route   POST /api/companies
 * @desc    添加公司
 * @access  私有
 */
router.post('/', authenticate, (req, res) => {
  res.status(201).json({
    success: true,
    message: '添加新公司功能待實現'
  });
});

export default router; 