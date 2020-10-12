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
        <el-row class="full-row">
          <b class="sub-title">新闻标题：&#8194;&#8194;</b>
          <el-input
            style="width: 300px; size: 'mini'"
            v-model="form.title"
          ></el-input>
        </el-row>
        <el-row class="full-row">
          <b class="sub-title">新闻图片：&#8194;&#8194;</b>
          <el-input
            style="width: 300px; size: 'mini'"
            v-model="form.picUrl"
          ></el-input>
        </el-row>
        <el-row class="full-row">
          <b class="sub-title">新闻时间：&#8194;&#8194;</b>
          <el-input
            style="width: 300px; size: 'mini'"
            v-model="form.newsDate"
          ></el-input>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="16" :offset="8">
            <el-button style="width: 86px" @click="cancle">关闭</el-button>
            <el-button style="width: 86px" type="primary" @click="addNews"
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
      /*
      form: {
        title: "",
        picUrl: "",
        newsDate: "",
      },*/
      formLabelWidth: "110px",
    };
  },
  props: {
    dialogFormVisible: Boolean,
    form: {},
    type: "",
  },

  methods: {
    addNews() {
      this.$axios({
        url: "/news/addNews",
        method: "POST",
        params: {
          title: this.form.title,
          picUrl: this.form.picUrl,
          newsDate: this.form.newsDate,
          // context: this.form.context,
          // briefIntro: this.form.briefIntro,
        },
      }).then((res) => {
        console.log(res);
        this.$message(res.data.message);
        this.cancle();
      });
    },
  },

  cancle() {
    this.$emit("closeDialog", false);
    this.form = {
      title: "",
      picUrl: "",
      newsDate: "",
    };
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

