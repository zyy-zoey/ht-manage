import { login } from '@/api/user'
import { getToken, setToken } from '@/utils/auth'
const state = {
  token: getToken()
}
const mutations = {
  setToken (state, payload) {
    state.token = payload
    setToken(payload)
  }
}
const actions = {
  async Token (context, data) {
    try {
      const res = await login(data)
      context.commit('setToken', res.data.data.token)
      console.log('111', res)
    } catch (err) {
      console.log(err)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
