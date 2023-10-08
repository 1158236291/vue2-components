import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const modulesFiles = require.context("./modules", true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/\.\/(.*)\.\w+$/, "$1");
  // 执行modulesFiles函数，返回一个对象{default: {// 文件内容}, _esModule: true}
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default || value;
  return modules;
}, {});

export default new Vuex.Store({
  modules
});
