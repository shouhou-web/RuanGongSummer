import { request } from "@/network/request";

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
export function acceptMember(userID, teamID) {
  return request({
    url: "/accpetMember",
    params: {
      userID,
      teamID
    },
    method: "post"
  });
}

// 拒绝他人申请
export function refuseMember(userID, teamID) {
  return request({
    url: "/refuseMember",
    params: {
      userID,
      teamID
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
export function acceptMember(userID, teamID) {
    return request({
      url: "/accpetMember",
      params: {
        userID,
        teamID
      },
      method: "post"
    });
  }
