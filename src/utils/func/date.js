/**
 * @author SHUF
 * @date 2023-04-04 10:43:57
 * @Description 日期
 */

/**
 * 判断日期是否为今天
 * @param {new Date('2023-06-15')} date
 */
export const isToday = date => date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10)

/**
 * 将日期转换为为 YYYY-MM-DD 格式
 * @param {new Date()} date
 * @returns 2023-06-14T01:31:10.716Z
 */
export const formatYmd = date => date.toISOString().slice(0, 10)

/**
 * 将秒数转换为 hh:mm:ss 格式
 * @param {秒} s
 */
export const formatSeconds = s => new Date(s * 1000).toISOString().substr(11, 8)

/**
 * 获取某年某月的最后一天
 * @param {new Date('2022-11-2')} d
 */
export const getLastDate = (d = new Date()) => new Date(d.getFullYear(), d.getMonth() + 1, 0)

/**
 * 获取某年月份天数
 * @param {年} year
 * @param {月} month
 * @returns
 */
export const getDaysNum = (year, month) => new Date(year, month, 0).getDate()

/**
 * 时间戳转日期
 * @param {时间戳} time
 */
export const formatData = time => {
  const now = new Date(time * 1000)
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const date = String(now.getDate()).padStart(2, '0')
  const hh = String(now.getHours()).padStart(2, '0')
  const mm = String(now.getMinutes()).padStart(2, '0')
  const ss = String(now.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${date} ${hh}:${mm}:${ss}`
}

/**
 * 获取两个日期所有日期
 * @param {开始日期} stime
 * @param {结束日期} etime
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
