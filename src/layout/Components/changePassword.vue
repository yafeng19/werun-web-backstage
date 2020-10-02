<template>
  <transition name="fade">
    <div class="wrap">
      <div id="theDialog">
        <h3 style="margin:20px 20px; ;font-weight:300;font-family:'黑体'" >更改密码</h3>
       
        <div style="width:100%;margin-left:0px; background-color:rgb(244,244,244); height:1px;"></div>
        <el-row :gutter="20">
          <el-col :span="10" :offset="1">
            <div class="sub-title">账号：</div>
            <el-input style="width:250px;size:'mini'" v-model="form.loginNme"></el-input>
          </el-col>
          <el-col :span="10" :offset="1">
            <div class="sub-title">旧密码：</div>
            <el-input style="width:240px;size:'mini'" v-model="form.oldPassword"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :offset="1">
            <div class="sub-title">新密码：</div>
            <el-input style="width:250px;size:'mini'" v-model="form.newPassword"></el-input>
          </el-col>
          <el-col :span="10" :offset="1">
            <div class="sub-title">确认新密码：</div>
            <el-input style="width:240px;size:'mini'" v-model="newPassword2"></el-input>
          </el-col>
        </el-row>
        
      
        <el-row :gutter="20">
          <el-col :span="15" :offset="14">
            <el-button style="width:86px;" @click="close">关闭</el-button>
            <el-button style="width:86px;" type="primary" @click="saveData">保存</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </transition>
</template>
  <script>
/*import { editRole } from "@/api/roleList.js";*/
/* import {changeInfo } from '@/api/login.js'; */
import {changePassword } from '@/api/login.js';

export default {
  data() {
    return {
      newPassword2:'',
      dialogFormVisible: false,
      form: {
  loginNme:'',
  oldPassword:'',
  newPassword:''
},
      formLabelWidth: "110px",
      type: ""
    };
  },
  props: {
   
   
   
  },

  methods: {
    saveData() {

      if(this.form.newPassword==this.newPassword2){
          changePassword(this.form).then(res=>{
              console.log(res);
              this.$message(res.data.message);
              this.close();
          })
      }else{
          this.$message('请确认新密码！');
      }

      
    },
    close() {
      this.$emit("closeDialog", false);
      this.newPassword2 = '';
      this.form = {
        loginNme:'',
  oldPassword:'',
  newPassword:''
      };
    }
  }
};
</script>
  <style scoped>
#theDialog {
  position: fixed;
  left: 33%;
  top: 14vh;

  width: 600px;
  background-color: white;

  z-index: 6;
  border: solid 1px rgb(244, 244, 244);
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
</style>