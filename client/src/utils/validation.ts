/**
 * 檢查是否為空值
 * @param value 要檢查的值
 * @returns 是否為空值
 */
export const isEmpty = (value: any): boolean => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};

/**
 * 驗證電子郵件格式
 * @param email 電子郵件
 * @returns 是否有效
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * 驗證密碼強度
 * @param password 密碼
 * @returns 包含驗證結果和提示信息的對象
 */
export const validatePassword = (password: string): { isValid: boolean; message?: string } => {
  if (password.length < 8) {
    return { isValid: false, message: '密碼長度至少8個字符' };
  }
  
  // 檢查密碼是否包含至少一個數字
  const hasNumber = /\d/.test(password);
  if (!hasNumber) {
    return { isValid: false, message: '密碼必須包含至少一個數字' };
  }
  
  // 檢查密碼是否包含至少一個字母
  const hasLetter = /[a-zA-Z]/.test(password);
  if (!hasLetter) {
    return { isValid: false, message: '密碼必須包含至少一個字母' };
  }
  
  return { isValid: true };
};

/**
 * 驗證台灣手機號碼
 * @param phoneNumber 手機號碼
 * @returns 是否有效
 */
export const isValidTaiwanPhone = (phoneNumber: string): boolean => {
  // 台灣手機號碼格式：09xxxxxxxx
  const phoneRegex = /^09\d{8}$/;
  return phoneRegex.test(phoneNumber);
}; 