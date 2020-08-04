const mutations = {
  // 全局加载
  showLoading(state) {
    state.fullscreenLoading = true;
  },
  hideLoading(state) {
    state.fullscreenLoading = false;
  },
  login(state, info) {
    console.log(info)
    state.token = true
    state.user = info
  },
  logout(state) {
    state.token = false
    state.user = {}
  },
};

export default mutations;
