<template>
  <el-row :gutter="20" class="my-row">
    <el-col :span="7" :offset="1">
      <h5>单一文件上传 FORM-DATA</h5>
      <el-card class="box-card">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview1"
          :on-remove="handleRemove1"
          :file-list="fileList1"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload1"
            >上传到服务器</el-button
          >
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-card>
    </el-col>
    <el-col :span="7" :offset="1">
      <h5>单一文件上传BASE64，只适合图片</h5>
      <el-card class="box-card">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview2"
          :on-remove="handleRemove2"
          :before-remove="beforeRemove2"
          :limit="5"
          :on-exceed="handleExceed2"
          :file-list="fileList2"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-card>
    </el-col>
    <el-col :span="7" :offset="1">
      <h5>单一文件上传 缩略图处理</h5>
      <el-card class="box-card">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview3"
          :on-remove="handleRemove3"
          :file-list="fileList3"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload3"
            >上传到服务器</el-button
          >
        </el-upload>
      </el-card>
    </el-col>
    <el-col :span="7" :offset="1">
      <h5>单一文件上传 进度管控</h5>
      <el-card class="box-card">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview4"
          :on-remove="handleRemove4"
          :before-remove="beforeRemove4"
          :limit="5"
          :on-exceed="handleExceed4"
          :file-list="fileList4"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-card>
    </el-col>
    <el-col :span="7" :offset="1">
      <h5>多文件上传</h5>
      <el-card class="box-card">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview5"
          :on-remove="handleRemove5"
          :file-list="fileList5"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload5"
            >上传到服务器</el-button
          >
        </el-upload>
      </el-card>
    </el-col>
    <el-col :span="7" :offset="1">
      <h5>拖拽上传</h5>
      <el-card class="box-card">
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        </el-upload>
      </el-card>
    </el-col>
    <el-col :span="7" :offset="1">
      <h5>大文件上传</h5>
      <el-card class="box-card">
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview7"
          :on-remove="handleRemove7"
          :before-remove="beforeRemove7"
          multiple
          :limit="5"
          :on-exceed="handleExceed7"
          :file-list="fileList7"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      fileList1: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      fileList2: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      fileList3: [],
      fileList4: [],
      fileList5: [],
      fileList6: [],
      fileList7: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    // 1
    submitUpload1() {
      this.$refs.upload.submit();
    },
    handleRemove1(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview1(file) {
      console.log(file);
    },
    // 2
    handleRemove2(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview2(file) {
      console.log(file);
    },
    handleExceed2(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove2(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 3
    submitUpload3() {
      this.$refs.upload.submit();
    },
    handleRemove3(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview3(file) {
      console.log(file);
    },
    // 4
    handleRemove4(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview4(file) {
      console.log(file);
    },
    handleExceed4(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove4(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 5
    submitUpload5() {
      this.$refs.upload.submit();
    },
    handleRemove5(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview5(file) {
      console.log(file);
    },
    // 6
    // 7
    handleRemove7(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview7(file) {
      console.log(file);
    },
    handleExceed7(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove7(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    }
  }
};
</script>
<style lang="less" scoped>
.my-row {
  display: flex;
  flex-wrap: wrap;
}
</style>
