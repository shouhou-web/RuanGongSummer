import { request } from "@/network/request";

// 获取团队
export function getDoc(userID, docID) {
  return request({
    url: "/getDoc",
    params: {
      userID,
      docID
    },
    method: "post"
  });
}

// 修改文档标题
export function editDocTitle(userID,docID,docTitle) {
  return request({
    url: "/editDocTitle",
    params: {
      userID,
      docID,
      docTitle
    },
    method: "post"
  });
}