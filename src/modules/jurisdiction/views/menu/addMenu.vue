<template>
  <div class="add-menu">
    <el-form :model="form" ref="form" :rules="rules" label-width="120px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item class="w100" label="类型" prop="type">
        <el-select class="w100" v-model="form.type" placeholder="请选择" clearable filterable>
          <el-option v-for="item in menuType" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="页面组件" prop="component">
        <el-select class="w100" v-model="form.component" placeholder="请选择" clearable filterable>
          <el-option v-for="item in components" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <div class="flex flex-mid">
          <svg-icon v-if="form.icon" :icon-class="form.icon" style="margin-right:12px" />
          <el-select class="w100" v-model="form.icon" value-key="" placeholder="请选择(只作用顶级菜单)" clearable filterable>
            <el-option v-for="item in icons" :key="item.value" :label="item.value" :value="item.value">
              <svg-icon :icon-class="item.value" />
            </el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item label="隐藏菜单" size="hidden">
        <el-switch v-model="form.hidden" :active-value="true" :inactive-value="false" active-text="是" inactive-text="否" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="form.sort" placeholder="请输入" clearable />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { devComponent } from '@/router/index'
import { blur, change } from 'tqr'
export default {
  name: "addmenu",
  props: {
    form: {
      type: Object,
      default: () => {
        return {
          pid: 1,
          name: "",
          type: "",
          component: "",
          icon: "",
          redirect: "",
          hidden: false,
          sort: 1,
        };
      },
    },
  },
  data() {
    return {
      menuType: [
        { value: 1, label: '菜单' },
        { value: 2, label: '按钮' },
      ],
      rules: {
        name: blur,
        type: change,
        component: blur,
        sort: blur,
      },
      // 图标
      icons: [
        { value: 'bug', label: 'bug' },
        { value: 'chart', label: 'chart' },
        { value: 'clipboard', label: 'clipboard' },
        { value: 'component', label: 'component' },
        { value: 'dashboard', label: 'dashboard' },
        { value: 'documentation', label: 'documentation' },
        { value: 'donate', label: 'donate' },
        { value: 'drag', label: 'drag' },
        { value: 'education', label: 'education' },
        { value: 'email', label: 'email' },
        { value: 'example', label: 'example' },
        { value: 'excel', label: 'excel' },
        { value: 'exit-fullscreen', label: 'exit-fullscreen' },
        { value: 'eye-open', label: 'eye-open' },
        { value: 'eye', label: 'eye' },
        { value: 'form', label: 'form' },
        { value: 'fullscreen', label: 'fullscreen' },
        { value: 'guide', label: 'guide' },
        { value: 'icon', label: 'icon' },
        { value: 'international', label: 'international' },
        { value: 'language', label: 'language' },
        { value: 'link', label: 'link' },
        { value: 'list', label: 'list' },
        { value: 'lock', label: 'lock' },
        { value: 'message', label: 'message' },
        { value: 'money', label: 'money' },
        { value: 'nested', label: 'nested' },
        { value: 'password', label: 'password' },
        { value: 'pdf', label: 'pdf' },
        { value: 'people', label: 'people' },
        { value: 'peoples', label: 'peoples' },
        { value: 'qq', label: 'qq' },
        { value: 'search', label: 'search' },
        { value: 'shopping', label: 'shopping' },
        { value: 'skill', label: 'skill' },
        { value: 'star', label: 'star' },
        { value: 'tab', label: 'tab' },
        { value: 'table', label: 'table' },
        { value: 'theme', label: 'theme' },
        { value: 'tree-table', label: 'tree-table' },
        { value: 'tree', label: 'tree' },
        { value: 'user', label: 'user' },
        { value: 'wechat', label: 'wechat' },
        { value: 'zip', label: 'zip' },
      ],
      components: []
    };
  },
  created() {
    const component = []
    for (let key in devComponent) {
      component.push({ value: key, label: key })
    }
    this.components = component
  },
  methods: {
    returnData(fn) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { hidden } = this.form
          const data = {
            ...this.form,
            status: hidden ? 1 : 0
          }
          fn ? fn(data) : "";
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.add-menu {
  padding: 18px 24px 0;
}
</style>
