import { request } from "@/network/request";
const qs = require('qs');

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

// 批量删除文档
export function docBatchDelete(docIDs,userID) {
  return request({
    url: "/docBatchDelete",
    params: {
      docIDs,
      userID
    },
    method: "post"
  })
}

// 批量收藏文档
export function docBatchFavorite(docIDs,userID) {
  return request({
    url: "/docBatchFavorite",
    params: {
      docIDs,
      userID
    },
    method: "post"
  })
}
