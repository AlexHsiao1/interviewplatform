-- Create tables
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  username TEXT NOT NULL,
  avatar TEXT,
  points INTEGER NOT NULL DEFAULT 50,
  is_admin BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  logo TEXT,
  website TEXT,
  industry TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  position TEXT NOT NULL,
  salary INTEGER,
  interview_date DATE,
  content TEXT NOT NULL,
  is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
  is_approved BOOLEAN NOT NULL DEFAULT FALSE,
  is_free BOOLEAN NOT NULL DEFAULT FALSE,
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS point_histories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL,
  reason TEXT NOT NULL,
  experience_id UUID REFERENCES experiences(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create functions
CREATE OR REPLACE FUNCTION reward_experience_creator(exp_id UUID, points_amount INTEGER)
RETURNS VOID AS $$
DECLARE
  creator_id UUID;
BEGIN
  -- 獲取經驗創建者的ID
  SELECT user_id INTO creator_id FROM experiences WHERE id = exp_id;
  
  IF creator_id IS NOT NULL THEN
    -- 更新創建者的積分
    UPDATE users SET points = points + points_amount WHERE id = creator_id;
    
    -- 記錄積分歷史
    INSERT INTO point_histories (user_id, amount, reason, experience_id)
    VALUES (creator_id, points_amount, '內容被閱讀獎勵', exp_id);
  END IF;
END;
$$ LANGUAGE plpgsql;

-- 創建觸發器函數
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 添加更新時間自動更新的觸發器
CREATE TRIGGER update_users_modtime
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_companies_modtime
  BEFORE UPDATE ON companies
  FOR EACH ROW
  EXECUTE PROCEDURE update_modified_column();

CREATE TRIGGER update_experiences_modtime
  BEFORE UPDATE ON experiences
  FOR EACH ROW
  EXECUTE PROCEDURE update_modified_column();

-- 創建RLS策略
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE point_histories ENABLE ROW LEVEL SECURITY;

-- 用戶表策略
CREATE POLICY "用戶可以讀取所有用戶資料"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "用戶只能更新自己的資料"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- 公司表策略
CREATE POLICY "所有人都可以讀取公司資料"
  ON companies FOR SELECT
  USING (true);

CREATE POLICY "登入用戶可以創建公司"
  ON companies FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- 經驗表策略
CREATE POLICY "已批准或自己的經驗可見"
  ON experiences FOR SELECT
  USING (is_approved = true OR auth.uid() = user_id);

CREATE POLICY "登入用戶可以創建經驗"
  ON experiences FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "用戶只能更新自己的經驗"
  ON experiences FOR UPDATE
  USING (auth.uid() = user_id);

-- 積分歷史策略
CREATE POLICY "用戶只能查看自己的積分歷史"
  ON point_histories FOR SELECT
  USING (auth.uid() = user_id);

-- 索引
CREATE INDEX IF NOT EXISTS experiences_company_id_idx ON experiences(company_id);
CREATE INDEX IF NOT EXISTS experiences_user_id_idx ON experiences(user_id);
CREATE INDEX IF NOT EXISTS point_histories_user_id_idx ON point_histories(user_id);
CREATE INDEX IF NOT EXISTS users_username_idx ON users(username); 