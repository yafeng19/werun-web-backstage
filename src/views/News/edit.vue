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
          {{ type }}新闻
        </div>
        <div
          style="
            width: 100%;
            margin-left: 0px;
            background-color: rgb(240, 240, 240);
            height: 1px;
          "
        ></div>
        <el-row :gutter="20">
          <el-col :span="10" :offset="1">
            <div class="sub-title">新闻标题：</div>
            <el-input
              style="width: 250px; size: 'mini'"
              v-model="form.title"
            ></el-input>
          </el-col>
          <el-col :span="10" :offset="1">
            <div class="sub-title">图片地址：</div>
            <el-input
              style="width: 240px; size: 'mini'"
              v-model="form.picUrl"
            ></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :offset="1">
            <div class="sub-title">新闻时间：</div>
            <el-input
              style="width: 240px; size: 'mini'"
              v-model="form.newsDate"
            ></el-input>
          </el-col>
          <el-col :span="10" :offset="1">
            <div class="sub-title">新闻简介：</div>
            <el-input
              style="width: 240px; size: 'mini'"
              v-model="form.briefIntro"
            ></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20" :offset="1">
            <div class="sub-title">正文：</div>
            <el-input
              class="resizeNone"
              type="textarea"
              :autosize="{ minRows: 3, maxRows: 5 }"
              style="width: 500px"
              resize="none"
              v-model="form.context"
            ></el-input>
          </el-col>
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
    id: "",
  },
  created() {},
  methods: {
    saveData() {
      if (this.type == "添加") {
        this.$axios({
          url: "/news/addNews",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            title: this.form.title,
            picUrl: this.form.picUrl,
            newsDate: this.form.newsDate,
            context: this.form.context,
            briefIntro: this.form.briefIntro,
          },
        }).then((res) => {
          // console.log(res);
          this.$message(res.data.message);
          this.$emit("confirm");
        });
      } else {
        this.$axios({
          url: "/news/updateNews?id=" + this.id,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          /*
          params: {
            id: this.id,
          },*/
          data: JSON.stringify({
            title: this.form.title,
            picUrl: this.form.picUrl,
            newsDate: this.form.newsDate,
            context: this.form.context,
            briefIntro: this.form.briefIntro,
          }),
        }).then((res) => {
          // console.log(res);
          this.$message(res.data.message);
          this.$emit("confirm");
        });
      }
    },

    close() {
      this.$emit("closeDialog", false);
      this.form = {
        title: "",
        picUrl: "",
        newsDate: "",
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
.sub-title {
  font-weight: normal;
  font-size: 15px;
}
</style>
<style>
.resizeNone >>> .el-input__inner {
  resize: none;
}
</style>

