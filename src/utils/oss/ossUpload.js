const axios = require('axios')

let policyData = null

export async function uploadOSS(file) {
  if (!policyData) {
    await genOssData()
  }
  return gtOSSurl(file)
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
  policyData = res.data.data
}

function gtOSSurl(file) {
  return new Promise((resolve, reject) => {
    const nfile = file
    nfile.timestamp = new Date().getTime().toString() + Math.floor(Math.random() * 100000) // 给图片添加一个时间戳
    const formData = new FormData() // 注意formData里append添加的键的大小写
    formData.append('key', calculateObjectName(nfile)) // 存储在oss的文件路径
    formData.append('OSSAccessKeyId', policyData.accessId) // accessKeyId
    formData.append('policy', policyData.policy) // policy
    formData.append('Signature', policyData.signAture) // 签名
    // // 如果是base64文件，那么直接把base64字符串转成blob对象进行上传就可以了
    formData.append('file', nfile)
    formData.append('success_action_status', 200) // 成功后返回的操作码

    axios.post(policyData.host, formData).then(
      res => {
        if (res.status === 200) {
          // 不裁剪，原图和裁剪图一样
          const data = {
            url: 'http://tu.chdesign.cn/' + calculateObjectName(nfile) // 原图
          }
          resolve(data)
        }
      },
      err => {
        reject(err)
      }
    )
  })
}

//
function calculateObjectName(thefile) {
  const suffix = getSuffix(thefile.type, thefile.name)
  const name = policyData.dir + thefile.timestamp + '.' + suffix
  return name
}
function getSuffix(type, name) {
  const pos = type.lastIndexOf('/')
  let suffix = ''
  if (pos !== -1) {
    suffix = type.substring(pos + 1)
  }
  if (!type) {
    suffix = name.split('.')[1]
  }
  return suffix
}
