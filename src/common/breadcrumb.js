/**
 * 选择菜单修改面包屑
 * @param {*} type  菜单index
 */
class breadcrumbClass {
  static breadcrumb(type) {
    let test = ''
    switch (type) {
      case 'facilities':
        test = '设施台账编辑'
        break
      case 'profile':
        test = '剖面图'
        break
      case 'patrolTemplate':
        test = '巡视计划模板'
        break
      case 'cableStatistical':
        test = '电缆统计'
        break
      case 'mobilePatrol':
        test = '移动巡视管理'
        break
    }
    return test
  }
}
export default breadcrumbClass
