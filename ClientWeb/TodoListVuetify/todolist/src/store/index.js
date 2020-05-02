import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        isHideCompleted: false,
        isListsChecked: true,
        isNotesChecked: false,
        todoLists: [],
        notes: [],
        listId: 0,
        noteId: 0
    },
    mutations: {
        showOrHide(state) {
            state.isHideCompleted = !state.isHideCompleted;
        },
        checkLists(state) {
            state.isListsChecked = true;
        },
        checkNotes(state) {
            state.isListsChecked = false;
        },
        addNewList(state, name) {
            state.listId++;

            state.todoLists.push({
                id: state.listId,
                name: name,
                tasks: []
            });
        },
        deleteList(state, item) {
            state.todoLists = state.todoLists.filter(t => t.id !== item.id);
        },
        addNewNote(state, info) {
            state.noteId++;

            state.notes.push({
                id: state.noteId,
                name: info.name,
                text: info.text
            });
        },
        deleteNote(state, item) {
            state.notes = state.notes.filter(n => n.id !== item.id);
        }
    },
    actions: {
    },
    modules: {
    }
});
