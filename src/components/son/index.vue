<template>
  <div>
    {{ count }}<br />
    <button @click="handleAdd">增加</button>
  </div>
</template>

<script>
export default {
  props: {
    count: Number
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    handleAdd() {
      this.$emit("update:count", this.count + 1);
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang="less" scoped></style>
