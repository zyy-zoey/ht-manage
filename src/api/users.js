import request from '@/utils/request'

/**
 * 获取 用户列表 的数据
 * @param {*}  * query查询参数  pagenum当前页码  pagesize每页显示条数
 * @returns
 */
export const getUsers = ({ query, pagenum, pagesize }) => {
  return request({
    url: 'users',
    params: {
      query, pagenum, pagesize
    }
  })
}

// 根据id删除角色
export const delRole = id => {
  return request({
    method: 'DELETE',
    url: `users/${id}`
  })
}

/**
 * 更改角色状态
 */
export const userState = (id, type) => {
  return request({
    method: 'PUT',
    url: `users/${id}/state/${type}`
  })
}

// 添加用户
export const addRole = ({ username, password, email, mobile }) => {
  return request({
    method: 'POST',
    url: 'users',
    data: { username, password, email, mobile }
  })
}

// 编辑用户
export const editRole = id => {
  return request({
    method: 'PUT',
    url: `users/${id}`
  })
}

// 获取角色列表信息
export const getRoleList = () => {
  return request({
    url: 'roles'
  })
}

// 分配用户角色
export const roolRole = (id, { rid }) => {
  return request({
    method: 'PUT',
    url: `users/${id}/role`,
    data: { rid }
  })
}
