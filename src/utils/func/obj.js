/**
 * @author SHUF
 * @date 2023-04-04 10:46:59
 * @Description 对象相关
 */

/**
 * 比较两个对象是否相等
 * @param  {对象} objects
 */
export const isEqual = (...objects) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]))
console.log(isEqual({ name: 'jack' }, { name: 'jack1' }))
