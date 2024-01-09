<template>
  <div class="info">
    <el-form :model="form" ref="form" :rules="rules" label-position="top">
      <el-form-item label="处室名称" prop="name">
        <el-input v-model="form.name" type="textarea" rows="2" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="照片集">
        <div class="w100">
          <el-upload class="uploader" :disabled="loading" action="#" multiple :show-file-list="false"
            :before-upload="beforeAvatarUpload" :http-request="handleUploadLearnSignVoucherFileChange"
            attr-icon="注:请上传MP4格式视频">
            <div class="flex flex-mid">
              <el-button :loading="loading" type="primary">上传{{ loading ? '中...' : '图片(1920*1080)' }}</el-button>
              <el-progress v-if="loading" :percentage="progress" style="width: 300px;"></el-progress>
            </div>
          </el-upload>
          <div class="list">
            <TransitionGroup class="transition-group">
              <div class="item" v-for="(i, j) in files" :key="i" draggable="true" @dragstart="handleDragStart($event, i)"
                @dragover.prevent="handleDragOver($event, i)" @dragenter="handleDragEnter($event, i)"
                @dragend="handleDragEnd($event, i)">
                <img :src="i" alt="">
                <div class="handle">
                  <el-popconfirm title="确定删除？" placement="top" @confirm="handleRemove(j)">
                    <el-button type="text" size="mini" slot="reference" style="color: red">
                      删除
                    </el-button>
                  </el-popconfirm>
                </div>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="处室简介" prop="describe">
        <el-input v-model="form.describe" type="textarea" rows="6" placeholder="请输入" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="hadnleSubmit">保存</el-button>

        <btn-return />
      </el-form-item>

    </el-form>

  </div>
</template>
  
<script>
import { blur } from 'tqr'
import { ajax } from '@/api/ajax'
export default {
  name: 'Info',
  data() {
    return {
      initForm: {},
      form: {
        id: null,
        name: "",
        describe: "",
        imageUrl: "",
      },
      rules: {
        name: blur,
        describe: blur,
      },
      // upload-loading upload-progress
      loading: false,
      files: [],
      progress: 0,
      // dragenter
      headstream: null,
      target: null
    }
  },
  computed: {
  },
  created() {
    this.initForm = { ...this.form }
  },
  methods: {
    beforeAvatarUpload(file) {
      const { type, size } = file
      const isType =
        ['image', 'jpg', 'png'].filter((i) => {
          return (
            new RegExp(i).test(type) ||
            i === file.name.replace(/.+(?=\.)|\./g, "")
          );
        }).length > 0;
      const isSize = size / 1024 / 1024 < 20;
      if (!isType) {
        this.$message.error(`请上传正确的图片文件`);
      }
      if (!isSize) {
        this.$message.error(`上传文件大小不能超过20MB!`);
      }
      return isType && isSize;
    },
    handleUploadLearnSignVoucherFileChange(files) {
      // return
      this.loading = true;
      const { file } = files;
      let formData = new FormData();
      formData.append("file", file);
      ajax({
        url: '/upload',
        method: "post",
        data: formData,
        onUploadProgress: ({ loaded, total }) => {
          this.progress = Math.ceil((loaded / total) * 100);
        },
      })
        .then(({ data }) => {
          const { url } = data;
          this.files.push('http://1.116.45.32:8899' + url)
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 拖拽
    handleDragStart(e, item) {
      this.headstream = item; //把刚开始拖拽的元素赋值给headstream
    },
    // 当拖拽元素在目标元素内时反复触发
    handleDragOver(e) {
      e.dataTransfer.dropEffect = "move";
    },
    // 当拖拽元素进入目标元素时触发
    handleDragEnter(e, item) {
      e.dataTransfer.effectAllowed = "move";// 为需要移动的元素设置dragstart事件
      this.target = item; //把目标元素赋值给target
    },
    // 拖拽结束后触发
    handleDragEnd(e, item) {
      if (this.target === this.headstream) {
        return;
      }
      let files = [...this.files];
      const src = files.indexOf(this.headstream);
      const dst = files.indexOf(this.target);
      files.splice(src, 1, ...files.splice(dst, 1, files[src]));
      this.files = files;
      this.$nextTick(() => {
        this.headstream = null;
        this.target = null;
      });
    },
    handleRemove(i) {
      this.files.splice(i, 1)
    },
    hadnleSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { id } = this.form;
          const data = { ...this.form, imageUrl: this.files.join() }
          this.$global.loading = true;
          ajax({
            url: '/department',
            method: id ? 'put' : 'post',
            data
          }).then(() => {
            this.$notify.success('成功')
            this.form = { ...this.initForm }
            this.files = []
          }).finally(() => {
            this.$global.loading = false;
          })

        } else {
          this.$notify.warning("必填项未填写完整，请检查！");
          return false;
        }
      });
    },
    renderHtml() {
      const newString = this.form.mark.replace(/\n/g, '_@').replace(/\r/g, '_#')
      return newString.replace(/_@/g, '<br/>')
    }
  }
}
</script>
  
<style lang="scss" scoped>
.info {
  .el-form {
    .el-form-item {
      ::v-deep .el-form-item__content {
        .uploader {
          padding: 0 0 16px 0;
        }

        .list {
          --w: 160px;
          --h: 90px;

          .transition-group {
            display: flex;
            flex-wrap: wrap;

            .item {
              position: relative;
              width: var(--w);
              height: var(--h);
              margin: 0 8px 8px 0;
              border-radius: 4px;
              background-color: #dfdfdf;
              transition-duration: 600ms;
              cursor: pointer;
              user-select: none;
              overflow: hidden;

              img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
                image-rendering: auto;
                pointer-events: none;
              }

              .handle {
                position: absolute;
                top: 0;
                right: 0;
                padding: 0 7px;
                overflow: hidden;
                background-color: rgba(255, 255, 255, .6);
                backdrop-filter: blur(5px);
                opacity: 0;
                transition-duration: 600ms;
              }

              &:hover {
                .handle {
                  opacity: 1;
                }
              }
            }
          }
        }

      }
    }
  }
}
</style>