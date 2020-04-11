<template>
    <v-row align="center" class="pa-5">
      <template v-if="!isShowList">
        <todoList v-for="item in todoLists" :key="item.id" :item="item" @delete-list="deleteList" @open-list="open"></todoList>
        <dialogg @add-todo-list="addNewList"></dialogg>
      </template>
      <template v-else>
        <openedTodoList :item="openedList"></openedTodoList>
      </template>
    </v-row>
</template>

<script>
import dialogg from './Dialog'
import todoList from './TodoList'
import openedTodoList from './OpenedTodoList'

export default {
  data () {
    return {
      todoLists: [],
      itemId: 0,
      isShowList: false,
      openedList: {}
    }
  },
  components: {
    dialogg,
    todoList,
    openedTodoList
  },
  methods: {
    addNewList (name) {
      this.todoLists.push({
        id: this.itemId++,
        name: name,
        tasks: [{ text: '23423423' }, { text: 'werwe' }]
      })
    },
    deleteList (item) {
      this.todoLists = this.todoLists.filter(l => {
        return l.id !== item.id
      })
    },
    open (item) {
      this.isShowList = true
      this.openedList = item
    }
  }
}
</script>
