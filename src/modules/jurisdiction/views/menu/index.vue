<template>
  <div class="menus">
    <div class="menu-tabs">
      <el-button type="primary" @click="isMenu = true">添加菜单</el-button>
    </div>
    <div class="menu-tree">
      <el-tree :data="menuList" node-key="id" highlight-current>
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ data.name }} - {{ data.component }}</span>
          <span>
            <el-tag :type="['', '', 'success', 'warning'][data.type]
              " style="margin-right: 24px">
              {{
                ['', '菜单', '页面', '按钮'][data.type]
              }}
            </el-tag>
            <el-button type="text" @click.stop="handleAdd(node, data)">
              添加
            </el-button>
            <el-button type="text" @click.stop="handleEdit(node, data)">
              编辑
            </el-button>
            <el-popconfirm class="ml10" title="确定删除？" placement="top" @confirm="handleDelete(node, data)">
              <el-button type="text" slot="reference" style="color: red">
                删除
              </el-button>
            </el-popconfirm>
          </span>
        </span>
      </el-tree>
    </div>
    <!-- 添加菜单 -->
    <el-dialog title="添加" :visible.sync="isMenu" width="500px" @close="init">
      <add-menus :form="form" ref="addmenus" v-if="isMenu" />
      <span slot="footer">
        <el-button @click="isMenu = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AddMenus from "./addMenu";
import { ajax } from "@/api/ajax";
// import { generateMenu } from "@/utils/common";
export default {
  name: "JurisdictionMenu1",
  components: {
    AddMenus,
  },
  data() {
    return {
      list: [],
      menuList: [],
      //  添加菜单
      isMenu: false,
      form: {
        pid: 1,
        name: "",
        type: "",
        component: "",
        permissionValue: "",
        icon: "",
        redirect: "",
        hidden: false,
        sort: 1,
      },
    };
  },
  mounted() {
    this.query();
  },
  methods: {
    // 获取全部菜单
    query() {
      this.$global.loading = true
      ajax({ url: "/permission/getMenus" })
        .then(({ data }) => {
          const { menu } = data;
          this.menuList = menu;
        })
        .finally(() => {
          this.$global.loading = false
        });
    },
    // 添加菜单 设置pid
    handleAdd(node, data) {
      this.form.pid = data.id;
      this.isMenu = true;
    },
    // 编辑 复制数据给this.form
    handleEdit(node, data) {
      const { meta } = data
      this.form = { ...data, icon: meta.icon };
      this.isMenu = true;
    },
    // 删除
    handleDelete(node, data) {
      this.$global.loading = true
      ajax({ url: "/permission/" + data.id, method: "delete" })
        .then((res) => {

          // 重新获取数据
          this.query()
        })
        .finally(() => {
          this.$global.loading = false
        });
    },
    // 提交
    handleSubmit() {
      this.$refs.addmenus.returnData((data) => {
        this.$global.loading = true;
        let { id } = data;
        if (id) {
          ajax({
            url: "/permission/",
            method: "put",
            data,
          })
            .then(() => {
              this.$notify.success('成功')
              // 重新获取数据
              this.query()
              this.isMenu = false;
            })
            .catch(() => {
              this.$global.loading = false
            });
        } else {
          ajax({
            url: "/permission",
            method: 'post',
            data: { ...data, pid: this.form.pid },
          })
            .then(() => {
              // 重新获取数据
              this.$notify.success('成功')
              this.query()
            })
            .catch(() => {
              this.$global.loading = false
            });
        }
      });
    },
    // 初始化数据
    init() {
      this.form = {
        pid: 1,
        name: "",
        type: "",
        component: "",
        permissionValue: "",
        icon: "",
        redirect: "",
        hidden: false,
        sort: 1,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.menus {
  .menu-tabs {
    padding-bottom: 12px;
    margin-bottom: 12px;
  }

  .menu-tree {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    padding: 12px;

    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
  }
}
</style>
