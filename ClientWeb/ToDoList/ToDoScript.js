"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var addTodo = document.getElementById("add-todo");

    addTodo.addEventListener("click", function () {
        var todoText = document.getElementById("todo-text");

        if (todoText.value === "") {

            blink(todoText, "todo-text todo-text-light", "todo-text");

            return;
        }

        var newTodoTr = document.createElement("tr");
        var todoList = document.querySelector(".todo-list tbody");

        todoList.appendChild(newTodoTr);

        var doneCheckbox = document.createElement("input");
        var doneLabel = document.createElement("label");

        doneCheckbox.type = "checkbox";
        doneLabel.className = "checkbox";

        var span = document.createElement("span");

        doneLabel.appendChild(doneCheckbox);
        doneLabel.appendChild(span);

        var newTodoDone = document.createElement("td");

        newTodoDone.appendChild(doneLabel);
        newTodoTr.appendChild(newTodoDone);

        var deleteButton = document.createElement("button");

        customizeButton(deleteButton, "Delete", "╳");

        deleteButton.addEventListener("mousedown", function () {
            newTodoTr.parentNode.removeChild(newTodoTr);
        });

        var newTodoDelete = document.createElement("td");

        newTodoDelete.appendChild(deleteButton);
        newTodoTr.appendChild(newTodoDelete);

        var newTodoText = document.createElement("td");

        newTodoText.innerText = todoText.value;
        newTodoTr.appendChild(newTodoText);

        newTodoText.addEventListener("mousedown", function () {
            var oldText = newTodoText.textContent;
            var parent = newTodoText.parentNode;

            parent.removeChild(newTodoText);

            var edit = document.createElement("input");

            edit.value = oldText;

            edit.type = "text";
            edit.className = "todo-text";
            edit.className = "todo-text edit-text-dark";

            parent.appendChild(edit);

            newTodoDone.removeChild(doneLabel);
            newTodoDelete.removeChild(deleteButton);

            var yes = document.createElement("button");

            customizeButton(yes, "Apply", "✓");

            var no = document.createElement("button");

            customizeButton(no, "Cancel", "╳");

            function finishEditing() {
                parent.removeChild(edit);
                parent.appendChild(newTodoText);

                newTodoDone.removeChild(yes);
                newTodoDelete.removeChild(no);

                newTodoDone.appendChild(doneLabel);
                newTodoDelete.appendChild(deleteButton);
            }

            yes.addEventListener("mousedown", function () {
                if (edit.value === "") {
                    blink(edit, "todo-text edit-text-light", "todo-text edit-text-dark");

                    return;
                }

                newTodoText.textContent = edit.value;

                finishEditing();
            });

            no.addEventListener("mousedown", function () {
                newTodoText.textContent = oldText;

                finishEditing();
            });

            newTodoDone.appendChild(yes);
            newTodoDelete.appendChild(no);
        });

        doneLabel.addEventListener("mousedown", function () {
            if (!doneCheckbox.checked) {
                newTodoText.className = "done";
            } else {
                newTodoText.className = "";
            }
        });

        todoText.value = "";
    });

    function blink(element, class1, class2) {
        var color1 = 1;

        var blinking = setInterval(function () {
            if (color1 === 1) {
                element.className = class1;

                color1 = 2;
            } else {
                element.className = class2;

                color1 = 1;
            }
        }, 200);

        setTimeout(function () {
            clearInterval(blinking);
            element.className = class2;
        }, 2000);
    }

    function customizeButton(buttonName, title, content) {
        buttonName.type = "button";
        buttonName.title = title;
        buttonName.textContent = content;
    }
});