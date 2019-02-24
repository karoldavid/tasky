<template>
  <v-card>
    <v-card-title>
      Users
    </v-card-title>
    <v-list>
      <v-list-group v-for="user in users" :key="user.id">
        <v-list-tile slot="activator">
          <v-list-tile-content>
            <v-list-tile-title>{{ user.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          v-for="task in user.tasks"
          :key="task.taskId"
          @click="onTaskSelect(task)"
        >
          <v-list-tile-content>
            <v-list-tile-sub-title
              >{{ task.name }} | {{ task.dueDate }}</v-list-tile-sub-title
            >
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
import {
  VCard,
  VCardTitle,
  VList,
  VListGroup,
  VListTile,
  VListTileTitle,
  VListTileSubTitle,
  VListTileContent
} from "vuetify/lib";

export default {
  name: "List",
  components: {
    VCard,
    VCardTitle,
    VList,
    VListGroup,
    VListTile,
    VListTileTitle,
    VListTileSubTitle,
    VListTileContent
  },
  props: {
    users: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onTaskSelect(task) {
      this.$emit("taskSelect", task);
    }
  }
};
</script>

<style></style>
