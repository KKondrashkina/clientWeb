"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var addTodo = document.getElementById("add-todo");

    addTodo.addEventListener("click", function (e1) {
        var todoText = document.getElementById("todo-text");

        if (todoText.value === "") {
            var blink = setInterval(() => {
                todoText.setAttribute("style", "background-color: #424347;");

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

        newTodoTr.addEventListener("mousemove", function (e2) {
            newTodoTr.removeAttribute("class");
        });

        newTodoTr.addEventListener("mouseout", function (e3) {
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

        deleteButton.addEventListener("mousedown", function (e4) {
            newTodoTr.parentNode.removeChild(newTodoTr);
        });

        var newTodoDelete = document.createElement("td");

        newTodoDelete.appendChild(deleteButton);
        newTodoTr.appendChild(newTodoDelete);

        var newTodoText = document.createElement("td");

        newTodoText.innerText = todoText.value;
        newTodoTr.appendChild(newTodoText);

        doneLabel.addEventListener("mousedown", function (e5) {
            if (!doneCheckbox.checked) {
                newTodoText.setAttribute("class", "done");
            } else {
                newTodoText.removeAttribute("class");
            }
        });

        todoText.value = "";
    });
});