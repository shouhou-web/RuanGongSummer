const mutations = {
  // 全局加载
  showLoading(state) {
    state.fullscreenLoading = true;
  },
  hideLoading(state) {
    state.fullscreenLoading = false;
  },
  // 登录
  login(state, info) {
    console.log(info)
    state.token = true
    state.user = info
  },
  // 登出
  logout(state) {
    state.token = false
    state.user = {}
  },
  // profile相关修改
  setImagePath(state, imagePath) {
    state.user.imagePath = imagePath;
  },
  setUserName(state,userName) {
    state.user.userName = userName
  },
  setPassword(state,userPassword) {
    state.user.userPassword = userPassword
  }
};

export default mutations;
