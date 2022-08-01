<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <el-button type="primary" @click="handleXlsx">导出xlsx</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import * as XLSX from "xlsx";
export default {
  components: {},
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
    handleXlsx() {
      let tableData = [
        ["序号", "日期", "姓名", "地址"] //导出表头
      ]; // 表格表头
      this.tableData.forEach((item, index) => {
        let rowData = [];
        //导出内容的字段
        rowData = [index + 1, item.date, item.name, item.address];
        tableData.push(rowData);
      });
      let ws = XLSX.utils.aoa_to_sheet(tableData);
      let wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "表格数据"); // 工作簿名称
      XLSX.writeFile(wb, "表格数据.xlsx"); // 保存的文件名
    }
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang="less" scoped></style>
