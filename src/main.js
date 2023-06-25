import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './api/mock'
import * as echarts from 'echarts'
import VueDPlayer from 'vue-dplayer'
// import 'vue-dplayer/vue-dplayer.css'
import 'vue-dplayer/dist/vue-dplayer.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(echarts)
Vue.use(VueDPlayer)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
