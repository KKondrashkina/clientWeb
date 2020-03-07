"use strict";

$(function () {
    $(".add-button").click(function () {
        var todoText = $(".new-task");

        if (todoText.val() === "") {
            blink(todoText, "todo-text-light");
            return;
        }

        var newTask = $("<div class='input-group mb-3'></div>")
            .append("<div class='btn-group-toggle' data-toggle='buttons'><label class='btn btn-secondary done-button' title='Done'><input type='checkbox' autocomplete='off'>✓</label></div>")
            .append("<button class='btn btn-outline-secondary delete-button' title='Delete' type='button'>╳</button>")
            .append("<div class='form-control task'></div>")
            .append("<button class='btn btn-outline-secondary edit-button' title='Edit' type='button'><img alt='Редактировать' src='edit.png'/></button>");

        newTask.children(".task").text(todoText.val());
        
        $(".tasks").append(newTask);

        todoText.val("");

        var doneLabel = newTask.find(".done-button");
        var newTodoText = newTask.find(".task");

        doneLabel.click(function () {
            newTodoText.toggleClass("done", doneLabel.children("input").is(":checked"));
        });

        var deleteButton = newTask.find(".delete-button");

        deleteButton.click(function () {
            newTask.remove();
        });

        var editButton = $(".edit-button:last");

        editButton.click(function () {
            editButton.hide();

            var editableText = newTodoText.detach();
            var oldText = newTodoText.text();

            var editField = $("<input type='text' class='form-control task editable-task'>");
            editField.val(oldText);
            newTask.children("button:last").before(editField);            
            editField.focus();

            editField.focusout(function () {
                if (confirm("Сохранить изменения?")) {
                    if (editField.val() === "") {
                        blink(editField, "editable-task-light");                        
                        return;
                    }

                    editableText.text(editField.val());

                    finishEditing();
                }
                else {
                    editableText.text(oldText);

                    finishEditing();
                }
            });                               

            function finishEditing() {
                editField.remove();
                editButton.show();
                newTask.children("button:last").before(editableText);
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