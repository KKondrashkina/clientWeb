<template>
  <v-col cols="1">
    <div class="text-center">
      <v-dialog v-model="dialog"
                width="500">
        <template v-slot:activator="{ on }">
          <v-btn fab dark large color="grey darken-3" v-on="on">
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </template>
        <nameForm @add-list="addTodoList"></nameForm>
      </v-dialog>
    </div>
    </v-col>
</template>

<script>
import nameForm from './TodoListNameForm'

export default {
  data () {
    return {
      dialog: false
    }
  },
  components: {
    nameForm
  },
  methods: {
    addTodoList (name) {
      this.$emit('add-todo-list', name)
      this.dialog = false
    }
  }
}
</script>
