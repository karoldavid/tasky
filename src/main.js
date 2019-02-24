import Vue from "vue";
import App from "./App.vue";

import Vuetify from "vuetify";
import "../node_modules/vuetify/src/stylus/app.styl";

import "vuetify/dist/vuetify.min.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

import "vue-trix";

Vue.use(Vuetify);

new Vue({
  render: h => h(App)
}).$mount("#app");
