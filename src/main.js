import Vue from 'vue';
import App from './app';
import 'normalize.css'
import { install as VueApp } from './components/index'

Vue.use(VueApp);

new Vue({
  el: '#app',
  render: h => h(App)
});