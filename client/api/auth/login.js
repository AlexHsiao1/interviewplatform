import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
  
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      return res.status(401).json({ error: error.message });
    }
    
    // 獲取用戶詳細信息
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('id', data.user.id)
      .single();
    
    if (userError) {
      return res.status(400).json({ error: userError.message });
    }
    
    return res.status(200).json({
      token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      user: {
        ...data.user,
        ...userData
      }
    });
  } catch (error) {
    return res.status(500).json({ error: '伺服器錯誤' });
  }
} 