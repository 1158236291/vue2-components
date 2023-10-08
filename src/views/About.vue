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
  methods: {
    getMostFrequentTag() {
      const counter = {};

      document.querySelectorAll("*").forEach((element) => {
        counter[element.tagName] = counter[element.tagName] ? counter[element.tagName] + 1 : 1;
      });
      const orderedTags = Object.entries(counter).sort((tag1, tag2) => {
        if (tag1[1] < tag2[1]) {
          return 1;
        }
        if (tag1[1] > tag2[1]) {
          return -1;
        }
        return 0;
      });
      const result = [];
      for (const tag of orderedTags) {
        if (tag[1] < orderedTags[0][1]) {
          break;
        }
        result.push(tag[0]);
      }
      return result;
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.getMostFrequentTag()
  }
};
</script>
<style lang="less" scoped></style>
