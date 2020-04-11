<template>
  <v-container class="pt-0">
    <v-row>
      <v-col cols="12" class="py-0">
        <p class="display-1 font-weight-light ml-8 my-0" v-text="item.name"></p>
      </v-col>
      <v-col cols="12">
        <div v-for="task in item.tasks" :key="task.id">
        <v-checkbox class="mt-0" :label="task.text"></v-checkbox>
          </div>
        <v-form v-model="valid">
          <v-row cols="12" align="center">
            <v-col cols="10"
                   md="10">
              <v-text-field v-model="taskText"
                            :rules="nameRules"
                            :counter="20"
                            label="Todo list name"
                            color="grey darken-0"
                            required></v-text-field>
            </v-col>
            <v-col md="2">
              <v-btn icon @click="addTask">
                <v-icon>mdi-send</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    taskText: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 20 || 'Name must be less than 20 characters'
    ],
    itemId: 0
  }),
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    addTask () {
      this.item.tasks.push({
        id: this.itemId++,
        text: this.taskText
      })
    }
  }
}
</script>
