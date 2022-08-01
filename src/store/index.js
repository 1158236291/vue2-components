import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// const modulesFiles = require.context("./modules", false, /\.js$/);

// const modules = modulesFiles.key().reduce((module, moduleFile) => {
//   const value = modulesFiles(module).default;
//   const key = moduleFile.replace("/^./(.*).w+$/", "$1");
//   module[key] = value;
//   return module;
// }, {});
const modules = {};
export default new Vuex.Store({
  modules
});
