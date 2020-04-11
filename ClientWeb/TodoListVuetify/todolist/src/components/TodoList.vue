<template>
  <v-col lg="3" md="4">
    <v-card @click="open" elevation="7">
      <v-btn icon @click="remove">
        <v-icon small>mdi-close</v-icon>
      </v-btn>
      <v-card-title v-text="item.name">
      </v-card-title>
      <v-card-text>
        <p  v-for="task in item.tasks" :key="task.id"><v-icon>mdi-checkbox-blank-outline</v-icon><span class="ml-5">{{task.text}}</span></p>
        <p>...</p>
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

    }
  },
  components: {
    // 'contact': Contact
  },
  methods: {
    remove () {
      this.$emit('delete-list', this.item)
    },
    open () {
      this.$emit('open-list', this.item)
    }
  }
}
</script>
