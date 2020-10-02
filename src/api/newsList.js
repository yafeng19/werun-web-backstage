import service from "@/utils/request.js"


//获取新闻列表
export function getList() {
  return service.request({
    method: "GET",
    /*//get请求  请求数据以地址形式表示 拼接字符串
    url: "/system/manager/getManagerList?page=" + page + "&limit=" + limit + "&keyword=" + keyword,
    */
    url: "werun/news/listNews",
    headers: {
      "Content-Type": "application/json"
    },
  })
}


/*
//编辑新闻信息
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

//添加新闻信息
export function addNews(param) {
  return service.request({
    method: "POST",
    url: "/werun/news/addNews",
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(param),
  })
}

//删除新闻
export function deleteNews(id) {
  return service.request({
    method: "DELETE",
    url: "/werun/news/deleteNews",
    headers: {
      "Content-Type": "application/json"
    },
    data: JSON.stringify(id),
  })
}
