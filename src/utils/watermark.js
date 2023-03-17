/*
 * @Author: shufan100 1549248097@qq.com
 * @Date: 2022-10-23 14:45:51
 * @LastEditors: shufan100 1549248097@qq.com
 * @LastEditTime: 2023-03-17 17:08:05
 * @FilePath: \vue2-project\src\utils\watermark.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
let watermark = {}

let setWatermark = str => {
  let id = '1.23452384164.123412416'

  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id))
  }

  //创建一个画布
  let can = document.createElement('canvas')
  //设置画布的长宽
  can.width = 120
  can.height = 120

  let cans = can.getContext('2d')
  //旋转角度
  cans.rotate((-15 * Math.PI) / 180)
  cans.font = '18px Vedana'
  //设置填充绘画的颜色、渐变或者模式
  cans.fillStyle = 'rgba(200, 200, 200, 0.20)'
  //设置文本内容的当前对齐方式
  cans.textAlign = 'left'
  //设置在绘制文本时使用的当前文本基线
  cans.textBaseline = 'Middle'
  //在画布上绘制填色的文本（输出的文本，开始绘制文本的X坐标位置，开始绘制文本的Y坐标位置）
  cans.fillText(str, can.width / 8, can.height / 2)

  let div = document.createElement('div')
  div.id = id
  // div.style.zIndex = '100000';
  div.style.pointerEvents = 'none'
  div.style.bottom = '0px'
  div.style.right = '15px'
  div.style.position = 'fixed'

  if (document.getElementById('contentId')) {
    div.style.width = document.getElementById('contentId').clientWidth + 'px'
    div.style.height = document.getElementById('contentId').clientHeight + 'px'
    div.style.background = 'url(' + can.toDataURL('image/png') + ') left top repeat'
    document.getElementById('contentId').appendChild(div)
  }
  return id
}

// 该方法只允许调用一次
watermark.set = str => {
  let id = setWatermark(str)
  setInterval(() => {
    if (document.getElementById(id) === null) {
      id = setWatermark(str)
    }
  }, 500)
  window.onresize = () => {
    setWatermark(str)
  }
}

export default watermark
