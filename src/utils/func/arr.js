/**
 * @author SHUF
 * @date 2023-04-04 10:46:45
 * @Description 数组相关
 */

/**
 * 生成数组
 * @param {生成数组个数} num
 */
export const createArr = num => new Array(num).fill(0).map((v, i) => i)

/**
 * 去重1
 * @param {数组} arr
 * @param {根据去重的字段} param
 */
export const unique = (arr, param = 'id') => {
  const res = new Map()
  return arr.filter(i => !res.has(i[param]) && res.set(i[param], 1))
}
/**
 * 去重2
 * @param {数组} arr
 * @param {根据去重的字段} param
 */
export const unique2 = (arr, param = 'id') => [...arr.reduce((prev, cur) => prev.set(cur[param], cur), new Map()).values()]

/**
 * 多数组取交集
 * @param {第一个数组} a
 * @param  {...any其它数组} arr
 */
export const intersection = (a, ...arr) => [...new Set(a)].filter(v => arr.every(b => b.includes(v)))
// console.log(intersection([1, 2, 3, 4], [2, 3, 4, 7, 8], [1, 3, 4, 9]))

// 查找最大值索引
export const indexOfMax = arr => arr.reduce((prev, curr, i, a) => (curr > a[prev] ? i : prev), 0)
// 查找最小值索引
export const indexOfMin = arr => arr.reduce((prev, curr, i, a) => (curr < a[prev] ? i : prev), 0)
