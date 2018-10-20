// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import router from './router'
import Toast from 'muse-ui-toast';
import bus_ from './assets/eventBus'
import global_ from './assets/global'
import Message from 'muse-ui-message';

Vue.config.productionTip = false
Vue.use(MuseUI);
Vue.use(Message,{warningIcon: 'info', iconSize: 24, maxWidth: '96%'});
Vue.use(Toast);
Vue.prototype._B = bus_
Vue.use(global_,{Toast:Toast,Message:Message});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
