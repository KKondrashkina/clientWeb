<template>
    <v-col cols="1">
        <div class="text-center">
            <v-dialog v-model="dialog"
                      width="500">
                <template v-slot:activator="{ on }">
                    <v-btn fab
                           dark
                           large
                           title="Add new"
                           color="grey darken-3"
                           v-on="on">
                      <v-icon dark>mdi-plus</v-icon>
                    </v-btn>
                </template>
                <nameForm @add="addNew"></nameForm>
            </v-dialog>
        </div>
    </v-col>
</template>

<script>
import nameForm from "./NameForm";

export default {
    data() {
        return {
            dialog: false
        };
    },
    components: {
        nameForm
    },
    methods: {
        addNew(name) {
            this.$emit("add-new", name);
            this.dialog = false;
        }
    }
};
</script>
