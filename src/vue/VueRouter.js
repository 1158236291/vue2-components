let _Vue;
export default class VueRouter {
  constructor(options) {
    //构造器初始化
    this.$options = options;
    this.routeMap = {};
    this.data = _Vue.observable({
      current: "/"
    });
  }
  static install(Vue) {
    //1.判断组件是否已经注册
    if (VueRouter.install.installed) {
      return;
    }
    VueRouter.install.installed = true;
    //2.设置全局vue变量
    _Vue = Vue;
    //3.混入 在beforeCreate生命周期中将传入的router对象赋值到vue的原型中
    _Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router;
          //初始化一些router方法
          this.$options.router.init();
        }
      }
    });
  }
  init() {
    this.createRouteMap();
    this.initComponent(_Vue);
    this.initEvent();
  }
  //处理 routes 数组 将path和component形成对象形式
  createRouteMap() {
    const routes = this.$options.routes;
    routes.forEach((item) => {
      this.routeMap[item.path] = item.component;
    });
  }
  initComponent(Vue) {
    const self = this;
    Vue.component("router-link", {
      props: {
        to: String
      },
      methods: {
        handleClick(e) {
          console.log("e", e);
          history.pushState({}, "", this.to);
          this.$router.data.current = this.to;
          e.preventDefault();
        }
      },
      render() {
        return (
          <a href={this.to} onClick={this.handleClick}>
            {this.$slots.default}
          </a>
        );
      }
    });

    Vue.component("router-view", {
      render(h) {
        let component = self.routeMap[self.data.current];
        return h(component);
      }
    });
  }
  // 处理history模式
  // initEvent() {
  //   window.addEventListener("popstate", () => {
  //     this.data.current = window.location.pathname;
  //   });
  // }

  //处理hash模式
  initEvent() {
    window.addEventListener("hashchange", () => {
      this.data.current = this.getHash();
    });
    window.addEventListener("load", () => {
      if (!window.location.hash) {
        window.location.hash = "#/";
      }
    });
  }
  getHash() {
    return window.location.hash.slice(1) || "/";
  }
}
