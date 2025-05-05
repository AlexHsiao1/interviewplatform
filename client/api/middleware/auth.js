import { supabase } from '../../lib/supabase';

export const requireAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { status: 401, body: { error: 'Unauthorized' } };
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    const { data, error } = await supabase.auth.getUser(token);
    
    if (error || !data.user) {
      return { status: 401, body: { error: 'Invalid token' } };
    }
    
    // 將用戶信息添加到請求中
    req.user = data.user;
    
    if (next) return next();
    return null;
  } catch (error) {
    return { status: 500, body: { error: 'Internal server error' } };
  }
}; 