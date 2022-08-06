const OSS = require('ali-oss')
const axios = require('axios')

let OSSClient = null
let src = ''

export async function uploadOSS(file, name) {
  console.log(111111)
  if (!OSSClient) {
    await createOSS(true)
  }
  return commonUpload(file, name)
}

// 获取oss阿里云信息
async function genOssData() {
  const res = await axios.post('http://192.168.1.97:5008/Basic/Support/GenPostPolicy', {
    data: {
      module: 'CUMS',
      upfilePath: 'OA'
    },
    sign: 'B99DD86F2011A98622A37F472570B5C4',
    sysName: 'Front_CUMS',
    ts: '1647934436000',
    version: '1.0.0'
  })
  src = res.data.data.host
  return res.data.data
}

async function createOSS(isNew) {
  const credentials = await genOssData()
  console.log(credentials, '---')
  OSSClient = new OSS({
    region: 'oss-cn-shanghai',
    secure: true,
    accessKeyId: credentials.accessId,
    accessKeySecret: credentials.accessKeySecret,
    expiration: credentials.expiration,
    stsToken: credentials.securityToken
    // bucket: bucketName,
    // refreshSTSTokenInterval: 0.5 * 3600 * 1000,
    // refreshSTSToken: new Promise(resolve => {
    //   getSecurityToken().then(res => {
    //     resolve({
    //       accessKeyId: res.data.credentials.accessKeyId,
    //       accessKeySecret: res.data.credentials.accessKeySecret,
    //       stsToken: res.data.credentials.securityToken
    //     })
    //   })
    // })
  })
}

function commonUpload(file, name) {
  return new Promise((resolve, reject) => {
    let url = `/${name}/${formatTime(new Date()).substring(10, -1)}/${file.name.substring(file.name.lastIndexOf('.'))}`
    if (process.env.NODE_ENV === 'development') {
      url = '/test' + url
    }
    OSSClient.put(url, file)
      .then(() => {
        const data = {
          uid: file.uid,
          status: true,
          fileSrc: src + url,
          url: url,
          name: file.name,
          type: file.name.substring(file.name.lastIndexOf('.')),
          size: (file.size / 1024).toFixed(2)
        }
        resolve(data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 时间戳（13位）转 2021-08-08 08:08:08 格式
 * @param {Number} value 时间戳（13位）
 * @param {String} sp 时间拼接字符 cn 则为中文拼接
 * @returns {String}
 */
const formatTime = (value, sp = '-') => {
  if (!value || value <= 0) return '-'
  const { year, month, day, hour, minutes, seconds } = getTime(value)
  if (sp === 'cn') {
    return `${year}年${month}月${day}日 ${hour}:${minutes}:${seconds}`
  } else {
    return `${year}${sp}${month}${sp}${day} ${hour}:${minutes}:${seconds}`
  }
}
/**
 * 获取年月日时分秒
 * @param {Number} value
 * @returns {Object={year, month, day, hour, minutes, seconds}}
 */
function getTime(value) {
  const d = new Date(Number(value))
  const year = d.getFullYear()
  let month = d.getMonth() + 1
  let day = d.getDate()
  let hour = d.getHours()
  let minutes = d.getMinutes()
  let seconds = d.getSeconds()
  month < 10 ? (month = '0' + month) : month
  day < 10 ? (day = '0' + day) : day
  hour < 10 ? (hour = '0' + hour) : hour
  minutes < 10 ? (minutes = '0' + minutes) : minutes
  seconds < 10 ? (seconds = '0' + seconds) : seconds
  return { year, month, day, hour, minutes, seconds }
}
