<template>
  <div>
    <div id="header">
      <img id="logo" src="@/assets/logo.jpg" />
      <div id="title"></div>
      <h2 id="title">威软后台管理平台</h2>
      <div id="bg_blue"></div>
    </div>
    <div id="body">
      <!--
      <img
        style="width:100vw;height:100vh;position:fixed;top:0px;left:0px;"
        src=""
      />
    -->
      <div id="loginBox">
        <h3 id="loginTitle">账号登陆</h3>
        <div id="sliceLine"></div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          style="position: absolute; top: 100px; left: -56px"
        >
          <el-form-item prop="pass">
            <el-input
              v-model="loginName"
              type="text"
              placeholder="账号"
              autocomplete="off"
              style="width: 260px"
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              type="password"
              v-model="password"
              placeholder="密码"
              autocomplete="off"
              style="width: 260px"
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              v-model="theCode"
              type="text"
              placeholder="验证码"
              autocomplete="off"
              style="width: 130px"
            ></el-input>
            <img
              @click="changeCode"
              style="
                position: absolute;
                top: 0px;
                width: 110px;
                height: 40px;
                radius: 10px;
                left: 150px;
              "
              :src="src_pic"
            />
          </el-form-item>
          <el-form-item>
            <el-button id="button" type="primary" @click="log_in()"
              >登&nbsp;&nbsp;陆</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div id="bottom"></div>
  </div>
</template>
<script>
import { getPic, logIn } from "@/api/login.js";

export default {
  data() {
    return {
      src_pic: "",
      theCode: "",
      password: "",
      loginName: "",
    };
  },

  created() {
    this.obj = JSON.parse(this.obj);
  },

  mounted() {
    /* this.$cookie.remove('token'); */
    //获取验证码
    const self = this;
    getPic()
      .then(function (response) {
        self.src_pic =
          "data:image/png;base64," +
          btoa(
            new Uint8Array(response.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ""
            )
          );
      })

      .catch(function (error) {
        console.log(error);
      });
  },

  methods: {
    changeCode() {
      const self = this;
      getPic()
        .then(function (response) {
          self.src_pic =
            "data:image/png;base64," +
            btoa(
              new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            );
        })

        .catch(function (error) {
          console.log(error);
        });
    },
    log_in() {
      this.$router.push("/homePage");
      let data = {
        code: this.theCode,
        loginName: this.loginName,
        password: this.password,
      };
      logIn(data)
        .then((res) => {
          console.log(res);
          this.$message(res.data.message);
          //this.$router.push("/homePage");
          if (res.data.message == "操作成功") {
            this.$cookie.set("loginName", this.loginName);
            this.$cookie.set("token", res.data.data.token);
            //this.$router.push("/homePage");
          }
        })
        .catch((err) => {
          console.log(err);
        });
      this.changeCode();
    },
  },
};
</script>
<style  scoped>
#loginBox {
  width: 350px;
  height: 360px;
  background-color: white;
  z-index: 3;
  position: relative;
  left: calc(50vw - 175px);
  top: 23vh;
  -moz-border-radius: 25px;
  border: 2px solid;
  border-radius: 12px;
  border-color: black;
}
#bg_blue {
  position: absolute;
  top: 0px;
  right: -10vw;
  background-color: rgb(18, 82, 151);
  height: 90px;
  width: 85vw;
  transform: skew(-45deg);
}
#header {
  z-index: 2;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 90px;
  background-color: white;
  border: 1px;
  overflow: hidden;
}
#logo {
  height: 90px;
  width: 160px;
  position: absolute;
  left: 13vw;
  top: 0px;
}
#title {
  position: absolute;
  left: 28vw;
  top: 5px;
  font-family: "黑体";
  font-size: 30px;
  color: rgb(233, 233, 233);
  font-weight: 300;
  z-index: 3;
}
#loginTitle {
  font-family: "黑体";
  font-weight: 300;
  font-size: 20px;
  position: absolute;
  top: 10px;
  text-align: center;
  left: 130px;
}
#sliceLine {
  background-color: rgb(239, 239, 239);
  position: absolute;
  top: 70px;
  left: 30px;
  width: 285px;
  height: 2px;
}
#button {
  width: 260px;
  background-color: rgb(31, 111, 197);
  transition: all ease 0.3s;
  -webkit-transition: all ease 0.3s;
}
#button:hover {
  background-color: rgb(42, 134, 231);
  transition: all ease 0.3s;
  -webkit-transition: all ease 0.3s;
}
#bottom {
  width: 100vw;
  height: 7vh;
  position: fixed;
  bottom: 0px;
  z-index: 3;
  background-color: white;
  text-align: center;
  font-size: 0.7em;
}
</style>
