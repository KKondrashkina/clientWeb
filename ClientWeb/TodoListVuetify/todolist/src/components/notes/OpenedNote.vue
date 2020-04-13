<template>
  <v-container class="pt-0">
    <v-col cols="12">
      <v-row class="py-0 mb-8"
             align="center">
        <v-btn color="grey darken-3"
               fab
               dark
               title="Back"
               @click="back">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <p class="display-1 font-weight-light ml-8 my-0"
           v-text="item.name"></p>
      </v-row>
      <v-form class="mx-9">
        <v-textarea solo
                    auto-grow
                    name="input-7-1"
                    label="Note text"
                    v-model="item.text"
                    hint="Enter note text"></v-textarea>
      </v-form>
    </v-col>
  </v-container>
</template>

<script>
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
  methods: {
    back () {
      this.$emit('show-notes')
    }
  }
}
</script>
