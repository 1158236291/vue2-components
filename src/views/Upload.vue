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
          :on-change="handleChange1"
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
          :on-change="handleChange3"
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
          action
          :on-preview="handlePreview4"
          :before-remove="beforeRemove4"
          :before-upload="handleBefore4"
          :limit="1"
          :on-exceed="handleExceed4"
          :file-list="fileList4"
          :http-request="handleCustomUpload4"
        >
          <el-button size="small" type="primary" :loading="loading4">点击上传</el-button>
          <el-progress
            slot="tip"
            :percentage="percentage4"
            :format="format"
            v-show="loading4"
            :color="'#67c23a'"
          ></el-progress>
        </el-upload>
      </el-card>
    </el-col>
    <el-col :span="7" :offset="1">
      <h5>多文件上传</h5>
      <el-card class="box-card">
        <el-upload
          class="upload-demo"
          ref="upload5"
          action
          :on-preview="handlePreview5"
          :on-change="handleChange5"
          multiple
          :file-list="fileList5"
          :show-file-list="false"
          :auto-upload="false"
          :http-request="handleCustomUpload5"
        >
          <el-button slot="trigger" size="small" type="primary" :disabled="disabled5"
            >选取文件</el-button
          >
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            :loading="loading5"
            @click="submitUpload5"
            >上传到服务器</el-button
          >
          <ul v-if="fileList5.length > 0">
            <li v-for="(item, index) in fileList5" :key="item.uid" :span="24">
              <span class="span">{{ index + 1 }}.</span>
              <a> {{ item.name }}</a>
              <i
                v-if="item.percentage === 0 && item.status === 'ready'"
                class="el-icon-close end"
                @click="handleDelete(item.uid)"
              ></i>
              <i
                v-if="item.status === 'success'"
                style="color: #67c23a"
                class="el-icon-circle-check end"
                @click="handleDelete(item.uid)"
              ></i>
              <span class="end" style="fonssize: 12px" v-show="item.percentage !== 0"
                >{{ item.percentage }}%</span
              >
            </li>
          </ul>
        </el-upload>
      </el-card>
    </el-col>
    <el-col :span="7" :offset="1">
      <h5>拖拽上传</h5>
      <el-card class="box-card">
        <el-upload class="upload-demo" drag action="http://127.0.0.1:8888/upload_single" multiple>
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
          action
          :on-preview="handlePreview7"
          :before-remove="beforeRemove7"
          multiple
          :file-list="fileList7"
          :http-request="handleCustomUpload7"
        >
          <el-button size="small" type="primary" :loading="loading7">点击上传</el-button>
          <el-progress
            slot="tip"
            :percentage="percentage7"
            :format="format"
            v-show="loading7"
          ></el-progress>
        </el-upload>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import SparkMD5 from "spark-md5";
import {
  uploadSingle,
  uploadSingleName,
  uploadSingleBase64,
  uploadChunk,
  uploadMerge,
  uploadAlready
} from "../api/index";
import request from "../utils/instance";
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
      loading4: false,
      percentage4: 0,
      fileList5: [],
      loading5: false,
      disabled5: false,
      fileList6: [],
      fileList7: [],
      loading7: false,
      percentage7: 0
    };
  },
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
    changeBuffer(file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
          const buffer = e.target.result;
          let spark = new SparkMD5.ArrayBuffer();
          spark.append(buffer);
          let hash = spark.end();
          let suffix = /\.([a-zA-Z0-9]+)$/.exec(file.name)[1];
          resolve({
            buffer,
            hash,
            suffix,
            filename: `${hash}.${suffix}`
          });
        };
      });
    },
    // 1
    handlePreview1(file) {
      if (!file.response) return;
      location.href = file.response.servicePath;
    },
    handleChange1(file, fileList) {
      if (file.response) return;
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
      const flag = this.$refs.upload1.uploadFiles.every((item) => item.status === "success");
      if (flag) {
        return this.$message({
          message: "文件已全部上传完成，请上传新文件",
          type: "warning"
        });
      }
      this.$refs.upload1.submit();
    },
    async handleCustomUpload1(options) {
      this.changeButton(true, 1);
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
    handleExceed1(files, fileList) {
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
        return false;
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
    handlePreview3(file) {
      if (!file.response) return;
      location.href = file.response.servicePath;
    },
    handleChange3(file, fileList) {
      if (file.response) return;
      if (file.size >= 1024 * 1024 * 10) {
        this.$message({
          message: "文件大小不能超过10MB",
          type: "warning"
        });
        const currentIndex = fileList.findIndex((item) => {
          return item.uid === file.uid;
        });
        fileList.splice(currentIndex, 1);
        return;
      }
    },
    submitUpload3() {
      if (this.$refs.upload3.uploadFiles.length === 0)
        return this.$message({
          message: "请选择要上传的文件",
          type: "warning"
        });
      const flag = this.$refs.upload3.uploadFiles.every((item) => item.status === "success");
      if (flag) {
        return this.$message({
          message: "文件已全部上传完成，请上传新文件",
          type: "warning"
        });
      }
      this.$refs.upload3.submit();
    },
    async handleCustomUpload3(options) {
      this.changeButton(true, 3);
      console.log("options", options);
      let formData = new FormData();
      const { filename } = await this.changeBuffer(options.file);
      formData.append("file", options.file);
      formData.append("filename", filename);
      try {
        const result = await uploadSingleName(formData);
        if (result.code === 0) {
          this.$message.success("上传成功");
          return Promise.resolve(result);
        }
        throw result.codeText;
      } catch (error) {
        this.$message.error("上传失败");
        return Promise.reject(error);
      } finally {
        this.changeButton(false, 3);
      }
    },
    // 4
    format(percentage) {
      return `${percentage}%`;
    },
    handlePreview4(file) {
      if (!file.response) return;
      location.href = file.response.servicePath;
    },
    handleExceed4(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove4(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleBefore4(file) {
      if (file.size >= 1024 * 1024 * 100) {
        this.$message({
          message: "文件大小不能超过100MB",
          type: "warning"
        });
        return false;
      }
    },
    async handleCustomUpload4(options) {
      this.changeButton(true, 4);
      console.log("options", options);
      let formData = new FormData();
      formData.append("file", options.file);
      formData.append("filename", options.file.name);

      try {
        const _this = this;
        const result = await request({
          url: "/upload_single",
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: function (progressEvent) {
            _this.percentage4 = parseInt((progressEvent.loaded / progressEvent.total) * 100);
          }
        });
        if (result.code === 0) {
          this.percentage4 = 100;
          this.$message.success("上传成功");
          return Promise.resolve(result);
        }
        throw result.codeText;
      } catch (error) {
        this.$message.error("上传失败");
        return Promise.reject(error);
      } finally {
        this.changeButton(false, 4);
        this.percentage4 = 0;
      }
    },
    // 5
    submitUpload5() {
      if (this.$refs.upload5.uploadFiles.length === 0)
        return this.$message({
          message: "请选择要上传的文件",
          type: "warning"
        });
      const flag = this.$refs.upload5.uploadFiles.every((item) => item.status === "success");
      if (flag) {
        return this.$message({
          message: "文件已全部上传完成，请上传新文件",
          type: "warning"
        });
      }
      this.$refs.upload5.submit();
    },
    handlePreview5(file) {
      if (!file.response) return;
      location.href = file.response.servicePath;
    },
    handleDelete(uid) {
      this.fileList5 = this.fileList5.filter((item) => item.uid != uid);
    },
    handleChange5(file, fileList) {
      if (file.response) return;
      this.fileList5 = fileList.map((item) => {
        return {
          ...item,
          percentage: 0
        };
      });
    },
    async handleCustomUpload5(options) {
      this.changeButton(true, 5);
      let formData = new FormData();
      formData.append("file", options.file);
      formData.append("filename", options.file.name);
      console.log("options", options);
      const current = this.fileList5.find((item) => item.uid === options.file.uid);
      try {
        const result = await request({
          url: "/upload_single",
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: function (progressEvent) {
            current.percentage = ((progressEvent.loaded / progressEvent.total) * 100).toFixed(2);
          }
        });
        if (result.code === 0) {
          current.percentage = 100;
          this.$message.success("上传成功");
          return Promise.resolve(result);
        }
        throw result.codeText;
      } catch (error) {
        this.$message.error("上传失败");
        return Promise.reject(error);
      } finally {
        this.changeButton(false, 5);
        current.percentage = 0;
      }
    },
    // 6
    // 7
    handlePreview7(file) {
      console.log(file);
    },
    beforeRemove7(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    async handleCustomUpload7(options) {
      this.changeButton(true, 7);
      this.percentage7 = 0;
      const { hash: HASH, suffix } = await this.changeBuffer(options.file);
      let already = [];
      try {
        const data = await uploadAlready({HASH});
        if (data.code === 0) {
          already = data.fileList;
        }
      } catch (err) {}
      console.log("already", already);
      let maxSize = 1024 * 1024 * 10;
      let count = Math.ceil(options.file.size / maxSize);
      let index = 0;
      let chunks = [];
      if (count > 100) {
        count = 100;
        maxSize = options.file.size / count;
      }
      while (index < count) {
        chunks.push({
          file: options.file.slice(index * maxSize, (index + 1) * maxSize),
          filename: `${HASH}_${index + 1}.${suffix}`
        });
        index++;
      }
      index = 0;

      const mergeFile = async () => {
        index++;
        this.percentage7 = parseInt((index / count) * 100);
        if (index < count) return;
        this.percentage7 = 100;
        try {
          const data = {
            HASH,
            count
          };
          const res = await uploadMerge(data);
          if (res.code === 0) {
            this.$message.success("上传成功");
            this.changeButton(false, 7);
            this.percentage7 = 0;
            return;
          }
          throw res.codeText;
        } catch (error) {
          this.$message.success("上传失败");
          this.changeButton(false, 7);
          this.percentage7 = 0;
        }
      };

      chunks.forEach((chunk) => {
        if (already.length > 0 && already.includes(chunk.filename)) {
          mergeFile();
          return;
        }
        let form = new FormData();
        form.append("file", chunk.file);
        form.append("filename", chunk.filename);
        uploadChunk(form)
          .then((res) => {
            if (res.code === 0) {
              mergeFile();
              return;
            }
            return Promise.reject(data.codeText);
          })
          .catch((err) => {
            this.percentage7 = 0;
            this.changeButton(false, 7);
          });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.my-row {
  display: flex;
  flex-wrap: wrap;
}
ul {
  padding: 0px;
}
li {
  list-style: none;
  font-size: 14px;
  color: #606266;
  line-height: 1.8;
  margin-top: 10px;
  position: relative;
  .span {
    padding: 0 6px;
  }
  .end {
    position: absolute;
    top: 6px;
    right: 0px;
  }
}
</style>
