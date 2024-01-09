<template>
  <div class="info">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px">
      <el-form-item label="照片">
        <Upload v-model="form.avatar" url="/upload" />
      </el-form-item>
      <FormProT :form="form" :list="list" :form-list="formList" />
      <el-form-item>
        <el-button type="primary" @click="handleConfirm"> 确认 </el-button>
        <btn-return />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import infoMixin from "@/mixin/infoMixin";
import {
  rulesT,
  blur,
  change,
  blurPhoneNotRequired,
  blurEmailNotRequired
} from "tqr";
import Upload from '@/modules/upload.vue'
import { ajax } from "@/api/ajax";

export default {
  name: "Info",
  mixins: [infoMixin],
  props: {
    read: rulesT.Boolean,
  },
  components: {
    Upload
  },
  data() {
    return {
      id: null,
      mixinConfig: {
        url: "/user",
      },
      list: {
        roleList: []
      },
      form: {
        id: null,
        name: "",
        birthDate: "",
        politicalOutlook: "",
        depId: 0,
        depName: "",
        position: "",
        positionalTitles: "",

        graduatedFrom: "",
        major: "",
        academicDegree: "",

        project: "",
        honors: "",

        task: "",

        isLeader: 0,
      },
      formList: [],
      rules: {
        // nickName: blurName,
        username: [{ required: true, message: '请输入', trigger: 'blur' }, , { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
        password: [{ required: true, message: '请输入', trigger: 'blur' }, , { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
        checkPassword: blur,
        phone: blurPhoneNotRequired,
        email: blurEmailNotRequired,
        roleId: change
      },
    };
  },
  created() {
    this.getJS()
    const { id } = this.$route.query;
    this.id = id
    if (id) {
      this.getDetail(id).then(({ user }) => {
        this.init()
        this.form = user;
      })
    } else {
      this.init()
    }
  },
  methods: {
    init() {
      const isRead = this.read;
      this.formList = [
        {
          type: "box",
          className: "flex flex-mid flex-wrap",
          children: [
            {
              label: "姓名",
              type: "input",
              option: {
                prop: "name",
                isRead,
                initValue: "",
                maxlength: 10
              },
            },
            {
              label: "出生年月",
              type: "date",
              option: {
                prop: "birthDate",
                type: 'month',
                'value-format': 'yyyy-MM',
                isRead,
                initValue: "",
                style: { width: '180px' }
              },
            },
            {
              label: "政治面貌",
              type: "input",
              option: {
                prop: "politicalOutlook",
                isRead,
                initValue: "",
              },
            },

          ],
        },
        {
          type: "box",
          className: "flex flex-mid flex-wrap",
          children: [
            {
              label: "处室",
              type: "select",
              option: {
                prop: "depId",
                isRead,
                initValue: "",
              },
            },
            {
              label: "职位",
              type: "input",
              option: {
                prop: "position",
                isRead,
                initValue: "",
              },
            },
            {
              label: "职称",
              type: "input",
              option: {
                prop: "positionalTitles",
                isRead,
                initValue: "",
              },
            },

          ]
        },
        {
          type: "box",
          className: "flex flex-mid flex-wrap",
          children: [
            {
              label: "毕业院校",
              type: "input",
              option: {
                prop: "graduatedFrom",
                isRead,
                initValue: "",
              },
            },
            {
              label: "专业",
              type: "input",
              option: {
                prop: "major",
                isRead,
                initValue: "",
              },
            },
            {
              label: "学位",
              type: "select",
              option: {
                prop: "academicDegree",
                isRead,
                initValue: "",
                list: [
                  { value: 1, label: '无' },
                  { value: 2, label: '学士' },
                  { value: 3, label: '硕士' },
                  { value: 4, label: '博士' },
                ]
              },
            },
          ]
        },
        {
          label: "主持或完成的项目",
          type: "input",
          option: {
            prop: "project",
            type: 'textarea',
            isRead,
            initValue: "",
            placeholder: '多个主持或完成的项目请用"；"来分隔',
            style: { width: '820px' }
          },
        },
        {
          label: "奖项及荣誉",
          type: "input",
          option: {
            prop: "honors",
            type: 'textarea',
            isRead,
            initValue: "",
            placeholder: '多个奖项及荣誉请用"；"来分隔',
            style: { width: '820px' }
          },
        },
      ];
      this.form = { ...this.form, ...this.initForm(this.formList) };
    },
    getJS() {
      this.$global.loading = true
      ajax({ url: "/role" })
        .then(({ data }) => {
          const { list } = data;
          this.list.roleList = list.map(({ id, roleName }) => ({ value: id, label: roleName }));
        })
        .finally(() => {
          this.$global.loading = false
        });
    },
    handleConfirm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { password, checkPassword } = this.form
          if (this.id) {
            const { id, avatar, nickName, phone } = this.form
            const data = { id, avatar, nickName, phone };
            this.submit(data);
          } else if (password === checkPassword) {
            const data = { ...this.form };
            this.submit(data);
          } else {
            this.$notify.warning('2次密码不一致')
          }

        } else {
          this.$notify.warning("必填项未填写完整，请检查！");
          return false;
        }
      });
    },
  },
};
</script>
