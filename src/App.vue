<template>
  <div id="app">
    <v-container grid-list-md>
      <v-layout row wrap>
        <v-flex xs12 md4>
          <List v-bind:users="getUsers" @taskSelect="onTaskSelect" />
        </v-flex>
        <v-flex xs12 md8
          ><Editor v-bind:task="getSelectedTask" @taskSave="onTaskSave"
        /></v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";
import store from "./store";
import { VContainer, VLayout, VFlex } from "vuetify/lib";
import List from "./components/List";
import Editor from "./components/Editor";

import { mapMutations, mapGetters } from "vuex";

Vue.use(Vuex);

export default {
  name: "app",
  store,
  components: {
    VContainer,
    VLayout,
    VFlex,
    List,
    Editor
  },
  computed: {
    ...mapGetters(["getSelectedTask", "getUsers"]),
  },
  methods: {
    ...mapMutations(["setSelectedTask", "saveTask"]),
    onTaskSelect(task) {
      this.setSelectedTask(task);
    },
    onTaskSave(formValues) {
      this.saveTask(formValues);
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
