import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { initDatabases } from './config/db';
import logger from './utils/logger';
import env from './config/env';
import errorHandler from './middleware/errorHandler';

// 初始化Express應用程序
const app = express();

// 中間件
app.use(helmet()); // 安全頭
app.use(compression()); // gzip壓縮
app.use(cors()); // CORS支持
app.use(express.json({ limit: '10mb' })); // 解析JSON請求體
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // 解析URL編碼請求體
app.use(morgan('dev')); // HTTP請求日誌

// 健康檢查路由
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API路由
const apiRouter = express.Router();
app.use('/api', apiRouter);

// 臨時API路由 - 測試用
apiRouter.get('/test', (req, res) => {
  res.status(200).json({ message: 'API服務器運行正常' });
});

// 404處理
app.use('*', (req, res) => {
  res.status(404).json({ message: '找不到請求的資源' });
});

// 全局錯誤處理
app.use(errorHandler);

// 啟動服務器
const PORT = env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {
    // 初始化數據庫連接
    await initDatabases();
    
    // 啟動HTTP服務器
    app.listen(PORT, () => {
      logger.info(`服務器運行在端口: ${PORT}`);
      logger.info(`環境: ${env.NODE_ENV}`);
      logger.info(`API基礎路徑: /api`);
    });
  } catch (error) {
    logger.error('服務器啟動失敗:', error);
    if (typeof process !== 'undefined') {
      process.exit(1);
    }
  }
};

// 捕獲未處理的 Promise 拒絕
if (typeof process !== 'undefined') {
  process.on('unhandledRejection', (reason: any) => {
    logger.error('未處理的Promise拒絕:', reason);
  });

  // 捕獲未捕獲的異常
  process.on('uncaughtException', (error: Error) => {
    logger.error('未捕獲的異常:', error);
    // 對於未捕獲的異常，我們應該優雅地關閉服務器
    process.exit(1);
  });
}

// 啟動服務器
startServer(); 