export default {
  namespaced: true,
  state: {
    current: 'default'
  },
  mutations: {
    setTheme(state, theme) {
      state.current = theme
    }
  }
}