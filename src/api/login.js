import service from "@/utils/request.js"
import qs from "qs";

//获取验证码
export function getPic(){
   return service.request({
    method:"get",
    url:"/user/getCode",
    responseType: 'arraybuffer'
    })
}
//登陆
export function logIn(data){
    return service.request({
     method:"post",
     url:"/user/login",
     headers: {
        "Content-Type": "application/json"
    },
     
     data:JSON.stringify(data)  //两者名字相同的情况下可以写成一个
     })
 }



//用户注销
export function logOut(){
    return service.request({
     method:"post",
     url:"/user/logout",
     
     })
 }

//修改个人信息
export function changeInfo(data){
    return service.request({
     method:"post",
     url:"/user/updateInfo",
     headers: {
        "Content-Type": "application/json"
    },
     data:JSON.stringify(data)
     })
 }


//修改密码
export function changePassword(data){
    return service.request({
     method:"post",
     url:"/user/changePassword?loginName="+data.loginName+'&oldPassword='+data.oldPassword+'&newPassword='+data.newPassword,
     headers: {
        "Content-Type": "application/json"
    },
     data:JSON.stringify(data)
     })
 }







