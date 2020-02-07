﻿"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var addTodo = document.getElementById("add-todo");

    addTodo.addEventListener("click", function () {
        var todoText = document.getElementById("todo-text");

        if (todoText.value === "") {
            var blink = setInterval(() => {
                todoText.setAttribute("style", "background-color: #424347");

            }, 100);
            setTimeout(() => {
                clearInterval(blink);
                todoText.removeAttribute("style");
            }, 1000);

            return;
        }

        var newTodoTr = document.createElement("tr");
        var todoList = document.querySelector("#todo-list tbody");

        todoList.appendChild(newTodoTr);
        newTodoTr.setAttribute("class", "hide");

        newTodoTr.addEventListener("mousemove", function () {
            newTodoTr.removeAttribute("class");
        });

        newTodoTr.addEventListener("mouseout", function () {
            newTodoTr.setAttribute("class", "hide");
        });

        var doneCheckbox = document.createElement("input");
        var doneLabel = document.createElement("label");

        doneCheckbox.setAttribute("type", "checkbox");
        doneLabel.setAttribute("class", "checkbox");

        var span = document.createElement("span");

        doneLabel.appendChild(doneCheckbox);
        doneLabel.appendChild(span);

        var newTodoDone = document.createElement("td");

        newTodoDone.appendChild(doneLabel);
        newTodoTr.appendChild(newTodoDone);

        var deleteButton = document.createElement("button");

        deleteButton.setAttribute("type", "button");
        deleteButton.textContent = "╳";

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

            edit.setAttribute("type", "text");
            edit.setAttribute("class", "todo-text");
            edit.setAttribute("style", "background-color: #424347");

            parent.appendChild(edit);

            newTodoDone.removeChild(doneLabel);
            newTodoDelete.removeChild(deleteButton);

            var yes = document.createElement("button");

            yes.setAttribute("type", "button");
            yes.textContent = "✓";

            var no = document.createElement("button");

            no.setAttribute("type", "button");
            no.textContent = "╳";

            yes.addEventListener("mousedown", function () {
                if (edit.value === "") {
                    var editBlink = setInterval(() => {
                        edit.setAttribute("style", "background-color: #626367");

                    }, 100);
                    setTimeout(() => {
                        clearInterval(editBlink);
                        edit.setAttribute("style", "background-color: #424347");
                    }, 1000);

                    return;
                }

                newTodoText.textContent = edit.value;

                parent.removeChild(edit);
                parent.appendChild(newTodoText);

                newTodoDone.removeChild(yes);
                newTodoDelete.removeChild(no);

                newTodoDone.appendChild(doneLabel);
                newTodoDelete.appendChild(deleteButton);
            });

            no.addEventListener("mousedown", function () {
                newTodoText.textContent = oldText;

                parent.removeChild(edit);
                parent.appendChild(newTodoText);

                newTodoDone.removeChild(yes);
                newTodoDelete.removeChild(no);

                newTodoDone.appendChild(doneLabel);
                newTodoDelete.appendChild(deleteButton);
            });

            newTodoDone.appendChild(yes);
            newTodoDelete.appendChild(no);
        });

        doneLabel.addEventListener("mousedown", function () {
            if (!doneCheckbox.checked) {
                newTodoText.setAttribute("class", "done");
            } else {
                newTodoText.removeAttribute("class");
            }
        });

        todoText.value = "";
    });
});