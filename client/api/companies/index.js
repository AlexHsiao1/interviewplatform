import { supabase } from '../../lib/supabase';
import { requireAuth } from '../middleware/auth';

export default async function handler(req, res) {
  // 獲取公司列表
  if (req.method === 'GET') {
    try {
      // 解析查詢參數
      const { search, limit = 20, page = 1 } = req.query;
      
      let query = supabase
        .from('companies')
        .select('*', { count: 'exact' });
      
      // 搜索條件
      if (search) {
        query = query.ilike('name', `%${search}%`);
      }
      
      // 分頁
      const from = (page - 1) * limit;
      const to = page * limit - 1;
      
      const { data, error, count } = await query
        .range(from, to)
        .order('name');
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      return res.status(200).json({
        companies: data,
        pagination: {
          total: count,
          page,
          limit,
          pages: Math.ceil(count / limit)
        }
      });
    } catch (error) {
      return res.status(500).json({ error: '伺服器錯誤' });
    }
  }
  
  // 創建新公司
  if (req.method === 'POST') {
    const authResult = await requireAuth(req, res);
    if (authResult) return res.status(authResult.status).json(authResult.body);
    
    const { name, logo, website, industry } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: '公司名稱是必需的' });
    }
    
    try {
      // 檢查公司是否已存在
      const { data: existingData } = await supabase
        .from('companies')
        .select('id')
        .ilike('name', name)
        .limit(1);
      
      if (existingData && existingData.length > 0) {
        return res.status(400).json({ 
          error: '公司已存在',
          company: existingData[0]
        });
      }
      
      // 創建新公司
      const { data, error } = await supabase
        .from('companies')
        .insert([{
          name,
          logo: logo || null,
          website: website || null,
          industry: industry || null,
          created_by: req.user.id
        }])
        .select();
      
      if (error) {
        return res.status(400).json({ error: error.message });
      }
      
      return res.status(201).json(data[0]);
    } catch (error) {
      return res.status(500).json({ error: '伺服器錯誤' });
    }
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
} 