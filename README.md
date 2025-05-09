# 面試資訊分享平台

一個用於分享和查看面試經驗的平台，採用積分交換機制。

## 核心功能

- 用戶可以分享自己的面試經驗來獲取積分
- 使用積分查看其他用戶的面試心得
- 內容經過審核後才會發布
- 支持匿名分享
- 提供公司、職位、地區等多維度搜索功能

## 技術堆疊

### 前端
- React.js
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Axios

### 後端
- Node.js
- Express
- TypeScript
- MongoDB (用於內容)
- PostgreSQL (用於用戶管理)
- JWT 認證

### 部署
- Docker
- Docker Compose

## 本地開發設置

### 前提條件
- Node.js 18+
- Docker 和 Docker Compose
- Git

### 安裝步驟

1. 克隆儲存庫：

```bash
git clone <repository-url>
cd interview-platform
```

2. 安裝前端依賴：

```bash
cd client
npm install
```

注意：如果出現類型錯誤，這主要是由於缺少TypeScript的類型定義文件。在安裝依賴後，這些錯誤應該會自動解決。如果仍有問題，可以手動安裝以下類型定義：

```bash
npm install --save-dev @types/react @types/react-dom @types/node @types/react-router-dom
```

3. 安裝後端依賴：

```bash
cd ../server
npm install
```

4. 使用Docker Compose啟動服務：

```bash
cd ..
docker-compose up
```

這將啟動所有服務：
- 前端 - http://localhost:3000
- 後端 API - http://localhost:5000
- MongoDB - localhost:27017
- PostgreSQL - localhost:5432
- Adminer (數據庫管理) - http://localhost:8080

### 不使用Docker的設置

#### 前端設置

```bash
cd client
npm install
npm start
```

#### 後端設置

```bash
cd server
npm install
npm run dev
```

## 項目結構

```
interview-platform/
├── client/                 # 前端React應用
│   ├── src/
│   │   ├── components/     # 可重用組件
│   │   ├── pages/          # 頁面組件
│   │   ├── context/        # React上下文
│   │   ├── hooks/          # 自定義鉤子
│   │   ├── services/       # API服務
│   │   ├── utils/          # 實用工具函數
│   │   └── types/          # TypeScript類型定義
│   └── ...
├── server/                 # 後端Node.js/Express服務
│   ├── src/
│   │   ├── config/         # 配置文件
│   │   ├── controllers/    # 路由控制器
│   │   ├── middleware/     # 中間件
│   │   ├── models/         # 數據模型
│   │   ├── routes/         # API路由
│   │   ├── services/       # 業務邏輯服務
│   │   └── utils/          # 實用工具函數
│   └── ...
└── ...
```

## 關於TypeScript類型錯誤

在初始開發階段，您可能會看到一些TypeScript類型錯誤，主要是因為：

1. 缺少類型定義文件：安裝了相關的@types/*包後，這些錯誤會消失
2. 全局類型定義：我們在`src/types/globals.d.ts`中添加了臨時的全局類型定義
3. 環境配置：vite.config.ts和tsconfig.json已經配置為適應這些問題

這些類型錯誤不會影響實際的代碼運行，只是在開發過程中TypeScript的類型檢查功能受限。

## API文檔

API文檔可通過訪問 http://localhost:5000/api-docs 獲取 (開發模式下)。

## 數據庫架構

### MongoDB 集合

- interviews: 面試經驗
- companies: 公司資訊
- categories: 行業、職位和地區分類

### PostgreSQL 表

- users: 用戶帳戶和認證
- points_history: 積分交易歷史記錄

## 開發階段

1. 初始項目結構設置 ✅
2. 用戶認證系統 (進行中)
3. 內容管理系統
4. 積分系統
5. 搜索與過濾系統
6. 通知系統
7. 前端界面設計
8. 安全與性能優化

## 貢獻

歡迎提交問題和拉取請求！

## 許可證

MIT #   i n t e r v i e w - p l a t f o r m  
 