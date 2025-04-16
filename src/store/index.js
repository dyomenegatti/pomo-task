import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: "light",
    todos: [],
    taskIdCounter: 1,
    searchKeydown: '',
    showCompledted: false,
    showFavorites: false,
  },
  getters: {
    currentTheme: (state) => state.theme,
    todos: state => state.todos,
    showCompleted: state => state.todos,
    showFavorites: state => state.todos,
    filteredTodos: (state) => {
      let filtered = state.todos;

      if (state.searchKeydown) {
        filtered = filtered.filter(task =>
          task.name.toLowerCase().includes(state.searchKeydown.toLowerCase())
        );
      }

      if(state.showCompledted) {
        filtered = filtered.filter(task => task.checked);
      }

      if(state.showFavorites) {
        filtered = filtered.filter(task => task.favorite);
      }

      filtered = filtered.sort((a, b) => {
        return a.checked - b.checked;
      })

      return filtered;
    },
  },
  mutations: {
    TOGGLE_THEME(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
    LIST_TASKS(state) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      state.todos = tasks;
      state.taskIdCounter = tasks.length ? tasks[tasks.length - 1].id + 1 : 1;
    },
    ADD_TASK(state, payload) {
      payload.id = state.taskIdCounter;
      state.todos.push(payload);
      state.taskIdCounter++;

      localStorage.setItem('tasks', JSON.stringify(state.todos));
    },
    REMOVE_TASK(state, payload) {
      state.todos = state.todos.filter(task => task.id !== payload);
      localStorage.setItem('tasks', JSON.stringify(state.todos));
    },
    EDIT_TASK(state, payload) {
      const taskIndex = state.todos.findIndex(task => task.id === payload.id);
      if(taskIndex !== -1) {
        Vue.set(state.todos, taskIndex, { ...state.todos[taskIndex], ...payload});
        localStorage.setItem('tasks', JSON.stringify(state.todos));
      }
    },
    SET_SEARCH_KEYWORD(state, keyword) {
      state.searchKeydown = keyword;
    },
    SET_FAVORITE(state, payload) {
      const taskIndex = state.todos.findIndex(task => task.id === payload.id);
      if (taskIndex !== -1) {
        const isFavorite = state.todos[taskIndex].favorite || false;
        Vue.set(state.todos, taskIndex, { ...state.todos[taskIndex], favorite: !isFavorite });
        localStorage.setItem('tasks', JSON.stringify(state.todos));
      }
    },
    SET_CHECK(state, payload) {
      const taskIndex = state.todos.findIndex(task => task.id === payload.id);
      if(taskIndex !== -1) {
        const isChecked = state.todos[taskIndex].checked || false;
        Vue.set(state.todos, taskIndex, { ...state.todos[taskIndex], checked: !isChecked });
        localStorage.setItem('tasks', JSON.stringify(state.todos));
      }
    },
    SET_SHOW_COMPLETED(state, value) {
      state.showCompledted = value;
    },
    SET_SHOW_FAVORITE(state, value) {
      state.showFavorites = value;
    },
    CLEAR_FILTERS(state) {
      state.searchKeydown = '';
      state.showFavorites = false;
      state.showCompledted = false;
    },
  },
    actions: {
    toggleTheme({ commit }) {
      commit("TOGGLE_THEME");
    },
    listTasks({ commit }) {
      commit('LIST_TASKS');
    },
    toggleAddTask({ commit }, payload) {
      commit('ADD_TASK', payload);
    },
    toggleRemoveTask({ commit }, payload) {
      commit('REMOVE_TASK', payload);
    },
    toggleEditTask({ commit }, payload) {
      commit('EDIT_TASK', payload);
    },
    setSearchKeyword({ commit }, keyword) {
      commit('SET_SEARCH_KEYWORD', keyword);
    },
    setFavorite({ commit }, payload) {
      commit('SET_FAVORITE', payload);
    },
    setCheck({ commit }, payload) {
      commit('SET_CHECK', payload);
    },
    setShowCompleted({ commit }, value) {
      commit('SET_SHOW_COMPLETED', value);
    },
    setShowFavorite({ commit }, value) {
      commit('SET_SHOW_FAVORITE', value);
    },
    clearFilters({ commit }) {
      commit('CLEAR_FILTERS');
    },
  },
  modules: {},
});
