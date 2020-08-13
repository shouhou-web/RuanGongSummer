import { request } from "@/network/request";

// 查找文档，团队，用户
export function searchAll(type, searchText) {
  return request({
    url: "/searchAll",
    params: {
      type,
      searchText
    },
    method: "post"
  });
}
