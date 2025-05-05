import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticationError, ValidationError } from '../utils/AppError';
import { User } from '../models/user.model';
import env from '../config/env';
import logger from '../utils/logger';

/**
 * 生成JWT令牌
 */
const generateToken = (id: string): string => {
  return jwt.sign(
    { id },
    env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

/**
 * 用戶註冊
 * POST /api/auth/register
 */
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // 確認密碼匹配
    if (password !== confirmPassword) {
      throw new ValidationError('密碼不匹配', {
        confirmPassword: ['確認密碼與密碼不匹配'],
      });
    }

    // 檢查電子郵件是否已被使用
    const userWhere = { where: { email } };
    const existingUser = await User.findOne(userWhere as any);
    if (existingUser) {
      throw new ValidationError('驗證失敗', {
        email: ['此電子郵件已被使用'],
      });
    }

    // 檢查用戶名是否已被使用
    const existingUsername = await User.findOne({ where: { username } });
    if (existingUsername) {
      throw new ValidationError('驗證失敗', {
        username: ['此用戶名已被使用'],
      });
    }

    // 創建新用戶
    const user = await User.create({
      username,
      email,
      password,
      points: 20, // 新用戶獎勵積分
      role: 'user',
    });

    // 生成JWT令牌
    const token = generateToken(user.id);

    // 更新最後登錄時間
    await user.update({ lastLogin: new Date() });

    logger.info(`新用戶已註冊: ${username} (${email})`);

    // 發送響應
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        points: user.points,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 用戶登錄
 * POST /api/auth/login
 */
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // 檢查電子郵件和密碼
    if (!email || !password) {
      throw new ValidationError('請提供電子郵件和密碼', {
        email: !email ? ['電子郵件是必填的'] : [],
        password: !password ? ['密碼是必填的'] : [],
      });
    }

    // 查找用戶
    const user = await User.findOne({ where: { email } });

    // 檢查用戶存在並驗證密碼
    if (!user || !(await user.comparePassword(password))) {
      throw new AuthenticationError('電子郵件或密碼不正確');
    }

    // 生成JWT令牌
    const token = generateToken(user.id);

    // 更新最後登錄時間
    await user.update({ lastLogin: new Date() });

    logger.info(`用戶登錄: ${user.username} (${user.email})`);

    // 發送響應
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        points: user.points,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 獲取當前用戶信息
 * GET /api/auth/me
 */
export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 從認證中間件取得用戶信息
    const user = req.user;

    if (!user) {
      throw new AuthenticationError('用戶未認證');
    }

    // 發送響應
    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        points: user.points,
        role: user.role,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
  login,
  getCurrentUser,
}; 