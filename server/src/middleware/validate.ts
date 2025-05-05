import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { ValidationError } from '../utils/AppError';

/**
 * 數據驗證中間件
 * 使用express-validator驗證請求數據
 */
const validate = (req: Request, res: Response, next: NextFunction) => {
  // 獲取驗證結果
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  // 格式化錯誤信息
  const formattedErrors: Record<string, string[]> = {};

  errors.array().forEach((error: any) => {
    const field = error.param;
    if (!formattedErrors[field]) {
      formattedErrors[field] = [];
    }
    formattedErrors[field].push(error.msg);
  });

  // 創建自定義驗證錯誤並傳遞給錯誤處理中間件
  const validationError = new ValidationError('請求數據驗證失敗', formattedErrors);
  next(validationError);
};

export default validate; 