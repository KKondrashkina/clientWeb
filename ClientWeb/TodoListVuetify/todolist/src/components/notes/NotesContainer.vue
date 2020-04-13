<template>
  <v-row v-if="!isListsChecked"
         align="center"
         class="pa-5">
    <template v-if="!isShowNote">
      <note v-for="item in notes"
            :key="item.id"
            :item="item"
            @delete-note="deleteNote"
            @open-note="openNote">
      </note>
      <nameDialog @add-new="addNewNote"></nameDialog>
    </template>

    <template v-else>
      <openedNote @show-notes="showNotes"
                  :item="openedNote"></openedNote>
    </template>
  </v-row>
</template>

<script>
import nameDialog from '../NameDialog'
import note from './Note'
import openedNote from './OpenedNote'

export default {
  data () {
    return {
      isShowNote: false,
      openedNote: {}
    }
  },
  computed: {
    isListsChecked () {
      return this.$store.state.isListsChecked
    },
    notes () {
      return this.$store.state.notes
    }
  },
  components: {
    nameDialog,
    note,
    openedNote
  },
  methods: {
    addNewNote (name) {
      this.$store.commit('addNewNote', name)
    },
    deleteNote (item) {
      this.$store.commit('deleteNote', item)
    },
    openNote (item) {
      this.isShowNote = true
      this.openedNote = item
    },
    showNotes () {
      this.isShowNote = false
    }
  }
}
</script>
