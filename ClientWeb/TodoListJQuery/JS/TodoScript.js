﻿"use strict";

$(function () {
    $("#add-todo").click(function () {
        var todoText = $("#todo-text");

        if (todoText.val() === "") {
            blink(todoText, "todo-text-light");
            return;
        }

        var newTodoTr = $("<tr></tr>")
            .append('<td><label class="checkbox"><input type="checkbox"/><span></span></label></td>')
            .append('<td><button type="button" title="Delete">╳</button></td>')
            .append("<td></td>");

        newTodoTr.children("td:last").text(todoText.val());

        $(".todo-list tbody").append(newTodoTr);

        todoText.val("");

        var doneLabel = newTodoTr.children("td:first").children();

        doneLabel.click(function () {
            newTodoText.toggleClass("done", doneLabel.children("input").is(":checked"));
        });

        var deleteButton = newTodoTr.find("[title='Delete']");

        deleteButton.click(function () {
            newTodoTr.remove();
        });

        var newTodoText = newTodoTr.children("td:last");

        newTodoText.click(function () {
            var editableText = newTodoText.detach();
            var oldText = newTodoText.text();

            newTodoTr.append('<input type="text" class="todo-text edit-text-dark"/>');

            var edit = newTodoTr.children("input").val(oldText);

            var yes = $("<button type='button' title='Apply'>✓</button>");

            yes.click(function () {
                if (edit.val() === "") {
                    blink(edit, "edit-text-light");
                    return;
                }

                editableText.text(edit.val());

                finishEditing();
            });

            var no = $("<button type='button' title='Cancel'>╳</button>");

            no.click(function () {
                editableText.text(oldText);

                finishEditing();
            });

            var newTodoDone = newTodoTr.children("td:first");
            var newTodoDelete = newTodoTr.children("td:nth-child(2)");

            doneLabel.detach();
            deleteButton.detach();

            newTodoDone.append(yes);
            newTodoDelete.append(no);

            function finishEditing() {
                edit.remove();
                newTodoTr.append(editableText);

                yes.remove();
                no.remove();

                newTodoDone.append(doneLabel);
                newTodoDelete.append(deleteButton);
            }
        });
    });

    function blink(element, className) {
        var color = 1;

        var blinking = setInterval(function () {
            if (color === 1) {
                element.addClass(className);
                color = 2;
            } else {
                element.removeClass(className);
                color = 1;
            }
        }, 200);

        setTimeout(function () {
            clearInterval(blinking);
            element.removeClass(className);
        }, 2000);
    }
});