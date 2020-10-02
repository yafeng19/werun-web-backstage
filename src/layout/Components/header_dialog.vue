<template>
  <transition name="fade">
    <div class="wrap">
      <div id="theDialog">
        <h3 style="margin:20px 20px; ;font-weight:300;font-family:'黑体'" >修改个人信息</h3>
       
        <div style="width:100%;margin-left:0px; background-color:rgb(244,244,244); height:1px;"></div>
        <el-row :gutter="20">
          <el-col :span="10" :offset="1">
            <div class="sub-title">用户名：</div>
            <el-input style="width:250px;size:'mini'" v-model="form.username"></el-input>
          </el-col>
          <el-col :span="10" :offset="1">
            <div class="sub-title">id：</div>
            <el-input style="width:240px;size:'mini'" v-model="form.id"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :offset="1">
            <div class="sub-title">联系电话：</div>
            <el-input style="width:250px;size:'mini'" v-model="form.phoneNumber"></el-input>
          </el-col>
          <el-col :span="10" :offset="1">
            <div class="sub-title">真实姓名</div>
            <el-input style="width:240px;size:'mini'" v-model="form.realName"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :offset="1">
            <div class="sub-title">e-mail：</div>
            <el-input style="width:250px;size:'mini'" v-model="form.email"></el-input>
          </el-col>
          <el-col :span="10" :offset="1">
            <div class="sub-title">角色：</div>
            <el-input style="width:240px;size:'mini'" v-model="form.roles[0]"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="10" :offset="1">
            <div class="sub-title">地址：</div>
            <el-input style="width:250px;size:'mini'" v-model="form.address"></el-input>
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
import {changeInfo } from '@/api/login.js';

export default {
  data() {
    return {
      
      dialogFormVisible: false,
      form: {
  username:'',
  id: "",
  phoneNumber: "",
  realName: "",
  roles: [
    ""
  ],
  email: "",
  address:''
},
      formLabelWidth: "110px",
      type: ""
    };
  },
  props: {
    dialogFormVisible: Boolean,
    type: ""
  },

  methods: {
    saveData() {
      if(this.type=="修改个人信息"){
          changeInfo(this.form).then(res=>{
            console.log(res);
            this.$message(res.data.message);
            this.close();
          })
      }

      
    },
    close() {
      this.$emit("closeDialog", false);
      this.form = {
        username:'',
  id: "",
  phoneNumber: "",
  realName: "",
  roles: [
    ""
  ],
  email: "",
  address:''
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