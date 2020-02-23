"use strict";

$(function () {
    $("#add-phone").click(function (e) {
        var isCompleteData = true;
        var lastName = $("#last-name").val();

        if (lastName === "") {
            isCompleteData = false;
            blink("#last-name", "Фамилия");
        }

        var name = $("#name").val();

        if (name === "") {
            isCompleteData = false;
            blink("#name", "Имя");
        }

        var phoneNumber = $("#phone-number").val();

        if (phoneNumber === "") {
            isCompleteData = false;
            blink("#phone-number", "Номер телефона");
        }

        if (!isCompleteData) {
            return;
        }

        var phones = $("#table-body tr td:nth-last-child(2)");

        for (var i = 0; i < phones.length; i++) {
            if ($(phones[i]).text() === phoneNumber) {
                alert("Контакт с таким номером уже существует!");
                return;
            }
        }

        var contactNumber = $("#table-body").children().length + 1;

        var bodyColumn1 = $("<td></td>");
        var bodyColumn2 = $("<td></td>").text(contactNumber);
        var bodyColumn3 = $("<td></td>").text(lastName);
        var bodyColumn4 = $("<td></td>").text(name);
        var bodyColumn5 = $("<td></td>").text(phoneNumber);
        var bodyColumn6 = $("<td></td>");

        var deleteButton = $("<button type=button title='Удалить контакт'>╳</button>").addClass("delete-button");
        bodyColumn6.append(deleteButton);

        var checkbox = $("<label></label>").addClass("checkbox").append("<input type=checkbox />").append("<span></span>");
        checkbox.appendTo(bodyColumn1);

        var bodyRow = $("<tr></tr>").append(bodyColumn1, bodyColumn2, bodyColumn3, bodyColumn4, bodyColumn5, bodyColumn6);
        bodyRow.appendTo("#table-body");

        deleteButton.click(function (e, isSome) {
            if (!(isSome || confirm("Вы действительно хотите удалить контакт " + lastName + " " + name + "?"))) {
                return;
            }

            removeContact(bodyRow, contactNumber);
            refreshContactNumber();

            var allContacts = $("#table-body tr");

            for (var i = 1; i < Number($("#number").text()); i++) {
                $(allContacts[i - 1]).children(":nth-child(2)").text(i);
            }
        });

        refreshContactNumber();
        clearFields();
    });

    var selectAll = $(".phone-book th [type = checkbox]");

    $(".delete-selected").click(function (e) {
        var selectedContacts = $("#table-body [type=checkbox]:checked");

        if (confirm("Вы действительно хотите удалить эти контакты? (" + selectedContacts.length + ")")) {
            for (var i = 0; i < selectedContacts.length; i++) {
                var contactRow = $($("#table-body [type=checkbox]:checked:last").parent().parent().parent());
                var deleteButton = $($(contactRow).find(".delete-button"));

                $(deleteButton).trigger("click", true);
            }

            $(selectAll).prop("checked", false);
        }
    });

    $(selectAll).click(function (e) {
        checkVisible();
    });

    $(".search-field").keyup(function (e) {
        var searchingText = $(".search-field").val();
        $("#table-body tr:not(:contains('" + searchingText + "'))").addClass("hide");

        var filteredContacts = $("#table-body tr:contains('" + searchingText + "')").removeClass("hide");
        $(".contacts-count").text("Найдено контактов: " + filteredContacts.length);

        if (searchingText !== "") {
            $(".contacts-count").removeClass("hide");
        } else {
            $(".contacts-count").addClass("hide");
        }

        checkVisible();
    });

    $(".clear-button").click(function (e) {
        $(".search-field").val("");
        $(".search-field").trigger("keyup");
    });

    function blink(attributeName, placeholderText) {
        var color = 1;

        var blinking = setInterval(function () {
            if (color === 1) {
                $(attributeName).css("background-color", "#424347");
                color = 2;
            } else {
                $(attributeName).css("background-color", "#202125");
                color = 1;
            }

            $(attributeName).attr("placeholder", "Заполните поле");
        }, 200);

        setTimeout(() => {
            clearInterval(blinking);
            $(attributeName).css("background-color", "#202125");
            $(attributeName).attr("placeholder", placeholderText);
        }, 4000);
    }

    function removeContact(contactRow, contactNumber) {
        $(contactRow).remove();
        $("#number").text(contactNumber);
    }

    function refreshContactNumber() {
        var newNumber = $("#table-body").children().length + 1;
        $("#number").text(newNumber);
    }

    function clearFields() {
        $("#last-name").val("");
        $("#name").val("");
        $("#phone-number").val("");
    }

    function checkVisible() {
        var allCheckboxes = $("#table-body [type=checkbox]");

        for (var i = 0; i < allCheckboxes.length; i++) {
            var contactRow = $(allCheckboxes[i]).parent().parent().parent();
            $(allCheckboxes[i]).prop("checked", $(selectAll).is(":checked") && !$(contactRow).hasClass("hide"));
        }
    }
});