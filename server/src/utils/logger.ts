import winston from 'winston';
import env from '../config/env';

// 定義日誌格式
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.json()
);

// 創建日誌實例
const logger = winston.createLogger({
  level: env.LOG_LEVEL,
  format: logFormat,
  defaultMeta: { service: 'interview-platform-api' },
  transports: [
    // 生產環境下寫入到文件
    ...(env.NODE_ENV === 'production'
      ? [
          // 錯誤日誌
          new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
          // 所有日誌
          new winston.transports.File({ filename: 'logs/combined.log' }),
        ]
      : []),
    // 非生產環境下輸出到控制台
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, ...rest }) => {
          const metaData = Object.keys(rest).length
            ? JSON.stringify(rest, null, 2)
            : '';
            
          return `${timestamp} ${level}: ${message} ${metaData}`;
        })
      ),
    }),
  ],
});

// 添加HTTP請求日誌中間件
export const loggerMiddleware = (req: any, res: any, next: any) => {
  // 記錄API請求
  logger.info(`${req.method} ${req.originalUrl}`, {
    ip: req.ip,
    user: req.user ? req.user.id : 'guest',
  });
  next();
};

export default logger; 