<template>
  <div class="box">
    <div class="content">
      <div class="list">
        <button class="bubbly-button" @click="handleAdd">添加目录</button>
        <el-tree :data="list" node-key="id" :indent="8">
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <div class="flex flex-mid">
              <span class="label">{{ node.label }}</span>
              <span>
                <el-button type="text" size="mini" @click.stop="() => append(data)">
                  添加
                </el-button>
                <el-popconfirm class="ml10" title="确定删除？" placement="top" @confirm="remove(node, data)">
                  <el-button type="text" size="mini" slot="reference" style="color: red">
                    删除
                  </el-button>
                </el-popconfirm>
              </span>
            </div>
          </span>
        </el-tree>
      </div>
      <div class="cont">
        <div v-if="show">
          <el-form :model="form" ref="form" :rules="rules" label-width="80px">
            <el-form-item label="名称" prop="title">
              <el-input type="textarea" rows="3" v-model="form.title" placeholder="请输入" clearable />
            </el-form-item>
            <el-form-item label="视频">
              <el-upload v-loading="loading" :element-loading-text="progress + '%'" class="uploader" action="#" :limit="1"
                :show-file-list="false" :before-upload="beforeAvatarUpload"
                :http-request="handleUploadLearnSignVoucherFileChange" attr-icon="注:请上传MP4格式视频">
                <div class="video-box">
                  <div v-if="form.video" class="video">
                    <video ref="video" class="video" loop autoplay>
                      <source :src="form.video" type="video/mp4">
                    </video>
                  </div>
                  <i v-else class="el-icon el-icon-upload2" />
                </div>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSubmit">保存 / 更新</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-empty v-else description="暂无操作"></el-empty>
      </div>
    </div>
  </div>
</template>

<script>
import { rulesT, blur } from "tqr";
import { ajax } from "@/api/ajax";
export default {
  name: "Survey",
  props: {
    noBtns: rulesT.Array,
    otherBtns: rulesT.Array,
    selection: rulesT.Array,
  },
  data() {
    return {
      list: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      id: 100,
      // content
      show: false,
      form: {
        title: '',
        video: ''
      },
      rules: {
        title: blur
      },
      // upload-loading upload-progress
      loading: false,
      progress: 0
    };
  },
  computed: {
  },
  created() {
  },
  methods: {
    handleAdd(e) {
      this.form = {
        title: '',
        video: ''
      }
      this.show = true
    },
    append(data) {
      const newChild = { id: this.id++, label: 'testtest', children: [] };
      if (!data.children) {
        this.$set(data, 'children', []);
      }
      data.children.push(newChild);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },
    beforeAvatarUpload(file) {
      const { name, type } = file;
      this.form.title = name.replace(/\.mp4/, '')
      const isType = new RegExp('mp4').test(type)
      if (!isType) {
        this.$message.error(`请上传正确的视频文件`);
      }
      return isType
    },
    handleUploadLearnSignVoucherFileChange() {
      // return
      this.loading = true;
      const { file } = files;
      let formData = new FormData();
      formData.append("file", file);
      ajax({
        url: this.url,
        method: "post",
        data: formData,
        onUploadProgress: ({ loaded, total }) => {
          this.progress = Math.ceil((loaded / total) * 100);
        },
      })
        .then(({ data }) => {

        })
        .finally(() => {
          this.loading = false;
        });
    },
    handleSubmit() {

    }
  },
};
</script>

<style lang="scss" scoped>
.box {
  position: relative;
  height: calc(100vh - 108px);
  // padding: 0 !important;
  // background-color: transparent !important;

  .content {
    position: relative;
    height: 100%;
    z-index: 2;
    display: flex;

    .list {
      width: 320px;
      padding: 8px;
      border-radius: 8px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      margin-right: 12px;
      backdrop-filter: blur(5px);

      .bubbly-button {
        font-family: 'Helvetica', 'Arial', sans-serif;
        display: inline-block;
        width: 100%;
        font-size: 14px;
        padding: 8px 16px;
        margin-bottom: 8px;
        appearance: none;
        background-color: hsla(173, 100, 32.55, .8);
        color: #fff;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        transition-property: box-shadow;
        transition-duration: 300ms;

        &:hover {
          // box-shadow: 2px 2px 5px hsla(173, 100, 32.55, .7);
          box-shadow: 2px 2px 5px hsla(0, 0, 0, .3);
        }

        &:active {
          opacity: 0.8;
        }
      }

      .el-tree {
        background-color: transparent;

        ::v-deep .el-tree-node__content {
          .custom-tree-node {
            width: 100%;

            .label {
              flex-grow: 1;
            }
          }
        }
      }
    }

    .cont {
      flex-grow: 1;
      padding: 8px;
      border-radius: 8px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
      backdrop-filter: blur(5px);

      .el-form {
        .el-form-item {
          ::v-deep .el-form-item__content {
            .el-upload {
              width: 100%;

              .video-box {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                padding-bottom: 50%;
                user-select: none;
                border: 2px #ddd dashed;
                border-radius: 6px;
                overflow: hidden;

                .video {
                  position: absolute;
                  top: 0;
                  left: 0;
                  height: 100%;
                  height: 100%;

                  video {
                    width: 100%;
                    height: 100%;
                  }
                }

                .el-icon {
                  position: absolute;
                  color: #ddd;
                  font-size: 60px;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  pointer-events: none;
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
