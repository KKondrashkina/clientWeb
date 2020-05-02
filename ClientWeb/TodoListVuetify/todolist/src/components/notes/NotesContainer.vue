<template>
    <v-row v-if="!isListsChecked"
           align="center"
           class="pa-5">
        <template v-if="!isShowNote">
            <note v-for="item in notes"
                  :key="item.id"
                  :item="item"
                  @delete-note="deleteNote"
                  @open-note="openNote">
            </note>
            <name-dialog @add-new="addNewNote"></name-dialog>
        </template>

        <template v-else>
            <opened-note @show-notes="showNotes"
                        :item="openedNote"></opened-note>
        </template>
    </v-row>
</template>

<script>
import nameDialog from "../NameDialog";
import note from "./Note";
import openedNote from "./OpenedNote";

export default {
    data() {
        return {
            isShowNote: false,
            openedNote: {}
        };
    },
    computed: {
        isListsChecked() {
            return this.$store.state.isListsChecked;
        },
        notes() {
            return this.$store.state.notes;
        }
    },
    components: {
        "name-dialog": nameDialog,
        note,
        "opened-note": openedNote
    },
    methods: {
        addNewNote(name, text) {
            this.$store.commit("addNewNote", { name, text });
        },
        deleteNote(item) {
            this.$store.commit("deleteNote", item);
        },
        openNote(item) {
            this.isShowNote = true;
            this.openedNote = item;
        },
        showNotes() {
            this.isShowNote = false;
        }
    }
};
</script>
