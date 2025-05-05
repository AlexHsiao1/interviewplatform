import express from 'express';
import { body } from 'express-validator';
import authController from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';
import validate from '../middleware/validate';

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    用戶註冊
 * @access  公開
 */
router.post(
  '/register',
  [
    // 驗證請求數據
    body('username')
      .trim()
      .isLength({ min: 3, max: 30 })
      .withMessage('用戶名必須在3-30個字符之間')
      .isAlphanumeric()
      .withMessage('用戶名只能包含字母和數字'),
    body('email')
      .isEmail()
      .withMessage('請提供有效的電子郵件')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('密碼必須至少有6個字符')
      .matches(/\d/)
      .withMessage('密碼必須包含至少一個數字'),
    body('confirmPassword')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('確認密碼必須與密碼匹配');
        }
        return true;
      }),
    // 應用驗證中間件
    validate,
  ],
  authController.register
);

/**
 * @route   POST /api/auth/login
 * @desc    用戶登錄
 * @access  公開
 */
router.post(
  '/login',
  [
    // 驗證請求數據
    body('email')
      .isEmail()
      .withMessage('請提供有效的電子郵件')
      .normalizeEmail(),
    body('password').not().isEmpty().withMessage('密碼是必填的'),
    // 應用驗證中間件
    validate,
  ],
  authController.login
);

/**
 * @route   GET /api/auth/me
 * @desc    獲取當前登錄用戶的資料
 * @access  私有
 */
router.get('/me', authenticate, authController.getCurrentUser);

export default router; 