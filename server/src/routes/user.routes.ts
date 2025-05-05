import express from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

/**
 * @route   GET /api/users/profile
 * @desc    獲取用戶個人檔案
 * @access  私有
 */
router.get('/profile', authenticate, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

/**
 * @route   GET /api/users/:id
 * @desc    通過ID獲取用戶
 * @access  私有/管理員
 */
router.get('/:id', authenticate, authorize('admin'), (req, res) => {
  res.status(200).json({ message: '獲取用戶功能待實現' });
});

export default router; 