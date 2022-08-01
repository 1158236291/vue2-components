<template>
  <div class="home">
    <Son :count.sync="count"></Son>
    <p>1111</p>
    <button @click="defaultTheme">默认主题</button>
    <button @click="dark">暗黑主题</button>
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
