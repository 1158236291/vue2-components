import messageTipVue from "./index.vue";

export default {
  install(Vue) {
    const messageInstance = Vue.extend(messageTipVue);
    let currentInstance;
    currentInstance = new messageInstance();
    let message = currentInstance.$mount().$el;
    document.body.appendChild(message);
    Vue.prototype.$Message = currentInstance;
  }
};
