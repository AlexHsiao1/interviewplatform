import { Request, Response, NextFunction } from 'express';
import { ValidationError as SequelizeValidationError } from 'sequelize';
import { Error as MongooseError } from 'mongoose';
import { AppError, ValidationError } from '../utils/AppError';
import logger from '../utils/logger';
import env from '../config/env';

/**
 * 全局錯誤處理中間件
 * 處理所有應用程序錯誤並發送適當的HTTP響應
 */
const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  logger.error('錯誤處理中間件捕獲到錯誤:', {
    message: err.message,
    stack: env.NODE_ENV === 'development' ? err.stack : undefined,
  });

  // 默認錯誤響應
  let statusCode = 500;
  let message = '服務器內部錯誤';
  let errors: Record<string, string[]> | null = null;
  let isOperational = false;

  // 處理應用程序錯誤
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
    isOperational = err.isOperational;
  }
  // 處理Sequelize驗證錯誤
  else if (err instanceof SequelizeValidationError) {
    statusCode = 422;
    message = '數據驗證錯誤';
    errors = {};

    err.errors.forEach((error) => {
      const field = error.path || 'unknown';
      if (!errors![field]) {
        errors![field] = [];
      }
      errors![field].push(error.message);
    });
  }
  // 處理Mongoose錯誤
  else if (err instanceof MongooseError.ValidationError) {
    statusCode = 422;
    message = '數據驗證錯誤';
    errors = {};

    Object.keys(err.errors).forEach((field) => {
      errors![field] = [err.errors[field].message];
    });
  }
  // 處理MongoDB重複鍵錯誤
  else if (err.name === 'MongoServerError' && (err as any).code === 11000) {
    statusCode = 409;
    message = '數據已存在';
    const field = Object.keys((err as any).keyPattern)[0];
    errors = {
      [field]: [`該${field}已被使用`],
    };
  }
  // 處理JSON解析錯誤
  else if (err instanceof SyntaxError && (err as any).status === 400) {
    statusCode = 400;
    message = '無效的JSON數據';
  }

  // 構建錯誤響應
  const errorResponse: Record<string, any> = {
    success: false,
    status: statusCode,
    message,
  };

  // 開發環境下添加更多調試信息
  if (env.NODE_ENV === 'development') {
    errorResponse.stack = err.stack;
    errorResponse.isOperational = isOperational;
  }

  // 如果有驗證錯誤，添加到響應中
  if (errors) {
    errorResponse.errors = errors;
  }

  // 發送錯誤響應
  return res.status(statusCode).json(errorResponse);
};

export default errorHandler; 