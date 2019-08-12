import Vue from 'vue';
import Vuex from 'vuex';
import module from './modules'

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        ...module,
    }

})

window.store = store
export default store
