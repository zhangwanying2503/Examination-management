import {
  updateQuestion,
  getAddQuestions,
  getExamType,
  getSubjectType
} from '../../services/addQuestions';

const addQuestions = {
  namespaced: true,
  state: {
    getAddQuestionsData: [],
    getExamTypeData: [],
    getSubjectTypeData: []
  },
  getters: {
    get_addQuestions(state) {
      return state.getAddQuestionsData;
    },
    get_examType(state) {
      return state.getExamTypeData;
    },
    get_subjectType(state) {
      return state.getSubjectTypeData;
    }
  },
  mutations: {
    mutations_addQuestions(state, data) {
      state.getAddQuestionsData = data;
    },
    mutations_examType(state, data) {
      state.getExamTypeData = data;
    },
    mutations_subjectType(state, data) {
      state.getSubjectTypeData = data;
    }
  },
  actions: {
    async axios_addQuestions({
      commit
    },obj) {
      const result = await getAddQuestions(obj);
      if(result.data.code == 1) {
        alert(result.data.msg);
      }
    },
    async axios_examType({
      commit
    }) {
      const result = await getExamType();
      commit('mutations_examType',result.data.data);
    },
    async axios_subjectType({
      commit
    }) {
      const result = await getSubjectType();
      commit('mutations_subjectType', result.data.data);
    },

    //更新试题（试题编辑）
    async updateQuestion({commit},options){
      const result = await updateQuestion(options.data);
      if(result.data.code==1){
        alert(result.data.msg);
      }else{
        alert(result.data.msg);
      }
      options.$router.push('/main/watchQuestion');
    }
  }

};

export default addQuestions;
window.addQuestions = addQuestions;