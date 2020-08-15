import {request} from "@/network/request";

// 登录
export function login(name, password) {
  return request({
    url: "/login",
    params: {
      name,
      password
    },
    method: 'post'
  })
}

// 注册
export function register(name, password, password2, emailAddress) {
  return request({
    url: "/signUp",
    params: {
      name,
      password,
      password2,
      emailAddress
    },
    method: 'post'
  })
}

// 获取验证码
export function emailVerification(emailAddress) {
  return request({
      url: "/emailVerification",
      params: {
        emailAddress
      },
      method: 'post'
    }
  )
}

// 重置密码
export function resetPwd(emailAddress,password,password2) {
  return request(
    {
      url: "/resetPwd",
      params: {
        emailAddress,
        password,
        password2
      },
      method: 'post'
    }
  )
}


// 修改昵称
export function setUserName(userID, userName) {
  console.log(userID, userName);
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
export function setUserPassword(userID, userPassword) {
  console.log(userID, userPassword);
  return request({
    url: "/setUserPassword",
    params: {
      userID,
      userPassword
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

// 修改头像路径
export function setImagePath(userID, imagePath) {
  return request({
    url: "/setImagePath",
    params: {
      userID,
      imagePath
    },
    method: "post"
  });
}
