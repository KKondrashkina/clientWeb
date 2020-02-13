"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var addTodo = document.getElementById("add-todo");

    addTodo.addEventListener("click", function () {
        var todoText = document.getElementById("todo-text");

        if (todoText.value === "") {
            var color1 = 1;

            var blink = setInterval(function () {
                if (color1 === 1) {
                    todoText.style.backgroundColor = "#424347";

                    color1 = 2;
                } else {
                    todoText.style.backgroundColor = "#202125";

                    color1 = 1;
                }
            }, 200);

            setTimeout(function () {
                clearInterval(blink);
                todoText.style.backgroundColor = "#202125";
            }, 2000);

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
        deleteButton.setAttribute("title", "Delete");
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
            edit.style.backgroundColor = "#424347";

            parent.appendChild(edit);

            newTodoDone.removeChild(doneLabel);
            newTodoDelete.removeChild(deleteButton);

            var yes = document.createElement("button");

            yes.setAttribute("title", "Apply");
            yes.setAttribute("type", "button");
            yes.textContent = "✓";

            var no = document.createElement("button");

            no.setAttribute("title", "Cancel");
            no.setAttribute("type", "button");
            no.textContent = "╳";

            yes.addEventListener("mousedown", function () {
                if (edit.value === "") {
                    var editColor = 1;

                    var editBlink = setInterval(function () {
                        if (editColor === 1) {
                            edit.style.backgroundColor = "#626367";

                            editColor = 2;
                        } else {
                            edit.style.backgroundColor = "#424347";

                            editColor = 1;
                        }
                    }, 200);

                    setTimeout(function () {
                        clearInterval(editBlink);
                        edit.style.backgroundColor = "#424347";
                    }, 2000);

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