<template>
  <div class="about">
    <Dynamic />
  </div>
</template>

<script>
import Dynamic from "@/components/echarts-dynamic";
export default {
  components: {
    Dynamic
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang="less" scoped></style>
