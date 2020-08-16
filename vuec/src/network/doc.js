import { request } from "@/network/request";
const qs = require('qs');

// 新建文档
export function addDoc(userID, teamID) {
  return request({
      url: "/addDoc",
      params: {
          userID,
          teamID
      },
      method: 'post'
  })
}

// 获取文档内容
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


// 删除文档
export function deleteDoc(userID, docID) {
  return request({
    url: "/deleteDoc",
    params: {
      userID,
      docID
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

// 获取回收站的文档
export function getDeletedDocs(userID) {
  return request({
    url: "/getDeletedDocs",
    params: {
      userID
    },
    method: "post"
  });
}

// 获取最近使用的文档
export function getRecentDocs(userID) {
  return request({
    url: "/getRecentDocs",
    params: {
      userID
    },
    method: "post"
  });
}

// 恢复文档
export function recoverDoc(userID, docID) {
  return request({
    url: "/recoverDoc",
    params: {
      userID,
      docID
    },
    method: "post"
  });
}

// 批量恢复文档
export function docBatchRecover(docIDs, userID) {
  return request({
    url: "/docBatchRecover",
    params: {
      docIDs,
      userID
    },
    method: "post"
  })
}

// 收藏文档
export function collectDoc(userID, docID) {
  return request({
    url: "/collectDoc",
    params: {
      userID,
      docID
    },
    method: "post"
  });
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

// 获取收藏的文档
export function getFavoriteDocs(userID) {
  return request({
    url: "/getFavoriteDocs",
    params: {
      userID
    },
    method: "post"
  });
}

// 获取我的文档
export function getMyDocs(userID) {
  return request({
    url: "/getMyDocs",
    params: {
      userID
    },
    method: "post"
  });
}