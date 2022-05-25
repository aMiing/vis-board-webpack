<template>
  <div class="dialog-create">
    <!-- 新屏幕的信息录入表单弹窗 -->
    <el-dialog title="新建屏幕" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="屏幕名称" label-width="80">
          <el-input v-model="form.title" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "CreateDialog",
  data() {
    return {
      dialogFormVisible: false,
      form: {
        title: "",
      },
    };
  },
  methods: {
    create() {
      console.log("111");
      this.dialogFormVisible = true;
    },
    submit() {
      console.log('eee');
      this.$emit("submit", { ...this.form });
      this.dialogFormVisible = false;
    },
  },
};
</script>