/**
 * @author SHUF
 * @date 2023-04-12 14:08:01
 * @Description 防止element-ui message重复弹框
 */
import { Message } from 'element-ui' // 引入message

let messageInstance = null
const resetMessage = options => {
  if (messageInstance) {
    messageInstance.close() // 关闭
  }
  messageInstance = Message(options)
}
;['error', 'success', 'info', 'warning'].forEach(type => {
  resetMessage[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options
      }
    }
    options.type = type
    return resetMessage(options)
  }
})
export const message = resetMessage
