import service from "@/utils/request.js"


//获取轮播图列表
export function getList() {
  return service.request({
    method: "GET",
    /*//get请求  请求数据以地址形式表示 拼接字符串
    url: "/system/manager/getManagerList?page=" + page + "&limit=" + limit + "&keyword=" + keyword,
    */
    url: "werun/rotationChart/listRotationChart",
    headers: {
      "Content-Type": "application/json"
    },
  })
}


/*
//编辑轮播图信息
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

//添加轮播图信息
export function addRotationChart(param) {
  return service.request({
    method: "POST",
    url: "/werun/rotationChart/addRotationChart",
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(param),
  })
}

//删除轮播图
export function deleteRotationChart(id) {
  return service.request({
    method: "DELETE",
    url: "/werun/rotationChart/deleteRotationChart",
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(id),
  })
}
