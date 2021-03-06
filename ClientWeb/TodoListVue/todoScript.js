﻿new Vue({
    el: ".all",
    data: {
        items: [],
        todoText: "",
        isInvalid: false,
        todoId: 1
    },
    methods: {
        addTodo: function () {
            if (this.todoText === "") {
                this.blink();

                return;
            }

            this.items.push({
                id: this.todoId++,
                text: this.todoText,
                newText: this.todoText
            });

            this.todoText = "";
        },
        deleteTodo: function (item) {
            this.items = this.items.filter(function (e) {
                return e.id !== item.id;
            });
        },
        editTodo: function (item) {
            item.newText = item.text;
        },
        saveChanges: function (item) {
            if (item.newText === "") {
                return;
            }

            item.text = item.newText;
        },
        blink: function () {
            var self = this;

            var blinking = setInterval(function () {
                self.isInvalid = !self.isInvalid;
            }, 200);

            setTimeout(function () {
                clearInterval(blinking);
                self.isInvalid = false;
            }, 2000);
        }
    }
});

Vue.component("todo-item", {
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    data: function () {
        return {
            isEditing: false,
            isChecked: false,
            newText: ""
        };
    },
    template: "#todo-item-template",
    methods: {
        done: function () {
            this.isChecked = !this.isChecked;
        },
        edit: function () {
            this.isEditing = true;
            this.$emit("edit-todo", this.item);
        },
        remove: function () {
            this.$emit("delete-todo", this.item);
        },
        save: function () {
            this.$emit("save-changes", this.item);
            this.isEditing = false;
        },
        cancelEditing: function () {
            this.isEditing = false;
        }
    }
});