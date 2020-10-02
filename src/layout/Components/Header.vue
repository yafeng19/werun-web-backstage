<template>
  <div id="header_wrap">
    <img id="logo" src="@/assets/logo.jpg" />
    <h3 id="title">威软后端管理平台</h3>
    <div id="bg_blue"></div>
    <span
      class="guide"
      style="
        color: white;
        font-size: 25px;
        top: 13px;
        position: absolute;
        right: 6px;
      "
    >
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color=" rgb(18, 82, 151)"
        text-color="white"
        active-text-color="white"
      >
        <!--  {{loginName}} -->
        <el-submenu index="2">
          <template style="" slot="title">
            <span style="font-size: 20px">&nbsp;{{ loginName }}</span>
          </template>
          <el-menu-item index="2-1" @click="edit_info">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i class="el-icon-user" style="color: white"></i>个人信息
          </el-menu-item>
          <!-- <span style="font-size:25px;"><i class="el-icon-s-tools" style="color:white;" ></i></span> -->
          <el-menu-item index="2-2" @click="changePassword">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i class="el-icon-edit" style="color: white"></i>更改密码
          </el-menu-item>
          <el-menu-item index="2-3" @click="exist">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <i class="el-icon-switch-button" style="color: white"></i>退出
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </span>
    <span
      style="
        color: white;
        font-size: 30px;
        top: 19px;
        position: absolute;
        right: 20px;
      "
    ></span>
    <theDialog
      v-show="dialogVisible"
      :type="type"
      @closeDialog="this.closeDialog"
    ></theDialog>
    <changePassword
      v-show="passwordVisible"
      @closeDialog="this.closeDialog"
    ></changePassword>
  </div>
</template>
<script>
import { changeInfo } from "@/api/login.js";
import { removeToken } from "@/utils/app.js" /*  */;
import theDialog from "./header_dialog.vue";
import changePassword from "./changePassword.vue";

export default {
  data() {
    return {
      dialogVisible: false,
      loginName: this.$cookie.get("loginName"),
      type: "",
      passwordVisible: false,
    };
  },
  components: {
    theDialog,
    changePassword,
  },
  methods: {
    edit_info() {
      this.type = "修改个人信息";
      this.dialogVisible = true;
    },
    changePassword() {
      this.passwordVisible = true;
    },
    closeDialog(val) {
      this.passwordVisible = false;
      this.dialogVisible = val;
    },
    open_alert() {
      this.$confirm("是否确认退出登陆?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "退出登陆成功!",
          });
          if (type == "success") {
            this.exist();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    exist() {
      removeToken();
      this.$axios.post("/user/logout", {}).then((res) => console.log(res));
      this.$message("已退出登陆！");
      this.$router.push("./logIn");
    },
  },
};
</script>
<style scoped>
#bg_blue {
  position: absolute;
  top: 0px;
  right: -100px;
  background-color: rgb(18, 82, 151);
  height: 70px;
  width: 45vw;
  transform: skew(-45deg);
}
#header_wrap {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 70px;
  background-color: white;
  z-index: 1;

  overflow: hidden;
}
#logo {
  height: 70px;
  width: 125px;
  position: absolute;
  left: 43px;
  top: 0px;
}
#title {
  position: absolute;
  left: 290px;
  top: 0px;
  font-family: "黑体";
  font-size: 1.5em;
}
</style>

<style >
.guide .el-submenu__title:hover {
  background-color: rgb(18, 82, 151) !important;
}
</style>


