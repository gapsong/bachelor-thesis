import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    soUser: {},
    gitUser: {},
    toptags: [],
    repos: [],
    metric: {
      size: 0,
      issues: 0,
      comments: 0,
      tags: {},
      followers: 0,
      mergedCommits: 0,
      unmergedCommits: 0,
      splittedMetric:[0, 0, 0, 0, 0, 0, 0]
    }
  },
  getters,
  mutations,
  actions
})
