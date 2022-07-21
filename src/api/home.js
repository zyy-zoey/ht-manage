import request from '@/utils/request'

/**
 * 获取左侧菜单数据
 * @returns
 */
export const getMenus = () => {
  return request({
    url: 'menus'
  })
}
