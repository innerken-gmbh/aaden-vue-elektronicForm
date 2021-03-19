import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import hillo from "hillo";

Vue.config.productionTip = false

hillo.initial("http://192.168.1.178/PHP")
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
