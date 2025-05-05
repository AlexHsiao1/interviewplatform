import { requireAuth } from '../middleware/auth';
import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  const authResult = await requireAuth(req, res);
  if (authResult) return res.status(authResult.status).json(authResult.body);
  
  if (req.method === 'GET') {
    try {
      // 獲取用戶詳細信息
      const { data, error } = await supabase
        .from('users')
        .select(`
          *,
          experiences(count),
          point_histories(id, amount, reason, created_at)
        `)
        .eq('id', req.user.id)
        .single();
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      // 獲取最近解鎖的經驗
      const { data: recentlyViewed } = await supabase
        .from('point_histories')
        .select(`
          id,
          created_at,
          reason,
          experiences:experience_id(id, position, company_id, companies:company_id(name))
        `)
        .eq('user_id', req.user.id)
        .order('created_at', { ascending: false })
        .not('experience_id', 'is', null)
        .limit(5);
      
      return res.status(200).json({
        ...data,
        recently_viewed: recentlyViewed || []
      });
    } catch (error) {
      return res.status(500).json({ error: '伺服器錯誤' });
    }
  }
  
  // 更新用戶資料
  if (req.method === 'PATCH') {
    const { username, avatar } = req.body;
    
    try {
      const updates = {};
      if (username) updates.username = username;
      if (avatar) updates.avatar = avatar;
      
      const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', req.user.id)
        .select();
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      return res.status(200).json(data[0]);
    } catch (error) {
      return res.status(500).json({ error: '伺服器錯誤' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
} 