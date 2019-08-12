import {
  showUser,
  Identity,
  Apiport,
  IdentityApi,
  Viewport,
  Identityview
} from '../../services/index';

const userShow = {
  namespaced: true,
  state: {
    showUser: [],
    Identity: [],
    Apiport: [],
    IdentityApi: [],
    Viewport: [],
    Identityview: []
  },
  getters: {
    getshowUser(state) {
      return state.showUser
    },
    getIdentity(state) {
      return state.Identity
    },
    getApiport(state) {
      return state.Apiport
    },
    getIdentityApi(state) {
      return state.IdentityApi
    },
    getViewport(state) {
      return state.Viewport
    },
    getIdentityview(state) {
      return state.Identityview
    }
  },
  mutations: {
    mutationsShowUser(state, data) {
      state.showUser = data
    },
    mutationsIdentity(state, data) {
      state.Identity = data
    },
    mutationsApiport(state, data) {
      state.Apiport = data
    },
    mutationsIdentityApi(state, data) {
      state.IdentityApi = data
    },
    mutationsViewporti(state, data) {
      state.Viewport = data
    },
    mutationsIdentityview(state, data) {
      state.Identityview = data
    }
  },
  actions: {
    async axiosUserShow({ commit }) {
      const result = await showUser()
      commit('mutationsShowUser', result.data.data)
    },
    async axiosIdentity({
      commit
    }) {
      const result = await Identity()
      commit('mutationsIdentity', result.data.data)
    },
    async axiosApiport({
      commit
    }) {
      const result = await Apiport()
      commit('mutationsApiport', result.data.data)
    },
    async axiosIdentityApi({
      commit
    }) {
      const result = await IdentityApi()
      commit('mutationsIdentityApi', result.data.data)
    },
    async axiosViewport({
      commit
    }) {
      const result = await Viewport()
      commit('mutationsViewporti', result.data.data)
    },
    async axiosIdentityview({
      commit
    }) {
      const result = await Identityview()
      commit('mutationsIdentityview', result.data.data)
    }
  }
}

export default userShow