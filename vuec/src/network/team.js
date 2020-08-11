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
