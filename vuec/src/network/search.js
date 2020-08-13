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

export function searchTeamMember(TeamID,searchText) {
  return request({
    url: "/searchTeamMember",
    params: {
      TeamID,
      searchText
    },
    method: "post"
  });
}

export function searchOutsideUser(TeamID,searchText) {
  return request({
    url: "/searchOutsideUser",
    params: {
      TeamID,
      searchText
    },
    method: "post"
  });
}
