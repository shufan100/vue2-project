/**
 * @author SHUF
 * @date 2023-04-04 10:55:18
 * @Description 文件相关
 */

// 1、文件大小转换
export const sizeformat = val => {
  if (val === 0) return '0B'
  const k = 1024
  const sizes = ['B', 'KB', 'M', 'G', 'T', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(val) / Math.log(k))
  return (val / Math.pow(k, i)).toPrecision(3) + sizes[i]
}

// 2、获取文件类型后族
export const suffix = str => str.substring(str.lastIndexOf('.'))
