<template>
  <div class="rule">
    <ListProT ref="list" :list="list" :mixinConfig="mixinConfig" :searchParam="searchParam" :tableParam="tableParam"
      :jump="false" @getJump="getJump" :noBtns="['see']" />
    <!-- 添加角色组 -->
    <el-dialog title="角色" :visible.sync="show" width="500" @close="initR">
      <info v-if="show" ref="info" :form="form" />
      <span slot="footer">
        <el-button @click="show = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmRule">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { ajax } from "@/api/ajax";
//
import Info from "./info";
export default {
  name: "JurisdictionAuthority1",
  components: {
    Info,
  },
  data() {
    return {
      mixinConfig: {
        url: "/role",
      },
      list: {},
      // 查询条件
      searchParam: [],
      // 表格表头、数据显示
      tableParam: [],
      // add rule
      show: false,
      form: {
        id: null,
        roleName: "",
        roleCode: "",
        permissions: [],
        remark: '',
      }
    };
  },
  created() {
  },
  mounted() {
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
        { label: "角色名称", prop: "roleName" },
        { label: "角色编码", prop: "roleCode" },
        { label: "备注", prop: "remark", },
      ];
    },
    getJump({ handle, data }) {
      if (handle === 'add') {
        this.show = true
      } else if (handle === 'edit') {
        this.form = { ...data, menu: this.filterMenu(data.routersList) }
        this.show = true
      }
    },
    filterMenu(menu, list = []) {
      for (let el of menu) {
        const { id, children } = el;
        if (children && children.length) {
          this.filterMenu(children, list)
        }
        list.push(id)
      }
      return list
    },
    // 新增/编辑
    handleConfirmRule() {
      this.$refs.info.returnData((data) => {
        this.$global.loading = true
        const { id } = data;
        if (id) {
          // ajax({ url: "/role", method: "put", data: { ...data, permissions: [] } })
          ajax({ url: "/role", method: "put", data })
            .then((res) => {
              this.show = false;
              this.$refs.list.query();
            })
            .catch(() => {
              this.$global.loading = false
            });
        } else {
          ajax({ url: "/role", method: "post", data })
            .then((res) => {
              this.show = false;
              this.$refs.list.query();
            })
            .catch(() => {
              this.$global.loading = false
            });
        }
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

