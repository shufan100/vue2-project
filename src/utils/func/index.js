/**
 * @author SHUF
 * @date 2023-04-04 10:53:58
 * @Description 其他
 */

/**
 * @param {字体内容} content
 * @param {限制字体长度} wordlength
 * @returns 控制字体个数，超出省略号
 */
export const wordlimit = (content, wordlength) => {
  if (content !== undefined && content !== '' && content != null) {
    var nowlength = content.length
    var Regx = /.*[\u4e00-\u9fa5]+.*$/
    var count = 0
    var del = 0
    for (var i = 0; i < nowlength; i++) {
      if (i < wordlength) {
        if (!Regx.test(content[i])) {
          count += 0.5
        }
      } else if (i < wordlength + count) {
        if (Regx.test(content[i])) {
          del += 0.5
        }
      }
    }
    wordlength = wordlength + count - del

    if (nowlength > wordlength) {
      return content.substr(0, wordlength) + '…'
    } else {
      return content
    }
  } else {
    return ''
  }
}
