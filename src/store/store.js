import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    registrations: [],
    users: [
      {id: 1, name: 'Max', registered: false},
      {id: 2, name: 'Peter', registered: false}
    ],
    soUser: {},
    gitUser: {},
    toptags: []
  },
  getters,
  mutations,
  actions
})
