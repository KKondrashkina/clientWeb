<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer"
                         app
                         clipped>
      <v-list>
        <v-list-item-group>
          <v-list-item to="/todoLists" @click="$store.commit('checkLists')">
            <v-list-item-action>
              <v-icon>mdi-format-list-checkbox</v-icon>
            </v-list-item-action>
            <v-list-item-title>Todo lists</v-list-item-title>
          </v-list-item>

          <v-switch v-if="isListsChecked"
                    class="ml-10"
                    v-model="isHideCompleted"
                    @change="$store.commit('showOrHide')"
                    label="Hide completed"></v-switch>

          <v-list-item to="/notes" @click="$store.commit('checkNotes')">
            <v-list-item-action>
              <v-icon>mdi-pencil</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Notes</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app
               clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Tasks&Notes</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer app>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'container',
  props: {
    source: String
  },
  computed: {
    isListsChecked () {
      return this.$store.state.isListsChecked
    },
    isHideCompleted () {
      return this.$store.state.isHideCompleted
    }
  },
  data: () => ({
    drawer: null
  }),
  created () {
    this.$vuetify.theme.dark = true
  },
  methods: {
  }
}
</script>
