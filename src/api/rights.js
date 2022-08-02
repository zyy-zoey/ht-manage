import request from '@/utils/request'

/**
 * 获取所有权限列表
 * @returns  list 列表显示权限
 */
export const getRoleList = () => {
  return request({
    url: 'rights/list'
  })
}
