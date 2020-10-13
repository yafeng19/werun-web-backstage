import service from "@/utils/request.js"

//获取新闻列表
export function getList() {
  return service.request({
    method: "GET",
    url: "/news/listNews",
    headers: {
      "Content-Type": "application/json"
    },
  })
}

//添加新闻信息
export function addNews(param) {
  return service.request({
    method: "POST",
    url: "/news/addNews",
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
    url: "/news/deleteNews",
    headers: {
      "Content-Type": "application/json"
    },
    data: { id: id },
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