import { request } from "@/network/request";

// 修改昵称
export function setUserName(userID, userName) {
  console.log(userID,userName)
  return request({
    url: "/setUserName",
    params: {
      userID,
      userName
    },
    method: "post"
  });
}

// 修改密码
export function setUserPassword(userID, userPassWord) {
  return request({
    url: "/setUserPassword",
    params: {
      userID,
      userPassWord
    },
    method: "post"
  });
}

// 修改邮箱地址
export function setEmailAddress(userID, emailAddress) {
  return request({
    url: "/setEmailAddress",
    params: {
      userID,
      emailAddress
    },
    method: "post"
  });
}
