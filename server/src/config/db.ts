import mongoose from 'mongoose';
import { Sequelize } from 'sequelize';
import env from './env';
import logger from '../utils/logger';

/**
 * MongoDB連接
 * 用於存儲面試經驗、公司信息等非結構化數據
 */
export const connectMongoDB = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(env.MONGODB_URI, {
      // 不需要額外的設定，mongoose 7+ 已經默認使用較新的連接設置
    });
    
    logger.info(`MongoDB 已連接: ${connection.connection.host}`);
  } catch (error) {
    logger.error('MongoDB 連接失敗:', error);
    process.exit(1);
  }
};

/**
 * PostgreSQL連接
 * 用於存儲用戶帳號、權限管理等結構化數據
 */
export const sequelize = new Sequelize(
  env.POSTGRES.DB,
  env.POSTGRES.USER,
  env.POSTGRES.PASSWORD,
  {
    host: env.POSTGRES.HOST,
    port: env.POSTGRES.PORT,
    dialect: 'postgres',
    logging: env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

/**
 * 測試PostgreSQL連接
 */
export const testPostgresConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    logger.info('PostgreSQL 連接已建立');
    
    // 同步數據庫結構
    await sequelize.sync({ alter: true });
    logger.info('數據庫結構已同步');
  } catch (error) {
    logger.error('PostgreSQL 連接或同步失敗:', error);
    process.exit(1);
  }
};

/**
 * 初始化兩個數據庫連接
 */
export const initDatabases = async (): Promise<void> => {
  await connectMongoDB();
  await testPostgresConnection();
  
  logger.info('所有數據庫連接已初始化');
};

export default {
  connectMongoDB,
  sequelize,
  testPostgresConnection,
  initDatabases,
}; 