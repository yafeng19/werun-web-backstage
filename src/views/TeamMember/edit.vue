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
          {{ type }}成员
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
            <div class="sub-title">姓名：</div>
            <el-input
              style="width: 250px; size: 'mini'"
              v-model="form.name"
            ></el-input>
          </el-col>
          <el-col :span="10" :offset="1">
            <div class="sub-title">年级：</div>
            <el-input
              style="width: 240px; size: 'mini'"
              v-model="form.grade"
            ></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :offset="1">
            <div class="sub-title">专业id：</div>
            <el-select
              style="width: 240px; size: 'mini'"
              v-model="majorValue"
              placeholder="请选择"
            >
              <el-option
                v-for="item in majorOptions"
                :label="item.majorLabel"
                :key="item.majorValue"
                :value="item.majorValue"
              >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="10" :offset="1">
            <div class="sub-title">职务id：</div>
            <el-select
              style="width: 240px; size: 'mini'"
              v-model="positionValue"
              placeholder="请选择"
            >
              <el-option
                v-for="item in positionOptions"
                :label="item.positionLabel"
                :key="item.positionValue"
                :value="item.positionValue"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :offset="1">
            <div class="sub-title">照片地址：</div>
            <el-input
              style="width: 500px; size: 'mini'"
              v-model="form.picUrl"
            ></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20" :offset="1">
            <div class="sub-title">成员简介：</div>
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
      majorOptions: [
        {
          majorValue: 1,
          majorLabel: "软件工程",
        },
        {
          majorValue: 2,
          majorLabel: "计算机",
        },
      ],
      positionOptions: [
        {
          positionValue: 1,
          positionLabel: "前端",
        },
        {
          positionValue: 2,
          positionLabel: "后端",
        },
      ],
      majorValue: "",
      positionValue: "",
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
          url: "/member/addMember",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            name: this.form.name,
            grade: this.form.grade,
            picUrl: this.form.picUrl,
            context: this.form.context,
            majorId: this.majorValue,
            positionId: this.form.positionValue,
          },
        }).then((res) => {
          // console.log(res);
          this.$message(res.data.message);
          this.$emit("confirm");
        });
      } else {
        this.$axios({
          url: "/member/updateMember?id=" + this.id,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          /*
          params: {
            id: this.id,
          },
          */
          data: {
            name: this.form.name,
            grade: this.form.grade,
            picUrl: this.form.picUrl,
            context: this.form.context,
            majorId: this.majorValue,
            positionId: this.positionValue,
          },
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
        name: "",
        grade: "",
        picUrl: "",
        context: "",
        majorValue: "",
        positionValue: "",
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

.resizeNone >>> .el-input {
  resize: none;
}
</style>
