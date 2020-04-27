<template>
    <v-card>
        <v-form v-model="valid"
                ref="form"
                onsubmit="return false;">
            <v-container>
                <v-row align="center">
                    <v-col cols="12"
                           md="10">
                        <v-text-field v-model="name"
                                    :rules="nameRules"
                                    :counter="20"
                                    label="Enter the name"
                                    required
                                    @blur="restValdation"
                                    @keypress.enter="add"></v-text-field>
                    </v-col>
                </v-row>
                <v-row class="d-flex align-end">
                    <v-col cols="12"
                           md="10">
                        <v-textarea auto-grow
                                    :rules="textRules"
                                    name="input-7-1"
                                    label="Note text"
                                    v-model="text"
                                    hint="Enter note text"></v-textarea>
                    </v-col>
                    <v-col sm="2" md="2">
                        <v-btn  icon
                               @click="add">
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
        name: "",
        text: "",
        nameRules: [
            v => !!v || "Name is required",
            v => v.length <= 20 || "Name must be less than 20 characters"
        ],
        textRules: [
            v => !!v || "Text is required"
        ]
    }),
    methods: {
        add() {
            this.$refs.form.validate();

            if (this.valid) {
                this.$emit("add", this.name, this.text);
                this.name = "";
                this.$refs.form.resetValidation();
            }
        },
        restValdation() {
            this.$refs.form.resetValidation();
        }
    }
};
</script>
