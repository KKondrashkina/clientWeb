<template>
  <v-row v-if="isListsChecked"
         align="center"
         class="pa-5">
    <template v-if="!isShowList">
      <todoList v-for="item in todoLists"
                :key="item.id"
                :item="item"
                @delete-list="deleteList"
                @open-list="openList">
      </todoList>
      <nameDialog @add-new="addNewList"></nameDialog>
    </template>

    <template v-else>
      <openedTodoList @show-lists="showLists"
                      :item="openedList">
      </openedTodoList>
    </template>
  </v-row>
</template>

<script>
import nameDialog from '../NameDialog'
import todoList from './TodoList'
import openedTodoList from './OpenedTodoList'

export default {
  data () {
    return {
      isShowList: false,
      openedList: {}
    }
  },
  computed: {
    isListsChecked () {
      return this.$store.state.isListsChecked
    },
    todoLists () {
      return this.$store.state.todoLists
    }
  },
  components: {
    nameDialog,
    todoList,
    openedTodoList
  },
  methods: {
    addNewList (name) {
      this.$store.commit('addNewList', name)
    },
    deleteList (item) {
      this.$store.commit('deleteList', item)
    },
    openList (item) {
      this.isShowList = true
      this.openedList = item
    },
    showLists () {
      this.isShowList = false
    }
  }
}
</script>
