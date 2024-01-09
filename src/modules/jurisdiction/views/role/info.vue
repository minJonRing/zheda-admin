<template>
  <div class="info">
    <el-form :model="form" ref="form" :rules="rules" label-width="100px">
      <el-form-item label="角色名称	" prop="roleCode">
        <el-input v-model="form.roleCode" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="角色编码" prop="roleName">
        <el-input v-model="form.roleName" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="菜单">
        <el-tree ref="tree" :data="menu" node-key="id" show-checkbox check-strictly highlight-current
          :props="{ label: 'name' }" :default-expanded-keys="form.menu" :default-checked-keys="form.menu"
          @node-click="handleNodeClick" :filter-node-method="filterNode">
        </el-tree>
      </el-form-item>

      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" rows="3" placeholder="请输入" clearable />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { ajax } from "@/api/ajax";
// import { generateMenu } from "@/utils/common";
import { change, rulesT, blur } from "tqr";
export default {
  name: "info",
  props: {
    form: rulesT.Object
  },
  data() {
    return {
      menu: [],
      rules: {
        roleName: blur,
        roleCode: blur,
        permissions: change,
      },
      menuJson: {},
      permissions: [],
    };
  },
  mounted() {
    // 生产menuJosn
    this.getMenu();

  },
  methods: {
    getMenu() {
      ajax({ url: "/permission/getMenus" }).then(({ data }) => {
        const { menu } = data;
        this.menu = menu;
        // this.menuJson = this.getRuleJson(arr);
      });
    },
    // 获取选择的权限id
    handleNodeClick() {
      let value = this.$refs.tree.getCheckedKeys();
      return value
    },
    // 获取权限对应的id数组
    getRuleJson(data, json = {}, value = []) {
      for (let i in data) {
        let el = data[i];
        if (el.children && el.children.length) {
          let val = [...value, el.id];
          this.getRuleJson(el.children, json, val);
        } else {
          json[el.id] = [...value, el.id];
        }
      }
      return json;
    },
    // 查看详情时 只返回有的
    filterNode(value, data) {
      return true;
    },
    // 返回数据
    returnData(fn) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          let obj = { ...this.form };
          delete obj.permissions;
          obj.permissions = this.handleNodeClick();
          console.log(obj)
          fn ? fn(obj) : "";
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.info {
  padding: 18px;
  max-height: 500px;
  overflow: auto;
}
</style>
