import { request } from "@/network/request";

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
export function acceptMember(userID, teamID, msgID) {
  return request({
    url: "/accpetMember",
    params: {
      userID,
      teamID,
      msgID
    },
    method: "post"
  });
}

// 拒绝他人申请
export function refuseMember(userID, teamID, msgID) {
  return request({
    url: "/refuseMember",
    params: {
      userID,
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
export function joinTeam(userID, teamID, msgID) {
  return request({
    url: "/joinTeam",
    params: {
      userID,
      teamID,
      msgID
    },
    method: "post"
  });
}

// 拒绝邀请
export function refuseTeam(userID, teamID, msgID) {
  return request({
    url: "/refuseTeam",
    params: {
      userID,
      teamID,
      msgID
    },
    method: "post"
  });
}
