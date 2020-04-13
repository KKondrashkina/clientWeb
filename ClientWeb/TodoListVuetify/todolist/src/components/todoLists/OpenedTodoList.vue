<template>
  <v-container class="pt-0">
    <v-col cols="12">
      <v-row class="py-0 mb-8" align="center">
         <v-btn color="grey darken-3"
                fab
                dark
                title="Back"
                @click="back">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
        <p class="display-1 font-weight-light ml-8 my-0" v-text="item.name"></p>
      </v-row>
      <task v-for="task in item.tasks" :key="task.id" :task="task" class="mx-9" @delete-task="deleteTask"></task>
      <v-form class="mx-9">
        <v-text-field v-model="taskText"
                        label="New task"
                        color="grey darken-0"
                        required
          auto-grow="true"
                        @blur="addTask">
            <v-icon slot="prepend">mdi-checkbox-blank-outline</v-icon>
          </v-text-field>
      </v-form>
    </v-col>
  </v-container>
</template>

<script>
import task from './Task'

export default {
  data: () => ({
    taskText: '',
    itemId: 0
  }),
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    task
  },
  methods: {
    addTask () {
      if (this.taskText !== '') {
        this.item.tasks.push({
          id: this.item.tasks[this.item.tasks.length - 1] ? this.item.tasks[this.item.tasks.length - 1].id + 1 : 0,
          text: this.taskText,
          isChecked: false
        })

        this.taskText = ''
      }
    },
    deleteTask (task) {
      this.item.tasks = this.item.tasks.filter(t => {
        return t.id !== task.id
      })
    },
    back () {
      this.$emit('show-lists')
    }
  }
}
</script>
