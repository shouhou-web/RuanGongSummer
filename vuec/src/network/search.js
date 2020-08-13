import { request } from "@/network/request";

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
