import { request } from "@/network/request";

// 查找文档，团队，用户
export function searchDoc(userID,searchText) {
  return request({
    url: "/searchDoc",
    params: {
      userID,
      searchText
    },
    method: "post"
  });
}

export function searchTeam(userID,searchText) {
  return request({
    url: "/searchTeam",
    params: {
      userID,
      searchText
    },
    method: "post"
  });
}

export function searchTeamMember(teamID,searchText) {
  return request({
    url: "/searchTeamMember",
    params: {
      teamID,
      searchText
    },
    method: "post"
  });
}

export function searchOutsideUser(teamID,searchText) {
  return request({
    url: "/searchOutSideUser",
    params: {
      teamID,
      searchText
    },
    method: "post"
  });
}
