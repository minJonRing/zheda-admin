<template>
  <div class="box">
    <ListProT ref="list" :list="list" :mixinConfig="mixinConfig" :searchParam="searchParam" :tableParam="tableParam"
      :noBtns="noBtns" :otherBtns="otherBtns" :selection="selection" @getData="getData" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { rulesT } from "tqr";
import HeadJpg from '@/assets/head.jpg'
export default {
  name: "List",
  props: {
    noBtns: rulesT.Array,
    otherBtns: rulesT.Array,
    selection: rulesT.Array,
  },
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
    };
  },
  computed: {
    ...mapGetters([]),
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.searchParam = [
        {
          label: "姓名",
          type: "input",
          option: {
            prop: "nickName",
            initValue: "",
          },
        },
        {
          label: "处室",
          type: "input",
          option: {
            prop: "username",
            initValue: "",
          },
        }
      ];
      this.tableParam = [
        {
          label: "照片", formatter: (row) => {
            return <img src={row.avatar || HeadJpg} style="display:block;width:60px;height:60px;margin:0 auto" />
          }
        },
        { label: "姓名", prop: "nickName" },
        { label: "处室", prop: "username" },
        { label: "出生年月", prop: "phone" },
        { label: "职称", prop: "phone" },
        { label: "政治面貌", prop: "phone" },
        { label: "毕业院校", prop: "phone" },
        {
          label: "创建时间", formatter: (row) => {
            return row.createTime.split('T')[0]
          }
        },
        {
          label: "最后更新时间", formatter: (row) => {
            return row.updateTime.split('T')[0]
          }
        },
      ];
    },
    getData(data) {
      this.$emit("getData", data);
    },
  },
};
</script>
