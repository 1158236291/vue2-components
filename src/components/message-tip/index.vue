<template>
  <div class="container" v-if="show">
    <div class="modal" :style="styleWidth">
      <div class="modal-content">
        <div class="ivu-modal-header">
          <div class="ivu-modal-header-inner">
            {{ title }}
          </div>
        </div>
        <div class="ivu-modal-body"></div>
        <div class="ivu-modal-footer">
          <button type="button" class="ivu-btn ivu-btn-text ivu-btn-large">
            <!---->
            <!---->
            <span>取消</span>
          </button>
          <button type="button" class="ivu-btn ivu-btn-primary ivu-btn-large">
            <!---->
            <!---->
            <span>确定</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "message",
  props: {
    show: {
      type: Boolean,
      default() {
        return false;
      }
    },
    width: {
      type: Number,
      default() {
        return 520;
      }
    },
    title: {
      type: String,
      default() {
        return "普通的Modal对话框标题";
      }
    }
  },
  data() {
    return {
      content: ""
    };
  },
  computed: {
    styleWidth() {
      return {
        "--box-width": this.width + "px"
      };
    }
  },
  methods: {
    success(params) {
      this.show = true;
      this.content = params;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(55, 55, 55, 0.6);
  height: 100%;
  .modal {
    margin: 0 auto;
    position: relative;
    outline: 0;
    top: 100px;
    background-color: #fff;
    width: var(--box-width);
    border-radius: 6px;
    .modal-content {
      position: relative;
      background-color: #fff;
      border: 0;
      border-radius: 6px;
      background-clip: padding-box;
      box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
      .ivu-modal-header {
        padding: 14px 16px;
        line-height: 1;
        .ivu-modal-header-inner {
          display: inline-block;
          width: 100%;
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          color: #17233d;
          font-weight: 700;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      .ivu-modal-body {
        padding: 16px;
        font-size: 12px;
        line-height: 1.5;
      }
      .ivu-modal-footer {
        padding: 12px 18px;
        text-align: right;
        .ivu-btn-text {
          color: #515a6e;
          background-color: transparent;
          border-color: transparent;
        }
        .ivu-btn-large {
          padding: 6px 15px;
          font-size: 14px;
          border-radius: 4px;
        }
        .ivu-btn {
          display: inline-block;
          margin-bottom: 0;
          font-weight: 400;
          text-align: center;
          touch-action: manipulation;
          cursor: pointer;
          background-image: none;
          border: 1px solid transparent;
          white-space: nowrap;
          user-select: none;

          transition: color 0.2s linear, background-color 0.2s linear, border 0.2s linear,
            box-shadow 0.2s linear;
        }
        .ivu-btn-primary {
          color: #fff;
          background-color: #2d8cf0;
          border-color: #2d8cf0;
        }
        .ivu-btn-primary:active,
        .ivu-btn-primary:hover {
          color: #fff;
        }
        .ivu-btn-primary.active,
        .ivu-btn-primary:active {
          color: #f2f2f2;
          background-color: #2b85e4;
          border-color: #2b85e4;
        }
      }
    }
  }
}
</style>
