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
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height"
                   fluid>
        <v-row justify="1">
          <v-col lg="3" md="4">
            <v-card elevation="7">
              <v-card-title>Title</v-card-title>
              <v-card-text>Text</v-card-text>
            </v-card>
          </v-col>
          <v-col lg="3" md="4">
            <v-card elevation="7">
              <v-card-title>Title</v-card-title>
              <v-card-text>Text</v-card-text>
            </v-card>
          </v-col>
          <v-col lg="3" md="4">
            <v-card elevation="7">
              <v-card-title>Title</v-card-title>
              <v-card-text>Text</v-card-text>
            </v-card>
          </v-col>
          <v-col lg="3" md="4">
            <v-card elevation="7">
              <v-card-title>Title</v-card-title>
              <v-card-text>Text</v-card-text>
            </v-card>
          </v-col>
          <v-col lg="3" md="4">
            <v-card class="pa-8" elevation="7">
              <v-icon>mdi-plus-circle</v-icon>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'container',
  props: {
    source: String
  },
  data: () => ({
    drawer: null
  }),
  created () {
    this.$vuetify.theme.dark = true
  }
}
</script>
