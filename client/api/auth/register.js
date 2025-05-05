import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password, username } = req.body;
  
  if (!email || !password || !username) {
    return res.status(400).json({ error: 'Email, password and username are required' });
  }
  
  try {
    // 創建用戶認證
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (authError) {
      return res.status(400).json({ error: authError.message });
    }
    
    // 創建用戶個人資料
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .insert([{ 
        id: authData.user.id,
        email, 
        username,
        points: 50 // 初始積分
      }]);
    
    if (profileError) {
      return res.status(400).json({ error: profileError.message });
    }
    
    // 記錄初始積分
    await supabase.from('point_histories').insert([{
      user_id: authData.user.id,
      amount: 50,
      reason: '註冊獎勵'
    }]);
    
    return res.status(201).json({ 
      message: '註冊成功，請查收驗證郵件',
      user: authData.user 
    });
  } catch (error) {
    return res.status(500).json({ error: '伺服器錯誤' });
  }
} 