import Mock from 'mockjs'
import listData from './model/listData'

// excel
Mock.mock(/\/excel\/list/, 'get', listData.excelList)

export default Mock
