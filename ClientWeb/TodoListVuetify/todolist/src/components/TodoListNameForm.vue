<template>
  <v-card>
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-col cols="12"
                 md="10">
            <v-text-field v-model="name"
                          :rules="nameRules"
                          :counter="20"
                          label="Todo list name"
                          required></v-text-field>
          </v-col>
          <v-col md="2">
            <v-btn icon @click="addList">
              <v-icon>mdi-send</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    </v-card>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => v.length <= 20 || 'Name must be less than 20 characters'
    ]
  }),
  methods: {
    addList () {
      if (this.valid) {
        this.$emit('add-list', this.name)
        this.name = ''
      }
    }
  }
}
</script>
