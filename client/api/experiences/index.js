import { supabase } from '../../lib/supabase';
import { requireAuth } from '../middleware/auth';

export default async function handler(req, res) {
  // 獲取面試經驗列表
  if (req.method === 'GET') {
    try {
      // 解析查詢參數
      const { company, position, limit = 10, page = 1 } = req.query;
      
      let query = supabase
        .from('experiences')
        .select(`
          *,
          companies(id, name, logo),
          users!inner(id, username, avatar)
        `)
        .eq('is_approved', true) // 僅獲取已批准的
        .order('created_at', { ascending: false });
      
      // 過濾條件
      if (company) {
        query = query.eq('company_id', company);
      }
      
      if (position) {
        query = query.ilike('position', `%${position}%`);
      }
      
      // 分頁
      const from = (page - 1) * limit;
      const to = page * limit - 1;
      
      const { data, error, count } = await query
        .range(from, to)
        .limit(limit);
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      // 獲取總數以用於分頁
      const { count: totalCount } = await supabase
        .from('experiences')
        .select('*', { count: 'exact' })
        .eq('is_approved', true);
      
      return res.status(200).json({
        experiences: data,
        pagination: {
          total: totalCount,
          page,
          limit,
          pages: Math.ceil(totalCount / limit)
        }
      });
    } catch (error) {
      return res.status(500).json({ error: '伺服器錯誤' });
    }
  }
  
  // 創建新的面試經驗
  if (req.method === 'POST') {
    const authResult = await requireAuth(req, res);
    if (authResult) return res.status(authResult.status).json(authResult.body);
    
    const { company_id, position, salary, interview_date, content, is_anonymous } = req.body;
    
    if (!company_id || !position || !content) {
      return res.status(400).json({ error: '公司、職位和內容為必填項' });
    }
    
    try {
      // 插入新的面試經驗
      const { data, error } = await supabase
        .from('experiences')
        .insert([{
          user_id: req.user.id,
          company_id,
          position,
          salary: salary || null,
          interview_date,
          content,
          is_anonymous: is_anonymous || false,
          is_approved: false // 預設為未批准
        }])
        .select();
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      return res.status(201).json({
        message: '面試經驗已提交，等待審核',
        experience: data[0]
      });
    } catch (error) {
      return res.status(500).json({ error: '伺服器錯誤' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
} 