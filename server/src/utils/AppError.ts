/**
 * 應用程序錯誤類
 * 處理業務邏輯錯誤和HTTP響應錯誤
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errors: Record<string, string[]> | null;

  constructor(
    message: string,
    statusCode: number = 500,
    errors: Record<string, string[]> | null = null,
    isOperational: boolean = true
  ) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;

    // 設置原型鏈
    Object.setPrototypeOf(this, AppError.prototype);

    // 捕獲堆棧跟踪
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * 身份驗證錯誤
 * 用於處理未授權訪問
 */
export class AuthenticationError extends AppError {
  constructor(message: string = '認證失敗') {
    super(message, 401);
  }
}

/**
 * 授權錯誤
 * 用於處理權限不足的情況
 */
export class AuthorizationError extends AppError {
  constructor(message: string = '沒有權限執行此操作') {
    super(message, 403);
  }
}

/**
 * 資源未找到錯誤
 */
export class NotFoundError extends AppError {
  constructor(resource: string = '資源') {
    super(`找不到請求的${resource}`, 404);
  }
}

/**
 * 驗證錯誤
 * 用於處理輸入數據驗證錯誤
 */
export class ValidationError extends AppError {
  constructor(message: string = '提供的數據無效', errors: Record<string, string[]> | null = null) {
    super(message, 422, errors);
  }
}

/**
 * 積分不足錯誤
 */
export class InsufficientPointsError extends AppError {
  constructor(required: number, available: number) {
    super(
      `積分不足。需要 ${required} 積分，但只有 ${available} 積分可用`,
      400
    );
  }
}

/**
 * 業務邏輯錯誤
 * 用於處理一般業務邏輯約束錯誤
 */
export class BusinessError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export default AppError; 