/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
export const getStore = name => {
  if (!name) return
  var value = window.localStorage.getItem(name)
  if (value !== null) {
    try {
      value = JSON.parse(value)
    } catch (e) {
      // value = value
    }
  }
  return value
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * 判断空值
 */
export const isEmpty = keys => {
  if (typeof keys === 'string') {
    keys = keys.replace(/\"|&nbsp;|\\/g, '').replace(/(^\s*)|(\s*$)/g, '')
    if (keys == '' || keys == null || keys == 'null' || keys === 'undefined') {
      return true
    } else {
      return false
    }
  } else if (typeof keys === 'undefined') {
    // 未定义
    return true
  } else if (typeof keys === 'number') {
    return false
  } else if (typeof keys === 'boolean') {
    return false
  } else if (typeof keys === 'object') {
    if (JSON.stringify(keys) == '{}') {
      return true
    } else if (keys == null) {
      // null
      return true
    } else {
      return false
    }
  }

  if (keys instanceof Array && keys.length == 0) {
    // 数组
    return true
  }
}

export const showMessage = () => {
  this.$message({
    showClose: true,
    message: '对不起，您暂无此操作权限~',
    type: 'success'
  })
}

/**
 * 读取base64
 */
export const readFile = file => {
  console.log(file)
  // var file = this.files[0];
  // 判断是否是图片类型
  if (!/image\/\w+/.test(file.raw.type)) {
    alert('只能选择图片')
    return false
  }
  var reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function (e) {
    // var filedata = {
    //   filename: file.name,
    //   filebase64: e.target.result
    // }
    alert(e.target.result)
  }
}

/**
 * 动态插入css
 */
export const loadStyle = url => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}
/**
 * 设置浏览器头部标题
 */
export const setTitle = title => {
  title = title ? `${title}` : '小爱Admin'
  window.document.title = title
}

export const param2Obj = url => {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

export const setContentHeight = (that, ele, height) => {
  that.$nextTick(() => {
    ele.style.height = document.body.clientHeight - height + 'px'
  })
}
