import dotenv from 'dotenv';
import path from 'path';

// 加載環境變量
dotenv.config({
  path: path.resolve(process.cwd(), '.env')
});

/**
 * 環境變量配置
 */
export const env = {
  // 服務器配置
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: parseInt(process.env.PORT || '5000', 10),
  
  // JWT配置
  JWT_SECRET: process.env.JWT_SECRET || 'default_jwt_secret_key',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  
  // MongoDB配置
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/interview_platform',
  
  // PostgreSQL配置
  POSTGRES: {
    HOST: process.env.POSTGRES_HOST || 'localhost',
    PORT: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    USER: process.env.POSTGRES_USER || 'postgres',
    PASSWORD: process.env.POSTGRES_PASSWORD || 'password',
    DB: process.env.POSTGRES_DB || 'interview_platform_users',
  },
  
  // 日誌配置
  LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  
  // 郵件配置
  EMAIL: {
    SMTP_HOST: process.env.SMTP_HOST || '',
    SMTP_PORT: parseInt(process.env.SMTP_PORT || '587', 10),
    SMTP_USER: process.env.SMTP_USER || '',
    SMTP_PASS: process.env.SMTP_PASS || '',
    FROM: process.env.EMAIL_FROM || 'noreply@interviewplatform.com',
  },
  
  // 積分配置
  POINTS: {
    FOR_INTERVIEW_SUBMISSION: parseInt(process.env.POINTS_FOR_INTERVIEW_SUBMISSION || '50', 10),
    FOR_VIEWING_INTERVIEW: parseInt(process.env.POINTS_FOR_VIEWING_INTERVIEW || '10', 10),
  },
  
  // API前綴
  API_PREFIX: '/api',
};

// 驗證必要的環境變量
const requiredEnvVars = [
  'JWT_SECRET',
  'MONGODB_URI',
  'POSTGRES_USER',
  'POSTGRES_PASSWORD',
  'POSTGRES_DB',
];

// 在生產環境下檢查必要的環境變量
if (env.NODE_ENV === 'production') {
  const missingEnvVars = requiredEnvVars.filter((varName) => {
    const value = process.env[varName];
    return value === undefined || value === null || value === '';
  });
  
  if (missingEnvVars.length > 0) {
    throw new Error(`缺少必要的環境變量: ${missingEnvVars.join(', ')}`);
  }
}

export default env; 