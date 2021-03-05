// API request functions
import {
  getUsers,
  getUser,
} from '../../../api/github'

const github = {
  namespaced: true,

  state: {
    isLoading: false,
    users: [],
    user: {},
  },

  actions: {
    setLoading ({ commit }, data = true) {
      // Commit loading state in mutation
      commit('SET_LOADING', data)

      return Promise.resolve()
    },

    getUsers ({ commit }, data) {
      return (async (resolve, reject) => {
        try {
          const res = await getUsers(data)

          // Commit orders state in mutation
          commit('SET_USERS', res.data)

          resolve()
        } catch (error) {
          reject(error)
        }
      })();
    },

    getUser ({ commit }, data) {
      return (async (resolve, reject) => {
        try {
          // Retrieve order by ID
          const res = await getUser(data)

          // Commit order state in mutation
          commit('SET_USER', res.data)

          resolve()
        } catch (error) {
          reject(error)
        }
      })();
    },
  },

  mutations: {
    SET_LOADING: (state, data) => {
      state.isLoading = data
    },

    SET_USERS: (state, data) => {
      state.users = data
    },

    SET_USER: (state, data) => {
      state.user = data
    },
  },
}

export default github
