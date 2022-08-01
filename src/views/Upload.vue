<template>
  <el-row :gutter="20" class="my-row">
    <el-col :span="7" :offset="1">
      <h5>单一文件上传 FORM-DATA</h5>
      <el-card class="box-card">
        <el-upload
          class="upload-demo"
          ref="upload1"
          action
          :on-preview="handlePreview1"
          :on-change="handleBefore1"
          :file-list="fileList1"
          :limit="1"
          :on-exceed="handleExceed1"
          :auto-upload="false"
          :http-request="handleCustomUpload1"
        >
          <el-button slot="trigger" size="small" type="primary" :disabled="disabled1"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            :loading="loading1"
            @click="submitUpload1"
            >上传到服务器</el-button
          >
          <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg格式文件，且不超过2MB</div>
        </el-upload>
      </el-card>
    </el-col>
    <el-col :span="7" :offset="1">
      <h5>单一文件上传BASE64，只适合图片</h5>
      <el-card class="box-card">
        <el-upload
          class="upload-demo"
          action
          accept=".png,.jpg,.jpeg"
          :on-preview="handlePreview2"
          :before-remove="beforeRemove2"
          :before-upload="handleBefore2"
          :limit="1"
          :on-exceed="handleExceed2"
          :file-list="fileList2"
          :http-request="handleCustomUpload2"
        >
          <el-button size="small" type="primary" :loading="loading2">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg格式文件，且不超过2MB</div>
        </el-upload>
      </el-card>
    </el-col>
    <el-col :span="7" :offset="1">
      <h5>单一文件上传 缩略图处理</h5>
      <el-card class="box-card">
        <el-upload
          class="upload-demo"
          ref="upload3"
          action
          :on-preview="handlePreview3"
          :file-list="fileList3"
          :auto-upload="false"
          list-type="picture"
          :http-request="handleCustomUpload3"
        >
          <el-button slot="trigger" size="small" type="primary" :disabled="disabled3"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            :loading="loading3"
            @click="submitUpload3"
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
          ref="upload5"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview5"
          :on-remove="handleRemove5"
          multiple
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
import {
  uploadSingle,
  uploadSingleName,
  uploadSingleBase64,
  uploadChunk,
  uploadMerge,
  uploadAlready
} from "../api/index";
export default {
  data() {
    return {
      fileList1: [],
      loading1: false,
      disabled1: false,
      fileList2: [],
      loading2: false,
      fileList3: [],
      loading3: false,
      disabled3: false,
      fileList4: [],
      fileList5: [],
      fileList6: [],
      fileList7: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    changeButton(val, index) {
      if (typeof this[`loading` + index] === "boolean") {
        this[`loading` + index] = val;
      }
      if (typeof this[`disabled` + index] === "boolean") {
        this[`disabled` + index] = val;
      }
    },
    changeBase64(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = (e) => {
          resolve(e.target.result);
        };
      });
    },
    // 1
    handlePreview1(file) {
      if (!file.response) return;
      location.href = file.response.servicePath;
    },
    handleBefore1(file, fileList) {
      if (file.response) return;
      console.log(file, fileList);
      if (!/(PNG|JPG|JPEG)/i.test(file.raw.type)) {
        this.$message({
          message: "只能上传jpg/png/jpeg格式文件",
          type: "warning"
        });
        const currentIndex = fileList.findIndex((item) => {
          return item.uid === file.uid;
        });
        fileList.splice(currentIndex, 1);
        return;
      }
      if (file.size >= 1024 * 1024 * 2) {
        this.$message({
          message: "文件大小不能超过2MB",
          type: "warning"
        });
        const currentIndex = fileList.findIndex((item) => {
          return item.uid === file.uid;
        });
        fileList.splice(currentIndex, 1);
        return;
      }
    },
    submitUpload1() {
      if (this.$refs.upload1.uploadFiles.length === 0)
        return this.$message({
          message: "请选择要上传的文件",
          type: "warning"
        });
      this.changeButton(true, 1);
      this.$refs.upload1.submit();
    },
    async handleCustomUpload1(options) {
      console.log("options", options);
      let formData = new FormData();
      formData.append("file", options.file);
      formData.append("filename", options.file.name);
      try {
        const result = await uploadSingle(formData);
        if (result.code === 0) {
          this.$message.success("上传成功");
          return Promise.resolve(result);
        }
        throw result.codeText;
      } catch (error) {
        this.$message.error("上传失败");
        return Promise.reject(error);
      } finally {
        this.changeButton(false, 1);
      }
    },
    handleExceed1() {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    // 2
    handlePreview2(file) {
      if (!file.response) return;
      location.href = file.response.servicePath;
    },
    handleExceed2(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove2(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleBefore2(file) {
      if (file.size >= 1024 * 1024 * 2) {
        this.$message({
          message: "文件大小不能超过2MB",
          type: "warning"
        });
        const currentIndex = fileList.findIndex((item) => {
          return item.uid === file.uid;
        });
        fileList.splice(currentIndex, 1);
        return;
      }
    },
    async handleCustomUpload2(options) {
      const base64 = await this.changeBase64(options.file);
      this.changeButton(true, 2);
      console.log("options", options);
      try {
        const data = {
          file: encodeURIComponent(base64),
          filename: options.file.name
        };
        const result = await uploadSingleBase64(data);
        if (result.code === 0) {
          this.$message.success("上传成功");
          return Promise.resolve(result);
        }
        throw result.codeText;
      } catch (error) {
        this.$message.error("上传失败");
        return Promise.reject(error);
      } finally {
        this.changeButton(false, 2);
      }
    },
    // 3
    submitUpload3() {
      if (this.$refs.upload3.uploadFiles.length === 0)
        return this.$message({
          message: "请选择要上传的文件",
          type: "warning"
        });
      this.$refs.upload3.submit();
    },
    handlePreview3(file) {
      console.log(file);
    },
    handleCustomUpload3(options) {
      console.log("options", options);
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
        `当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove4(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 5
    submitUpload5() {
      this.$refs.upload5.submit();
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
        `当前限制选择 5 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
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
