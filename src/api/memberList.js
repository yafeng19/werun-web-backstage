import service from "@/utils/request.js"


//获取成员列表
export function getList() {
  return service.request({
    method: "GET",
    /*//get请求  请求数据以地址形式表示 拼接字符串
    url: "/system/manager/getManagerList?page=" + page + "&limit=" + limit + "&keyword=" + keyword,
    */
    url: "werun/member/listMember",
    headers: {
      "Content-Type": "application/json"
    },
  })
}


/*
//编辑成员信息
export function editNewss(param) {
  return service.request({
    method: "POST",
    url: "",
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(param),
  })
}
*/

//添加成员信息
export function addMember(param) {
  return service.request({
    method: "POST",
    url: "/werun/member/addMember",
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(param),
  })
}

//删除成员
export function deleteMember(id) {
  return service.request({
    method: "DELETE",
    url: "/werun/member/deleteMember",
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(id),
  })
}
