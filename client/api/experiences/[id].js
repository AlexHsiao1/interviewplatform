import { supabase } from '../../lib/supabase';
import { requireAuth } from '../middleware/auth';

export default async function handler(req, res) {
  const { id } = req.query;
  
  if (!id) {
    return res.status(400).json({ error: '面試經驗ID是必需的' });
  }
  
  // 獲取單個面試經驗
  if (req.method === 'GET') {
    // 檢查用戶是否已登錄及其積分是否足夠
    let userId = null;
    let userPoints = 0;
    
    // 如果有授權頭，提取用戶信息
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const { data } = await supabase.auth.getUser(token);
      
      if (data.user) {
        userId = data.user.id;
        
        // 獲取用戶積分
        const { data: userData } = await supabase
          .from('users')
          .select('points')
          .eq('id', userId)
          .single();
        
        if (userData) {
          userPoints = userData.points;
        }
      }
    }
    
    try {
      // 獲取面試經驗
      const { data, error } = await supabase
        .from('experiences')
        .select(`
          *,
          companies(id, name, logo, website),
          users(id, username, avatar)
        `)
        .eq('id', id)
        .single();
      
      if (error) {
        return res.status(404).json({ error: '面試經驗不存在' });
      }
      
      // 檢查是否已批准或用戶是否為作者
      if (!data.is_approved && (!userId || data.user_id !== userId)) {
        return res.status(403).json({ error: '此面試經驗尚未獲得批准' });
      }
      
      // 對於非作者，檢查是否需要消耗積分
      const needPoints = !userId || (data.user_id !== userId && !data.is_free);
      
      // 如果需要積分且用戶沒有足夠的積分，則返回部分內容作為預覽
      if (needPoints && userPoints < 5) {
        // 截斷內容為摘要
        const contentPreview = data.content.slice(0, 200) + '...';
        
        return res.status(200).json({
          ...data,
          content: contentPreview,
          is_preview: true,
          required_points: 5,
          message: '需要5積分才能查看完整內容'
        });
      }
      
      // 如果用戶已登錄，未來可以記錄查看歷史
      
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: '伺服器錯誤' });
    }
  }
  
  // 使用積分解鎖內容
  if (req.method === 'POST' && req.body.action === 'unlock') {
    const authResult = await requireAuth(req, res);
    if (authResult) return res.status(authResult.status).json(authResult.body);
    
    try {
      // 檢查用戶點數
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('points')
        .eq('id', req.user.id)
        .single();
      
      if (userError || !userData) {
        return res.status(400).json({ error: '無法檢索用戶信息' });
      }
      
      if (userData.points < 5) {
        return res.status(403).json({ error: '積分不足' });
      }
      
      // 獲取面試經驗
      const { data: expData, error: expError } = await supabase
        .from('experiences')
        .select('user_id, is_free')
        .eq('id', id)
        .single();
      
      if (expError || !expData) {
        return res.status(404).json({ error: '面試經驗不存在' });
      }
      
      // 如果用戶是作者或內容是免費的，無需扣除積分
      if (expData.user_id === req.user.id || expData.is_free) {
        return res.status(200).json({ message: '無需積分即可訪問此內容' });
      }
      
      // 扣除用戶積分
      const { error: updateError } = await supabase
        .from('users')
        .update({ points: userData.points - 5 })
        .eq('id', req.user.id);
      
      if (updateError) {
        return res.status(400).json({ error: '無法扣除積分' });
      }
      
      // 記錄積分歷史
      await supabase.from('point_histories').insert([{
        user_id: req.user.id,
        amount: -5,
        reason: `解鎖面試經驗 #${id}`,
        experience_id: id
      }]);
      
      // 將部分積分獎勵給內容創建者
      const { error: creatorError } = await supabase.rpc('reward_experience_creator', { 
        exp_id: id, 
        points_amount: 3 
      });
      
      if (creatorError) {
        console.error('獎勵創建者失敗:', creatorError);
      }
      
      return res.status(200).json({
        message: '已成功解鎖內容',
        remaining_points: userData.points - 5
      });
    } catch (error) {
      return res.status(500).json({ error: '伺服器錯誤' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
} 