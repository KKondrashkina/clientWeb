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
        newTodoTr.innerHTML = '<td><label class="checkbox"><input type="checkbox"/><span></span></label></td>';
        newTodoTr.innerHTML += '<td><button type="button" title="Delete">╳</button></td>';
        newTodoTr.innerHTML += "<td>" + todoText.value + "</td>";

        var todoList = document.querySelector(".todo-list tbody");
        todoList.appendChild(newTodoTr);

        var deleteButton = newTodoTr.children[1].firstChild;

        deleteButton.addEventListener("mousedown", function () {
            newTodoTr.parentNode.removeChild(newTodoTr);
        });

        var newTodoText = newTodoTr.children[2];

        newTodoText.addEventListener("mousedown", function () {
            var oldText = newTodoText.textContent;

            newTodoTr.removeChild(newTodoText);
            newTodoTr.innerHTML += '<input type="text" class="todo-text edit-text-dark"/>';

            var edit = newTodoTr.lastChild;
            edit.value = oldText;

            var newTodoDone = newTodoTr.children[0];
            newTodoDone.removeChild(newTodoTr.children[0].firstChild);

            var newTodoDelete = newTodoTr.children[1];
            newTodoDelete.removeChild(newTodoTr.children[1].firstChild);

            var yes = document.createElement("button");
            customizeButton(yes, "Apply", "✓");

            var no = document.createElement("button");
            customizeButton(no, "Cancel", "╳");

            function finishEditing() {
                newTodoTr.removeChild(edit);
                newTodoTr.appendChild(newTodoText);

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

        var doneLabel = newTodoTr.children[0].firstChild;

        doneLabel.addEventListener("mousedown", function () {
            if (!doneLabel.firstChild.checked) {
                newTodoText.className = "done";
            } else {
                newTodoText.className = "";
            }
        });

        todoText.value = "";
    });

    function blink(element, class1, class2) {
        var color = 1;

        var blinking = setInterval(function () {
            if (color === 1) {
                element.className = class1;
                color = 2;
            } else {
                element.className = class2;
                color = 1;
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