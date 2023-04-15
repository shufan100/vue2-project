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

/**
 *
 * @param {时间戳} str
 * @return 时间戳转日期（今天显示时分秒，>24 <48显示昨天，>48显示日期）
 */
export const format = str => {
  const time = str * 1000 // 传入的是秒，要转成毫秒
  const nowDate = new Date()
  const point = new Date(new Date().setHours(0, 0, 0, 0)).getTime() // 今天
  const lastPoint = new Date(new Date().setHours(0, 0, 0, 0) - 86400000).getTime() // 昨天
  console.log(point, lastPoint, time)

  if (parseTime(nowDate, '{y}-{m}-{d}') === parseTime(time, '{y}-{m}-{d}')) {
    return parseTime(time, '{h}:{i}:{s}')
  } else if (time < point && time > lastPoint) {
    return '昨天'
  } else {
    return parseTime(time, '{y}-{m}-{d}')
  }
}
export const parseTime = (time, cFormat) => {
  if (arguments.length === 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  // debugger
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string') {
      if (/^[0-9]+$/.test(time)) {
        time = parseInt(time)
      } else {
        time = time.replace(new RegExp(/-/gm), '/')
      }
    }

    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const timeStr = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
  return timeStr
}

/**
 *
 * @param {时间戳} time
 * @returns 时间戳转日期
 */
export const formatData = time => {
  const now = new Date(time * 1000)
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const date = String(now.getDate()).padStart(2, '0')
  const hh = String(now.getHours()).padStart(2, '0')
  const mm = String(now.getMinutes()).padStart(2, '0')
  const ss = String(now.getSeconds()).padStart(2, '0')
  return `${year}/${month}/${date} ${hh}:${mm}:${ss}`
}
