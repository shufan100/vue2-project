//控制文字显示个数，超出省略号
const wordlimit = (content, wordlength) => {
  if (content != undefined && content != "" && content != null) {
    var nowlength = content.length;
    var Regx = /.*[\u4e00-\u9fa5]+.*$/;
    var count = 0;
    var del = 0;
    for (var i = 0; i < nowlength; i++) {
      if (i < wordlength) {
        if (!Regx.test(content[i])) {
          count += 0.5;
        }
      } else if (i < wordlength + count) {
        if (Regx.test(content[i])) {
          del += 0.5;
        }
      }
    }
    wordlength = wordlength + count - del;

    if (nowlength > wordlength) {
      return content.substr(0, wordlength) + '…';

    } else {
      return content
    }
  } else {
    return ""
  }
}
export default wordlimit