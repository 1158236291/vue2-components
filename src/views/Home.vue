<template>
  <div class="home">
    <Son :count.sync="count"></Son>
    <p>1111</p>
    <button @click="defaultTheme">默认主题</button>
    <button @click="dark">暗黑主题</button>
    <div id="canvas"></div>
  </div>
</template>

<script>
import { setTheme } from "@/theme/theme.js";
// @ is an alias to /src
import Son from "@/components/son";
export default {
  name: "Home",
  components: {
    Son
  },
  data() {
    return {
      count: 0
    };
  },
  methods: {
    getCanvasFp() {
      const canvas = document.getElementById("canvas");
      const ctx = canvas.getContext("2d");
      ctx.font = "14px Arial";
      ctx.fillStyle = "#ccc";
      ctx.fillText("hello, shanyue", 2, 2);
      console.log(canvas.toDataURL("image/jpeg"))
    },
    defaultTheme() {
      setTheme("default");
    },
    dark() {
      setTheme("dark");
    },
    // 更改为自定义主题
    custom() {
      let newColor = {
        r: 12,
        g: 33,
        b: 234
      };
      let newPrimaryColor = `${newColor.r},${newColor.g},${newColor.b}`;
      localStorage.setItem("primaryColor", newPrimaryColor); // 将新的主题色存入本地
      setTheme();
    },
    debounce(fn, wait) {
      let time;
      return function () {
        let _this = this;
        let args = arguments;
        if (time) {
          clearTimeout(time);
        }
        time = setTimeout(() => {
          fn.apply(_this, args);
        }, wait);
      };
    },
    throttle(fn, wait) {
      let time = 0;
      return function () {
        let _this = this;
        let args = arguments;
        let now = Date.now();
        if (now - time > wait) {
          fn.apply(_this, args);
          time = now;
        }
      };
    }
  },
  mounted() {
    //this.$Message.success("成功啦");
  }
};
</script>
<style lang="less" scoped>
p {
  color: @primaryTextColor;
}
</style>
