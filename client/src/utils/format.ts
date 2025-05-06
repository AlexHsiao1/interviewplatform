/**
 * 格式化日期為本地格式
 * @param date 日期字符串或日期對象
 * @param options 格式化選項
 * @returns 格式化後的日期字符串
 */
export const formatDate = (
  date: string | Date, 
  options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('zh-TW', options).format(dateObj);
};

/**
 * 格式化金額為台幣格式
 * @param amount 金額
 * @returns 格式化後的金額字符串
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'TWD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * 截斷文本並加上省略號
 * @param text 要截斷的文本
 * @param length 最大長度
 * @returns 截斷後的文本
 */
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}; 