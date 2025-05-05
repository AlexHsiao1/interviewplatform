import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticationError, AuthorizationError } from '../utils/AppError';
import env from '../config/env';
import { User } from '../models/user.model';

// 擴展Request類型以包含user屬性
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

/**
 * 驗證JWT令牌中間件
 * 檢查請求頭的Authorization令牌，驗證並提取用戶信息
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // 獲取請求頭的Authorization令牌
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AuthenticationError('未提供令牌');
    }
    
    // 提取令牌
    const token = authHeader.split(' ')[1];
    
    if (!token) {
      throw new AuthenticationError('未提供有效令牌');
    }
    
    // 驗證令牌並獲取解碼的數據
    const decoded = jwt.verify(token, env.JWT_SECRET) as { id: string; iat: number; exp: number };
    
    // 查找用戶
    const user = await User.findOne({ where: { id: decoded.id } });
    
    if (!user) {
      throw new AuthenticationError('用戶不存在或令牌無效');
    }
    
    // 將用戶信息添加到請求對象
    req.user = user;
    
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return next(new AuthenticationError('令牌無效'));
    }
    
    if (error instanceof jwt.TokenExpiredError) {
      return next(new AuthenticationError('令牌已過期'));
    }
    
    next(error);
  }
};

/**
 * 角色授權中間件
 * 檢查用戶是否具有指定的角色
 */
export const authorize = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AuthenticationError('用戶未認證'));
    }
    
    if (!roles.includes(req.user.role)) {
      return next(
        new AuthorizationError('沒有權限執行此操作')
      );
    }
    
    next();
  };
};

/**
 * 檢查用戶是否有足夠的積分
 */
export const checkPoints = (requiredPoints: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AuthenticationError('用戶未認證'));
    }
    
    if (req.user.points < requiredPoints) {
      return next(
        new AuthorizationError(`積分不足。需要 ${requiredPoints} 積分，但只有 ${req.user.points} 積分可用。`)
      );
    }
    
    next();
  };
};

export default {
  authenticate,
  authorize,
  checkPoints,
}; 