import Vue from "vue";
import Vuex from "vuex";

import { users } from "./mockData";

Vue.use(Vuex);

const INITIAL_STATE = {
  users,
  selectedTask: null
};

const store = new Vuex.Store({
  state: {
    ...INITIAL_STATE
  },
  getters: {
    getUsers: state => state.users,
    getSelectedTask: state => state.selectedTask
  },
  actions: {},
  mutations: {
    setSelectedTask(state, payload) {
      state.selectedTask = payload;
    },
    saveTask(state, payload) {
      const userIndex = state.users.findIndex(
        user => user.id === payload.userId
      );
      const taskIndex = state.users[userIndex].tasks.findIndex(
        task => task.id === payload.id
      );

      Vue.set(state.users[userIndex].tasks, taskIndex, payload);
      state.selectedTask = payload;
    }
  }
});

export default store;
