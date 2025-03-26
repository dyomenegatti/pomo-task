import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: "light",
  },
  getters: {
    currentTheme: (state) => state.theme,
  },
  mutations: {
    TOGGLE_THEME(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
  actions: {
    toggleTheme({ commit }) {
      commit("TOGGLE_THEME");
    },
  },
  modules: {},
});
