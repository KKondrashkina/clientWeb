"use strict";

$(function () {
    $("#add-phone").click(function () {
        var isValid = true;
        var lastName = $("#last-name").val();

        if (lastName === "") {
            isValid = false;
            blink("#last-name", "Фамилия");
        }

        var name = $("#name").val();

        if (name === "") {
            isValid = false;
            blink("#name", "Имя");
        }

        var phoneNumber = $("#phone-number").val();

        if (phoneNumber === "") {
            isValid = false;
            blink("#phone-number", "Номер телефона");
        }

        if (!isValid) {
            return;
        }

        var phones = $("#table-body tr td:nth-last-child(2)");

        var isExist = false;

        phones.each(function (index) {
            if ($(phones[index]).text() === phoneNumber) {
                alert("Контакт с таким номером уже существует!");
                isExist = true;

                return false;
            }
        });

        if (isExist) {
            return
        }

        var contactNumber = $("#table-body").children().length + 1;

        var bodyColumn1 = $("<td></td>");
        var bodyColumn2 = $("<td class='contact-id'></td>").text(contactNumber);
        var bodyColumn3 = $("<td class='last-name'></td>").text(lastName);
        var bodyColumn4 = $("<td class='name'/td>").text(name);
        var bodyColumn5 = $("<td class='phone'></td>").text(phoneNumber);
        var bodyColumn6 = $("<td></td>");

        var deleteButton = $("<button type='button' title='Удалить контакт'>╳</button>").addClass("delete-button");
        bodyColumn6.append(deleteButton);

        var checkbox = $("<label></label>").addClass("checkbox").append("<input type='checkbox' />").append("<span></span>");
        checkbox.appendTo(bodyColumn1);

        var bodyRow = $("<tr></tr>").append(bodyColumn1, bodyColumn2, bodyColumn3, bodyColumn4, bodyColumn5, bodyColumn6);
        bodyRow.appendTo("#table-body");

        deleteButton.click(function (e, isSome) {
            if (!isSome && !confirm("Вы действительно хотите удалить контакт " + lastName + " " + name + "?")) {
                return;
            }

            removeContact(bodyRow, contactNumber);
            refreshContactNumber();

            var allContacts = $("#table-body tr");

            allContacts.each(function (index) {
                $(allContacts[index]).children(":nth-child(2)").text(index + 1);
            });
        });

        refreshContactNumber();
        clearFields();
    });

    var selectAll = $(".phone-book th [type=checkbox]");

    $(".delete-selected").click(function () {
        var selectedContacts = $("#table-body [type=checkbox]:checked");

        if (selectedContacts.length === 0) {
            alert("Вы не выбрали контакты для удаления!");
            return;
        }

        if (confirm("Вы действительно хотите удалить эти контакты? (" + selectedContacts.length + ")")) {
            selectedContacts.each(function () {
                var contactRow = $("#table-body [type=checkbox]:checked:last").closest("tr");
                var deleteButton = $(contactRow).find(".delete-button");

                $(deleteButton).trigger("click", true);
            });

            $(selectAll).prop("checked", false);
        }
    });

    $(selectAll).click(function () {
        checkVisible();
    });

    $(".search-field").keyup(function () {
        var searchingText = $(".search-field").val().toLowerCase();

        $("#table-body tr").each(function () {
            $(this).addClass("hide");
        });

        $("#table-body td:not(.contact-id)").each(function () {
            var string = $(this).text().toLowerCase();

            if (string.indexOf(searchingText) >= 0) {
                $(this).parent().removeClass("hide");
            }
        });

        checkVisible();
    });

    $(".clear-button").click(function () {
        $(".search-field").val("").trigger("keyup");
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

            $(attributeName).prop("placeholder", "Заполните поле");
        }, 200);

        setTimeout(function () {
            clearInterval(blinking);
            $(attributeName).css("background-color", "#202125");
            $(attributeName).prop("placeholder", placeholderText);
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

        allCheckboxes.each(function (index) {
            var contactRow = $(allCheckboxes[index]).closest("tr");
            $(allCheckboxes[index]).prop("checked", $(selectAll).is(":checked") && !$(contactRow).hasClass("hide"));
        });
    }
});