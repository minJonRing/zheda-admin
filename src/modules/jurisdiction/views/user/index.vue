<template>
  <div class="rule">
    <ListProT ref="list" :list="list" :mixinConfig="mixinConfig" :searchParam="searchParam" :tableParam="tableParam"
      :jump="false" @getJump="getJump" :noBtns="['add', 'see', 'delete']" />
    <!-- 添加角色组 -->
    <el-dialog title="角色" :visible.sync="show" width="240" @close="initR">
      <div style="padding:12px 0">
        <el-select v-model="form.roleId" placeholder="请选择" clearable filterable style="width:100%">
          <el-option v-for="item in roleList" :key="item.id" :label="item.roleName" :value="item.id" />
        </el-select>
      </div>
      <span slot="footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmRule">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { ajax } from "@/api/ajax";
export default {
  name: "JurisdictionAuthority1",
  data() {
    return {
      mixinConfig: {
        url: "/user",
      },
      list: {},
      // 查询条件
      searchParam: [],
      // 表格表头、数据显示
      tableParam: [],
      // add rule
      show: false,
      form: {
        roleId: ''
      },
      roleList: []
    };
  },
  created() {
  },
  mounted() {
    this.getJS()
    this.init();
  },
  methods: {
    init() {
      this.searchParam = [
        {
          label: "角色名称",
          type: "input",
          option: {
            prop: "roleName",
            initValue: "",
          },
        },
      ];
      this.tableParam = [
        { label: "用户账号", prop: "username" },
        { label: "用户姓名", prop: "nickName" },
        { label: "手机号", prop: "phone" },
        { label: "角色名称", prop: "roleName" },
      ]
    },
    // 获取角色
    getJS() {
      this.$global.loading = true
      ajax({ url: "/role" })
        .then(({ data }) => {
          const { list } = data;
          this.roleList = list;
        })
        .finally(() => {
          this.$global.loading = false
        });
    },
    // 判断是那种类型的草错
    getJump({ handle, data }) {
      if (handle === 'add') {
        this.show = true
      } else if (handle === 'edit') {
        this.form = { ...data, roleId: +data.roleId }
        this.show = true
      }
    },
    // 新增/编辑
    handleConfirmRule() {
      // this.$refs.info.returnData((data) => {
      this.$global.loading = true
      const { id, roleId } = this.form;
      ajax({ url: "/user", method: "put", data: { id, roleId } })
        .then(() => {
          this.$notify.success('成功')
          this.show = false;
          this.$refs.list.query();
        })
        .catch(() => {
          this.$global.loading = false
        });
    },
    initR() {
      this.form = {
        id: null,
        roleName: "",
        roleCode: "",
        permissions: [],
        remark: '',
      }
    }
  },
};
</script>

