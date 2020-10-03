import service from "@/utils/request.js"


//获取项目列表
export function getList() {
    return service.request({
        method: "GET",
        /*//get请求  请求数据以地址形式表示 拼接字符串
        url: "/system/manager/getManagerList?page=" + page + "&limit=" + limit + "&keyword=" + keyword,
        */
        url: "werun/project/pageProject",
        headers: {
            "Content-Type": "application/json"
        },
    })
}


/*
//编辑项目信息
export function editProjects(param) {
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

//添加项目信息
export function addProject(param) {
    return service.request({
        method: "POST",
        url: "/werun/proejct/addProject",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(param),
    })
}

//删除项目
export function deleteProject(id) {
    return service.request({
        method: "DELETE",
        url: "/werun/project/deleteProject",
        headers: {
            "Content-Type": "application/json"
        },
        data: JSON.stringify(id),
    })
}
