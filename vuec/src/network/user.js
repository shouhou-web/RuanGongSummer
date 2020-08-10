import {request} from "@/network/request";

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
