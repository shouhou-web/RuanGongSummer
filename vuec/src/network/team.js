import {request} from "@/network/request";

// 获取用户团队
export function getMyTeam(userID) {
  return request({
    url: "/getMyTeam",
    params: {
      userID
    },
    method: 'post'
  })
}

// 获取团队文档
export function getTeamDocs(teamID) {
  return request({
    url: "/getTeamDocs",
    params: {
      teamID
    },
    method: 'post'
  })
}

// 新建团队
export function addTeam(userID, teamName) {
  return request({
    url: "/addTeam",
    params: {
      userID,
      teamName
    },
    method: 'post'
  })
}

// 获取用户权限
export function getUserIdentity(userID,teamID) {
  return request({
    url: "/getUserIdentity",
    params: {
      userID,
      teamID
    },
    method: 'post'
  })
}

// 退出团队
export function quitTeam(userID,teamID) {
  return request({
    url: "/quitTeam",
    params: {
      userID,
      teamID
    },
    method: 'post'
  })
}

// 解散团队
export function disbandTeam(teamID) {
  return request({
    url: "/disbandTeam",
    params: {
      teamID
    },
    method: 'post'
  })
}

// 获取团队用户集
export function getTeamMembers(teamID) {
  return request({
    url: "/getTeamMembers",
    params: {
      teamID
    },
    method: 'post'
  })
}

// 用户权限设置
export function setAdmin(userID,teamID,userIdentity) {
  return request({
    url: "/setAdmin",
    params: {
      userID,
      teamID,
      userIdentity
    },
    method: 'post'
  })
}



