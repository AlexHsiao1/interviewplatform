import express from 'express';
import { authenticate, checkPoints } from '../middleware/auth';

const router = express.Router();

/**
 * @route   GET /api/interviews
 * @desc    獲取所有面試經驗
 * @access  公開
 */
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '獲取面試列表功能待實現'
  });
});

/**
 * @route   GET /api/interviews/:id
 * @desc    獲取單個面試經驗
 * @access  需要積分
 */
router.get('/:id', authenticate, checkPoints(10), (req, res) => {
  res.status(200).json({
    success: true,
    message: `查看面試ID: ${req.params.id}的詳細信息功能待實現`
  });
});

/**
 * @route   POST /api/interviews
 * @desc    提交面試經驗
 * @access  私有
 */
router.post('/', authenticate, (req, res) => {
  res.status(201).json({
    success: true,
    message: '提交面試經驗功能待實現'
  });
});

export default router; 