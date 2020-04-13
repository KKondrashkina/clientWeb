<template>
  <v-col lg="3" md="4">
    <v-card @click="open"
            elevation="7">
      <v-dialog v-model="dialog"
                persistent
                max-width="290">
        <template v-slot:activator="{ on }">
          <v-btn title="Delete"
                 icon v-on="on">
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">Confirm Deletion</v-card-title>
          <v-card-text>Are you sure you want to delete this note?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red darken-1"
                   text
                   @click="dialog = false">Disagree</v-btn>
            <v-btn color="primary darken-1"
                   text
                   @click="remove">Agree</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-card-title v-text="item.name">
      </v-card-title>
      <v-card-text>
        <p v-text="item.text"></p>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    remove () {
      this.$emit('delete-note', this.item)
    },
    open () {
      this.$emit('open-note', this.item)
    }
  }
}
</script>
