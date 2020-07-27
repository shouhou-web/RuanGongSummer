import axios from 'axios'
import store from '../store/index'

// axios.defaults.baseURL = '/api'
// axios.defaults.headers.post['Content-Type'] = 'application/json';


export function request(config) {
  //1.创建axios的实例
  const instance = axios.create({
    // baseURL: '/api',
    baseURL:'http://39.99.154.244:8080',
    timeout: 5000
  })

  //2.axios拦截器
  //2.1 请求拦截
  instance.interceptors.request.use(config => {
    // console.log('来到了request拦截success中');
    // 1.当发送网络请求时, 在页面中添加一个loading组件, 作为动画

    // 2.某些请求要求用户必须登录, 判断用户是否有token, 如果没有token跳转到login页面

    // 3.对请求的参数进行序列化(看服务器是否需要序列化)
    // config.data = qs.stringify(config.data)
    // console.log(config);

    // 4.等等
    store.commit("showLoading");
    return config
  }, err => {
    // console.log('来到了request拦截failure中');
    return err
  })

  //2.2 响应拦截
  instance.interceptors.response.use(response => {
    //console.log('来到了response拦截success中');
    store.commit("hideLoading");
    return response.data
  }, err => {
    store.commit("hideLoading");
    console.log('来到了response拦截failure中');
    console.log(err);
    throw err
  })

  return instance(config);
}