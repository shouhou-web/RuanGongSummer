import {request} from "@/network/request";

export function getMyTeam(userID) {
  return request({
    url: "/getMyTeam",
    params: {
      userID
    },
    method: 'post'
  })
}

export function getTeamDocs(teamID) {
  return request({
    url: "/getTeamDocs",
    params: {
      teamID
    },
    method: 'post'
  })
}

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

export function disbandTeam(teamID) {
  return request({
    url: "/disbandTeam",
    params: {
      teamID
    },
    method: 'post'
  })
}







