<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer"
                         app
                         clipped>
      <v-list dense>
        <v-list-group value="false">
          <template v-slot:activator>
            <v-list-item-action>
              <v-icon>mdi-format-list-checkbox</v-icon>
            </v-list-item-action>
            <v-list-item-title>Todo lists</v-list-item-title>
          </template>

          <v-list-item>
            <v-switch label="Hide completed"></v-switch>
          </v-list-item>
          <v-list-item>
            <v-switch label="Show only important"></v-switch>
          </v-list-item>
        </v-list-group>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-pencil</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Notes</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app
               clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Tasks&Notes</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <notesAndLists></notesAndLists>
    </v-content>

    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
import notesAndLists from './NotesAndListsContainer'

export default {
  name: 'container',
  props: {
    source: String
  },
  components: {
    notesAndLists
  },
  data: () => ({
    drawer: null
  }),
  created () {
    this.$vuetify.theme.dark = true
  },
  methods: {
    addList () {

    }
  }
}
</script>
