<template>
    <v-col cols="12" md="1">
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
                <listForm v-if="isListsChecked" @add="addNew"></listForm>
                <noteForm v-else @add="addNew"></noteForm>
            </v-dialog>
        </div>
    </v-col>
</template>

<script>
import listForm from "./todoLists/ListForm";
import noteForm from "./notes/NoteForm";

export default {
    data() {
        return {
            dialog: false
        };
    },
    computed: {
        isListsChecked() {
            return this.$store.state.isListsChecked;
        }
    },
    components: {
        listForm,
        noteForm
    },
    methods: {
        addNew(name, text) {
            this.$emit("add-new", name, text);
            this.dialog = false;
        }
    }
};
</script>
