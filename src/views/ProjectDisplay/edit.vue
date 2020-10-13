<template>
  <transition name="fade">
    <div class="wrap">
      <div id="theDialog">
        <div
          style="
            margin: 20px 20px;
            text-align: center;
            font-weight: bold;
            font-family: '黑体';
            font-size: 20px;
          "
        >
          {{ type }}项目
        </div>
        <div
          style="
            width: 100%;
            margin-left: 0px;
            background-color: rgb(240, 240, 240);
            height: 1px;
          "
        ></div>
        <el-row class="full-row">
          <b class="sub-title">项目标题：&#8194;&#8194;</b>
          <el-input
            style="width: 300px; size: 'mini'"
            v-model="form.title"
          ></el-input>
        </el-row>
        <el-row class="full-row">
          <b class="sub-title">项目介绍：&#8194;&#8194;</b>
          <el-input
            style="width: 300px; size: 'mini'"
            v-model="form.context"
          ></el-input>
        </el-row>
        <el-row class="full-row">
          <b class="sub-title">项目照片：&#8194;&#8194;</b>
          <el-input
            style="width: 300px; size: 'mini'"
            v-model="form.picUrl"
          ></el-input>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="16" :offset="8">
            <el-button style="width: 86px" @click="close">关闭</el-button>
            <el-button style="width: 86px" type="primary" @click="saveData"
              >保存</el-button
            >
          </el-col>
        </el-row>
      </div>
    </div>
  </transition>
</template>
  <script>
import { addProject } from "@/api/projectList.js";

export default {
  data() {
    return {
      update_form: {},
      formLabelWidth: "110px",
    };
  },
  props: {
    dialogFormVisible: Boolean,
    form: {},
    type: "",
  },

  methods: {
    saveData() {
      this.$axios({
        url: "/proejct/addProject",
        method: "POST",
        data: {
          title: this.form.title,
          context: this.form.context,
          picUrl: this.form.picUrl,
        },
      }).then((res) => {
        console.log(res);
        this.$message(res.data.message);
      });
      this.close();
    },
    /*
    saveData() {
      if (this.type == "添加") {
        let param = {
          title: this.form.title,
          context: this.form.context,
          picUrl: this.form.picUrl,
        };
        addProject(param).then((res) => {
          console.log(res);
          this.$message(res.data.message);
        });
        this.close();
      } else {
        var rn = [];
        rn.push(this.title);
        this.$set(this.form, "project", rn);
        addProject(this.form).then((res) => {
          console.log(res);
          this.$message(res.data.message);
        });
        this.close();
      }
    },*/

    close() {
      this.$emit("closeDialog", false);
      this.form = {
        title: "",
        context: "",
        picUrl: "",
      };
    },
  },
};
</script>
  <style scoped>
#theDialog {
  position: fixed;
  left: 33%;
  top: 10vh;

  width: 550px;
  background-color: rgb(252, 252, 252);

  z-index: 3;
  border: solid 1px rgb(200, 200, 200);
  border-radius: 10px;
}
.el-row {
  margin-bottom: 20px;
  margin-top: 20px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.full-row {
  margin-top: 25px;
  margin-bottom: 25px;
  text-align: center;
}
.sub-title {
  font-weight: normal;
  font-size: 15px;
}
</style>

