import {
  examType, subject, addexam, questionList
} from '../../services/exam';

const addExam = {
  namespaced: true,
  state: {
    examTypeData: [],
    subjectData: [],
    addexam: [],
    questionList: []
  },
  getters: {
    getexamTypeData(state) {
      return state.examTypeData
    },
    getsubjectData(state) {
      return state.subjectData
    },
    getaddexam(state) {
      return state.addexam
    },
    getquestionList(state) {
      return state.questionList
    }
  },
  mutations: {
    mutationsexamTypeData(state, data) {
      state.examTypeData = data
    },
    mutationssubjectData(state, data) {
      state.subjectData = data
    },
    mutationsaddexam(state, data) {
      state.addexam = data
    },
    mutationsquestionList(state, data) {
      state.questionList = data
    }
  },
  actions: {
    async axiosexamTypeData({ commit }) {
      const result = await examType()
      commit('mutationsexamTypeData', result.data.data)
    },
    async axiossubjectData({ commit }) {
      const result = await subject()
      commit('mutationssubjectData', result.data.data)
    },
    async axiosaddexam({ commit }, obj) {
      const result = await addexam(obj)
      commit('mutationsaddexam', result.data.code)
    },
    async axiosquestionList({ commit }) {
      const result = await questionList()
      commit('mutationsquestionList', result.data.exam)
    }
  }

}

export default addExam

