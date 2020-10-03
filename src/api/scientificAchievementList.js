import service from "@/utils/request.js"


//获取成果列表
export function getList() {
  return service.request({
    method: "GET",
    /*//get请求  请求数据以地址形式表示 拼接字符串
    url: "/system/manager/getManagerList?page=" + page + "&limit=" + limit + "&keyword=" + keyword,
    */
    url: "werun/scientificAchievement/listScientificAchievement",
    headers: {
      "Content-Type": "application/json"
    },
  })
}


/*
//编辑成果信息
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

//添加成果信息
export function addScientificAchievement(param) {
  return service.request({
    method: "POST",
    url: "/werun/scientificAchievement/addScientificAchievement",
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(param),
  })
}

//删除成果
export function deleteScientificAchievement(id) {
  return service.request({
    method: "DELETE",
    url: "/werun/scientificAchievement/deleteScientificAchievement",
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(id),
  })
}
