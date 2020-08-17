import { request } from "@/network/request";

// 发表评论
//? replyID是被回复的评论的ID，没有传0
export function addComment(docID, userID, commentContent, replyID) {
  return request({
    url: "/addComment",
    params: {
      docID,
      userID,
      commentContent,
      replyID
    },
    method: 'post'
  })
}

// 获取文档全部评论
/*
  ?返回：对象列表List<CommentPlus>
  CommentPlus
  {
    commentID,
    userID,
    commentContent,
    createTime,
    userName,
    imagePath,
    reply(Object) --> replyID对应的CommentPlus对象（嵌套）
  }
  *异常返回空列表
 */
export function getDocComment(docID) {
  return request({
    url: "/getDocComment",
    params: {
      docID
    },
    method: 'post'
  })
}

// 获取用户全部评论
export function getUserComment(userID) {
  return request({
    url: "/getUserComment",
    params: {
      userID
    },
    method: 'post'
  })
}

// 删除评论
export function deleteComment(commentID) {
  return request({
    url: "/deleteComment",
    params: {
      commentID
    },
    method: 'post'
  })
}
