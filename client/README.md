# 面試資訊分享平台 - 客戶端

這是面試資訊分享平台的前端部分，基於React、TypeScript和Tailwind CSS，針對Vercel部署進行了優化。

## 環境設置

### 本地開發

1. 安裝依賴項:
   ```bash
   npm install
   ```

2. 創建`.env.local`文件並添加以下變量:
   ```
   # Supabase環境變量
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url-here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
   ```

3. 啟動開發服務器:
   ```bash
   npm run start
   ```

## Vercel 部署步驟

1. 在Vercel上創建新項目
2. 連接GitHub倉庫
3. 設置環境變量:
   - `NEXT_PUBLIC_SUPABASE_URL`: 從Supabase項目設置中獲取
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: 從Supabase項目設置中獲取
4. 在部署設置中選擇框架預設為"Other"
5. 點擊"Deploy"

## Supabase 設置

1. 在Supabase創建新項目
2. 使用`/supabase/schema.sql`中的SQL設置數據庫表和策略
3. 在Supabase控制面板的"Authentication"部分設置電子郵件登入
4. 複製項目的URL和匿名密鑰到Vercel環境變量

## API Routes

所有API端點都通過Vercel Serverless Functions提供:

- `/api/auth/*` - 認證相關端點
- `/api/users/*` - 用戶管理端點
- `/api/experiences/*` - 面試經驗管理
- `/api/companies/*` - 公司數據管理
- `/api/points/*` - 積分系統相關端點

## 技術堆疊

- **框架**: React與Vite
- **API管理**: Vercel Serverless Functions
- **數據庫**: Supabase (PostgreSQL)
- **認證**: Supabase Auth
- **部署**: Vercel

## 注意事項

- 此設置針對小型到中型規模的部署進行了優化，成本效益高
- 使用Supabase的免費計劃足以應對初期流量
- 隨著用戶群增長，可考慮遷移到更強大的服務器設置
- 請確保數據庫設置了正確的行級安全策略(RLS)，以保護用戶數據 