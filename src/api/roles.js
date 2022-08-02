import request from '@/utils/request'

// 删除角色指定权限
export const delRoleRight = (role, rightId) => {
  return request({
    method: 'DELETE',
    url: `roles/${role.id}/rights/${rightId}`
  })
}

/**
 * 获取所有权限列表
 * @returns  tree 树状显示权限
 */
export const getRoleTree = () => {
  return request({
    url: 'rights/tree'
  })
}

// 角色授权
export const postRightRole = (roleId, rid) => {
  return request({
    method: 'POST',
    url: `roles/${roleId}/rights`,
    data: rid
  })
}
