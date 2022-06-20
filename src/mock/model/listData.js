import Mock from 'mockjs'
const list = []
const count = 20

for (let i = 0; i < count; i++) {
  list.push(
    Mock.mock({
      id: '@increment',
      title: '@ctitle(5, 10)',
      author: '@cname',
      readings: '@integer(300, 5000)',
      date: '@datetime',
      // date: '@date',
      username: '@last',
      name: '@cname',
      password: '@password',
      'type|1': ['CN', 'US', 'JP', 'EU'],
      grade: ['CN', 'US', 'JP', 'EU'],
      'open|0-1': 0,
      'sex|0-1': 0,
      number: '@integer(1,100)',
      price: '@integer(1,1000)',
      weight: '@integer(1,10)',
      orderCode: 'zgy' + '@integer(1,1000000000000)',
      url: '@url',
      datetime: '@datetime',
      time: '@datetime(hh:mm:ss)',
      // address: '@province @city @county',
      address: '@city(true)',
      adit: '@cword(2,8)',
      phone: '13520073575'
    })
  )
}
export default {
  excelList: () => ({
    code: 20000,
    data: list
  })
}
