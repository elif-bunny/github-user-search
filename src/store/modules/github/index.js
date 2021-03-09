// API request functions
import {
  getUsers,
  getUser,
  getUsersLink,
} from '../../../api/github'

const github = {
  namespaced: true,

  state: {
    isLoading: false,
    users: [],
    filter: {
      q: '',
      page: 1,
      per_page: 20,
      total_count: 0,
    },
    lastUsersURL: undefined,
    user: {},
  },

  actions: {
    setLoading ({ commit }, data = true) {
      // Commit loading state in mutation
      return (async () => {
        // Commit orders state in mutation
        commit('SET_LOADING', data)
      })();
    },

    resetFilter ({ commit }) {
      return (async () => {
        // Commit orders state in mutation
        commit('RESET_FILTER')
      })();
    },

    setFilterOption ({ commit }, data) {
      return (async () => {
        // Commit orders state in mutation
        commit('SET_FILTER_OPTION', data)
      })();
    },

    getUsers ({ commit, getters }) {
      return (async () => {
        const res = await getUsers(getters.getFilterRequestBody)
        const url = getUsersLink(getters.getFilterRequestBody)

        // Commit orders state in mutation
        commit('SET_USERS', res.data)
        commit('SET_USERS_LINK', url)
      })();
    },

    getUser ({ commit }, data) {
      return (async () => {
        const res = await getUser(data)

        commit('SET_USER', res.data)
      })();
    },
  },

  mutations: {
    SET_LOADING: (state, data) => {
      state.isLoading = data
    },

    SET_USERS: (state, data) => {
      state.users = data.items
      state.filter.total_count = data.total_count
    },

    SET_USERS_LINK: (state, data) => {
      state.lastUsersURL = data
    },

    SET_USER: (state, data) => {
      state.user = data
      console.log(data)
    },

    SET_FILTER_OPTION: (state, data) => {
      state.filter[data.option] = data.value
    },

    RESET_FILTER: (state) => {
      state.filter = {
        page: 1,
        per_page: 20,
        total_count: 0,
        q: state.filter.q
      }
      state.lastUsersURL = undefined
    },
  },

  getters: {
    getFilterRequestBody: (state) => {
      const { ...filter } = Object.keys(state.filter)
      .filter(key => key != 'total_count')
      .reduce((obj, key) => {
        obj[key] = state.filter[key];
        return obj;
      }, {});

      return {
        ...filter,
      }
    }
  },
}

export default github
