import { request } from "@/network/request";

// 修改昵称
export function setUserName(userName) {
  return request({
    url: "/setUserName",
    params: {
      userName
    },
    method: "post"
  });
}

// 修改密码
export function setUserPassword(userPassWord) {
  return request({
    url: "/setUserPassword",
    params: {
      userPassWord
    },
    method: "post"
  });
}


// 修改邮箱地址
export function setEmailAddress(emailAddress) {
    return request({
      url: "/setEmailAddress",
      params: {
        emailAddress
      },
      method: "post"
    });
  }
  