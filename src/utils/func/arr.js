/**
 * @author SHUF
 * @date 2023-04-04 10:46:45
 * @Description 数组相关
 */

// 去重

export const unique = (arr, param = 'id') => {
  const res = new Map()
  return arr.filter(i => !res.has(i[param]) && res.set(i[param], 1))
}
