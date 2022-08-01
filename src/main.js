import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as echarts from "echarts";
import message from "./components/message-tip";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;
Vue.use(message);
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
