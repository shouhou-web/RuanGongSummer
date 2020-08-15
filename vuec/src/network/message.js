import { request } from "@/network/request";

// 获取全部未读消息数量
export function getAllMsgNum(userID) {
  return request({
    url: "/getAllMsgNum",
    params: {
      userID
    },
    method: "post"
  });
}

// 获取团队消息和邀请消息
export function getCommonMsg(type, userID) {
  return request({
    url: "/getCommonMsg",
    params: {
      type,
      userID
    },
    method: "post"
  });
}

// 获取评论消息
export function getCommentMsg(userID) {
  return request({
    url: "/getCommentMsg",
    params: {
      userID
    },
    method: "post"
  });
}

// 获取系统消息
export function getSystemMsg(userID) {
  return request({
    url: "/getSystemMsg",
    params: {
      userID
    },
    method: "post"
  });
}

// 删除消息
export function deleteMsg(msgID) {
  return request({
    url: "/deleteMsg",
    params: {
      msgID
    },
    method: "post"
  });
}

// 申请加入团队
export function applyTeam(userID, targetTeamID, content) {
  return request({
    url: "/applyTeam",
    params: {
      userID,
      targetTeamID,
      content
    },
    method: "post"
  });
}

// 同意他人申请
export function acceptMember(userID, targetUserID, teamID, msgID) {
  return request({
    url: "/acceptMember",
    params: {
      userID,
      targetUserID,
      teamID,
      msgID
    },
    method: "post"
  });
}

// 拒绝他人申请
export function refuseMember(userID, targetUserID, teamID, msgID) {
  return request({
    url: "/refuseMember",
    params: {
      userID,
      targetUserID,
      teamID,
      msgID
    },
    method: "post"
  });
}

// 邀请加入团队
export function inviteMember(userID, teamID, targetUserID, content) {
  return request({
    url: "/inviteMember",
    params: {
      userID,
      teamID,
      targetUserID,
      content
    },
    method: "post"
  });
}

// 接受邀请
export function joinTeam(userID, targetUserID, teamID, msgID) {
  return request({
    url: "/joinTeam",
    params: {
      userID,
      targetUserID,
      teamID,
      msgID
    },
    method: "post"
  });
}

// 拒绝邀请
export function refuseTeam(userID, targetUserID, teamID, msgID) {
  return request({
    url: "/refuseTeam",
    params: {
      userID,
      targetUserID,
      teamID,
      msgID
    },
    method: "post"
  });
}
