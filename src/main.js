import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import 'element-ui/lib/theme-default/index.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import 'babel-polyfill';
// import Aselect from './components/select';
import Aselect from './components/select';

Vue.use(ElementUI);
Vue.use(Vuex);
Vue.component('Aselect', Aselect);
// Vue.component('Aselect',Aselect);
Vue.prototype.$axios = axios;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
