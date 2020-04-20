<template>
    <v-col v-if="!isAllTasksChecked||!isHideCompleted"
           lg="3" md="4">
        <v-card :class="{'text--disabled transparent': isAllTasksChecked}"
                @click="open"
                elevation="7">
            <v-dialog v-model="dialog"
                      persistent max-width="290">
                <template v-slot:activator="{ on }">
                    <v-btn icon
                           title="Delete"
                           v-on="on">
                        <v-icon small>mdi-close</v-icon>
                    </v-btn>
                </template>

                <v-card>
                    <v-card-title class="headline">Confirm Deletion</v-card-title>
                    <v-card-text>Are you sure you want to delete this list?</v-card-text>
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
                <p v-if="item.tasks[0]">
                    <v-icon :class="{'text--disabled': isAllTasksChecked}"
                            small>mdi-checkbox-blank-circle</v-icon>
                    <span :class="{'text--disabled': isAllTasksChecked}"
                          class="ml-5" v-text="item.tasks[0].text"></span>
                </p>

                <p v-if="item.tasks[1]">
                    <v-icon :class="{'text--disabled': isAllTasksChecked}"
                            small>mdi-checkbox-blank-circle</v-icon>
                    <span :class="{'text--disabled': isAllTasksChecked}"
                          class="ml-5"
                          v-text="item.tasks[1].text"></span>
                </p>

                <p v-if="item.tasks[2]"
                   class="ml-11">. . .</p>
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
    data() {
        return {
            dialog: false
        };
    },
    computed: {
        isAllTasksChecked() {
            let isAllChecked = true;

            if (this.item.tasks.length === 0) {
                return false;
            }

            this.item.tasks.forEach(t => {
                if (!t.isChecked) {
                    isAllChecked = false;
                }
            });

            return isAllChecked;
        },
        isHideCompleted() {
            return this.$store.state.isHideCompleted;
        }
    },
    methods: {
        remove() {
            this.$emit("delete-list", this.item);
        },
        open() {
            this.$emit("open-list", this.item);
        }
    }
};
</script>
