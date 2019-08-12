import {
  getQuestionsType
} from '../../services/questionsType';

// console.log(getQuestionsType)

const questionsType = {
  namespaced: true,
  state: {
    getQuestionsTypeList: []
  },
  getters: {
    get_getQuestionsType(state) {
      return state.getQuestionsTypeList;
    }
  },
  mutations: {
    mutations_getQuestionsType(state, data) {
      return  state.getQuestionsTypeList = data;
    }
  },
  actions: {
    async axios_getQuestionsType({commit}) {
      const result = await getQuestionsType();
      commit('mutations_getQuestionsType', result.data.data);
    }
  }
};

export default questionsType;