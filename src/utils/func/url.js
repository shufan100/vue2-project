/**
 * @author SHUF
 * @date 2023-04-04 10:43:11
 * @Description url相关
 */

// 获取地址栏参数
export const getSearchParams = param => {
  const searchParams = new URLSearchParams(window.location.search)
  // searchParams.get('code')
  return searchParams.get(param)
}
