// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import mavonEditor from 'mavon-editor'; // markdown
import store from './store/index';
import gradeDialog from './components/grade/gradeDialog';
import './config/elementUI.config';
import 'mavon-editor/dist/css/index.css'; // markdown 样式
Vue.use(mavonEditor)
Vue.component('gradeDialog',gradeDialog)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
