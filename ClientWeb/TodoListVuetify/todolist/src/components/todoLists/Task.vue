<template>
    <v-row v-if="!isHideCompleted||!task.isChecked">
        <v-col cols="11" class="pa-0">
            <v-row class="ml-0">
                <v-checkbox :input-value="task.isChecked" color="grey darken-1" @change="done" class="mt-0"></v-checkbox>
                <span class="mt-1" v-text="task.text" :class="{'text--disabled': task.isChecked}"></span>
            </v-row>
        </v-col>
        <v-col cols="1" class="pa-0">
            <v-dialog v-model="dialog" persistent max-width="290">
                <template v-slot:activator="{ on }">
                    <v-btn title="Delete"
                           icon v-on="on">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="headline">Confirm Deletion</v-card-title>
                    <v-card-text>Are you sure you want to delete this task?</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red darken-1" text @click="dialog = false">Disagree</v-btn>
                        <v-btn color="primary darken-1" text @click="remove">Agree</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            dialog: false
        };
    },
    computed: {
        isHideCompleted() {
            return this.$store.state.isHideCompleted;
        }
    },
    methods: {
        remove() {
            this.$emit("delete-task", this.task);
        },
        done() {
            this.task.isChecked = !this.task.isChecked;
        }
    }
};
</script>
