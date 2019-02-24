<template>
  <v-card>
    <v-card-title>
      Task Details
    </v-card-title>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      v-bind:style="{ margin: '20px' }"
    >
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Title"
        required
        :disabled="isDisabled"
      ></v-text-field>

      <v-menu
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        :return-value.sync="date"
        lazy
        transition="scale-transition"
        offset-y
        full-width
        min-width="290px"
      >
        <v-text-field
          :disabled="isDisabled"
          slot="activator"
          v-model="date"
          label="Due Date"
          prepend-icon="event"
          readonly
        ></v-text-field>
        <v-date-picker v-model="date" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
          <v-btn flat color="primary" @click="$refs.menu.save(date)">OK</v-btn>
        </v-date-picker>
      </v-menu>

      <VueTrix v-model="description" placeholder="Enter Task Description" />

      <v-card-actions v-bind:style="{ paddingLeft: 0 }">
        <v-btn
          :disabled="!valid || isDisabled || !hasChanged"
          color="success"
          class="red--text"
          primary
          @click="taskSave"
        >
          SAVE
        </v-btn>
      </v-card-actions>

      <v-snackbar
        v-model="snackbar"
        :bottom="y === 'bottom'"
        :left="x === 'left'"
        :multi-line="mode === 'multi-line'"
        :right="x === 'right'"
        :timeout="timeout"
        :top="y === 'top'"
        :vertical="mode === 'vertical'"
      >
        {{ message }}
        <v-btn color="pink" flat @click="snackbar = false">
          Close
        </v-btn>
      </v-snackbar>
    </v-form>
  </v-card>
</template>

<script>
import {
  VCard,
  VCardTitle,
  VCardActions,
  VForm,
  VTextField,
  VBtn,
  VMenu,
  VDatePicker,
  VSnackbar
} from "vuetify/lib";

export default {
  name: "Editor",
  components: {
    VCard,
    VCardTitle,
    VCardActions,
    VForm,
    VTextField,
    VBtn,
    VMenu,
    VDatePicker,
    VSnackbar
  },
  props: {
    task: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    element: null,
    snackbar: false,
    message: "Task Successfully Saved!",
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modal: false,
    valid: true,
    name: "",
    description: "",
    nameRules: [
      v => !!v || "Title is required",
      v => (v && v.length <= 20) || "Title must be less than 20 characters"
    ]
  }),
  computed: {
    dueDate: function() {
      return !this.task
        ? new Date().toISOString().substr(0, 10)
        : this.task.dueDate;
    },
    isDisabled: function() {
      return this.task === null;
    },
    hasChanged: function() {
      return (
        this.task.name !== this.name ||
        this.task.dueDate !== this.date ||
        this.task.description !== this.description
      );
    }
  },

  methods: {
    deleteEditorContent() {
      this.element.editor.setSelectedRange([0, this.description.length]);
      this.element.editor.deleteInDirection("forward");
    },
    addEditorContent() {
      this.element.editor.setSelectedRange([0, 0]);
      this.element.editor.insertHTML(this.description);
    },
    taskSave() {
      const formValues = {
        ...this.task,
        name: this.name,
        dueDate: this.date,
        description: this.description
      };
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.$emit("taskSave", formValues);
      }
    }
  },
  watch: {
    task: function() {
      if (this.description) this.deleteEditorContent();

      this.date = this.task.dueDate;
      this.name = this.task.name;
      this.description = this.task.description;

      if (this.description) this.addEditorContent();
    }
  },
  mounted() {
    this.element = document.querySelector("trix-editor");
  }
};
</script>
