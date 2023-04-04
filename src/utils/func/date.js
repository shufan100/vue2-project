/**
 * @author SHUF
 * @date 2023-04-04 10:43:57
 * @Description 日期转换相关
 */

/**
 * @param {date} 标准时间格式:Fri Nov 17 2017 09:26:23 GMT+0800 (中国标准时间)
 * @param {type} 类型
 *   type == 1 ---> "yyyy-mm-dd hh:MM:ss.fff"
 *   type == 2 ---> "yyyymmddhhMMss"
 *   type == '' ---> "yyyy-mm-dd hh:MM:ss"
 */
export const formatDate = (date, type) => {
  const year = date.getFullYear() // 年
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1 // 月
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() // 日
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() // 时
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() // 分
  const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() // 秒
  const milliseconds = date.getMilliseconds() < 10 ? '0' + date.getMilliseconds() : date.getMilliseconds() // 毫秒
  if (type === 1) {
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds + '.' + milliseconds
  } else if (type === 2) {
    return year + '' + month + '' + day + '' + hour + '' + minutes + '' + seconds
  } else if (type === 3) {
    return year + '-' + month + '-' + day
  } else {
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds
  }
}

/**
 * 时间转换：20150101010101 --> '2015-01-01 01:01:01'
 */
export const parseToDate = timeValue => {
  let result = ''
  const year = timeValue.substr(0, 4)
  const month = timeValue.substr(4, 2)
  const date = timeValue.substr(6, 2)
  const hour = timeValue.substr(8, 2)
  const minute = timeValue.substr(10, 2)
  const second = timeValue.substr(12, 2)
  result = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
  return result
}

/**
 *
 * @param {开始日期} stime
 * @param {结束日期} etime
 * @returns 获取日期段所有日期
 */
export const getdiffdate = (stime, etime) => {
  let diffdate = []
  let i = 0
  // 开始日期小于等于结束日期,并循环
  while (stime <= etime) {
    diffdate[i] = stime

    // 获取开始日期时间戳
    const stimets = new Date(stime).getTime()
    // console.log('当前日期：' + stime + '当前时间戳：' + stimets)

    // 增加一天时间戳后的日期
    const nextDate = stimets + 24 * 60 * 60 * 1000

    // 拼接年月日，这里的月份会返回（0-11），所以要+1
    const y = new Date(nextDate).getFullYear() + '-'
    const m = new Date(nextDate).getMonth() + 1 < 10 ? '0' + (new Date(nextDate).getMonth() + 1) + '-' : new Date(nextDate).getMonth() + 1 + '-'
    const d = new Date(nextDate).getDate() < 10 ? '0' + new Date(nextDate).getDate() : new Date(nextDate).getDate()

    stime = y + m + d

    // 增加数组key
    i++
  }
  if (diffdate.length === 0) {
    diffdate = [etime]
  }
  return diffdate
}
