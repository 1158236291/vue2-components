<template>
  <div id="echarts" style="width: 92%; height: 500px"></div>
</template>

<script>
import dayjs from "dayjs";
export default {
  components: {},
  data() {
    return {
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "cross" }
        },
        legend: {},
        xAxis: [
          {
            type: "category",
            axisTick: {
              alignWithLabel: true,
              show: false
            },
            data: []
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "磁盘使用量",
            min: 0,
            max: 1000,
            position: "right",
            axisLabel: {
              formatter: "{value} GB"
            }
          },
          {
            type: "value",
            name: "占用百分比",
            min: 0,
            max: 100,
            position: "left",
            axisLabel: {
              formatter: "{value} %"
            }
          }
        ],
        series: [
          {
            name: "内存占用率",
            yAxisIndex: 1,
            type: "bar",
            data: [],
            itemStyle: {
              barBorderRadius: 5,
              borderWidth: 1,
              borderType: "solid",
              borderColor: "#73c0de",
              shadowColor: "#5470c6",
              shadowBlur: 1
            }
          },
          {
            name: "CPU占用率",
            yAxisIndex: 1,
            type: "bar",
            data: [],
            itemStyle: {
              barBorderRadius: 5,
              borderWidth: 1,
              borderType: "solid",
              borderColor: "#73c0de",
              shadowColor: "#5470c6",
              shadowBlur: 1
            }
          }
        ]
      },

      beforinfo: [],
      times: {},
      timer: undefined
    };
  },
  computed: {},
  watch: {},
  methods: {
    init() {
      let myChart = this.$echarts.getInstanceByDom(document.getElementById("echarts"));
      myChart.hideLoading();
      myChart.setOption(this.option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
    getbefortime() {
      const currentTime = Date.now();
      for (let index = 0; index < 20; index++) {
        this.beforinfo.push(Math.floor(Math.random() * 100));
        this.times[dayjs(1000 * 3 * index + currentTime).format("HH:mm:ss")] =
          1000 * 3 * index + currentTime;
      }
      this.option.xAxis[0].data = Object.keys(this.times);
      this.option.series[0].data = this.beforinfo;
    },
    getNewVal() {
      this.option.xAxis[0].data.shift();
      this.option.series[0].data.shift();
      const values = Object.values(this.times);
      const endTime = values[values.length - 1];
      this.times[dayjs(1000 * 3 + endTime).format("HH:mm:ss")] = 1000 * 3 + endTime;
      this.option.xAxis[0].data.push(dayjs(1000 * 3 + endTime).format("HH:mm:ss"));
      this.option.series[0].data.push(Math.floor(Math.random() * 100));
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getbefortime();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    const self = this;
    let myChart = this.$echarts.init(document.getElementById("echarts"));
    myChart.showLoading();
    this.init();
    this.timer = window.setInterval(() => {
      self.getNewVal();
      this.init();
    }, 3000);
    this.$on("hook:beforeDestroy", () => {
      clearInterval(self.timer);
    });
  }
};
</script>
<style lang="less" scoped></style>
