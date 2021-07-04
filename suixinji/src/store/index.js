import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = () => ({
  tags: JSON.parse(window.localStorage.getItem('tags')) || ['默认', '衣', '食', '住', '行'],
  tallyData: JSON.parse(window.localStorage.getItem('tallyData')) || [],
  address: JSON.parse(window.localStorage.getItem('address')) || '北京',
  cities: ['武汉', '北京', '上海', '广州', '深圳', '杭州', '成都', '南京']
})

const getters = {
  getTags: state => {
    return state.tags
  },
  getTallyData: state => {
    return state.tallyData
  },
  getAddress: state => {
    return state.address
  }
}

const mutations = {
  setTags: (state, tags) => {
    state.tags = tags
    window.localStorage.setItem('tags', JSON.stringify(state.tags))
  },
  setTallyData: (state, data) => {
    state.tallyData = [data, ...state.tallyData]
    window.localStorage.setItem('tallyData', JSON.stringify(state.tallyData))
  },
  removeTallyData: (state, data) => {
    state.tallyData = state.tallyData.filter(item => item !== data)
    window.localStorage.setItem('tallyData', JSON.stringify(state.tallyData))
  },
  setAddress: (state, addr) => {
    state.address = addr
    window.localStorage.setItem('address', JSON.stringify(addr))
  }
}

export default new Vuex.Store({
  state,
  getters,
  mutations
})