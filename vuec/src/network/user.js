import {request} from "@/network/request";

export function login(username, password) {
  return request({
    url: "/login",
    params: {
      username,
      password
    },
    method: 'post'
  })
}

export function register(username, password, password2, emailAddress) {
  return request({
    url: "/signUp",
    params: {
      username,
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
