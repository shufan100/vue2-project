// 文本粘贴
const copy = text => navigator.clipboard?.writeText && navigator.clipboard.writeText(text)
export default copy
