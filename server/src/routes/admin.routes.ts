import express from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

/**
 * @route   GET /api/admin/users
 * @desc    獲取所有用戶列表
 * @access  僅管理員
 */
router.get('/users', authenticate, authorize('admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: '獲取所有用戶功能待實現'
  });
});

/**
 * @route   GET /api/admin/interviews/pending
 * @desc    獲取待審核的面試經驗
 * @access  僅管理員
 */
router.get('/interviews/pending', authenticate, authorize('admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: '獲取待審核面試經驗功能待實現'
  });
});

/**
 * @route   PUT /api/admin/interviews/:id/approve
 * @desc    批准面試經驗
 * @access  僅管理員
 */
router.put('/interviews/:id/approve', authenticate, authorize('admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: `批准面試ID: ${req.params.id}功能待實現`
  });
});

/**
 * @route   PUT /api/admin/interviews/:id/reject
 * @desc    拒絕面試經驗
 * @access  僅管理員
 */
router.put('/interviews/:id/reject', authenticate, authorize('admin'), (req, res) => {
  res.status(200).json({
    success: true,
    message: `拒絕面試ID: ${req.params.id}功能待實現`
  });
});

export default router; 