"use strict";

$(function () {
    var button = $("#add-phone");
    $("#number").text("1");

    $("button").click(function (e) {
        var lastName = $("#last-name").val();
        var name = $("#name").val();
        var phoneNumber = $("#phone-number").val();
        var isCompleteData = true;

        var number = $("#table-body").children().length + 1;
        $("#number").text(number+1);

        if (lastName === "") {
            isCompleteData = false;

            var color1 = 1;

            var blink1 = setInterval(function () {
                if (color1 === 1) {
                    $("#last-name").css("background-color", "#424347");
                    color1 = 2;
                } else {
                    $("#last-name").css("background-color", "#202125");
                    color1 = 1;
                }

                $("#last-name").attr("placeholder", "Заполните поле");
            }, 200);

            setTimeout(() => {
                clearInterval(blink1);
                $("#last-name").css("background-color", "#202125");
                $("#last-name").attr("placeholder", "Фамилия");
            }, 4000);
        }

        if (name === "") {
            isCompleteData = false;

            var color2 = 1;

            var blink2 = setInterval(function () {
                if (color2 === 1) {
                    $("#name").css("background-color", "#424347");
                    color2 = 2;
                } else {
                    $("#name").css("background-color", "#202125");
                    color2 = 1;
                }
                $("#name").attr("placeholder", "Заполните поле");

            }, 200);

            setTimeout(() => {
                clearInterval(blink2);
                $("#name").css("background-color", "#202125");
                $("#name").attr("placeholder", "Имя");
            }, 4000);
        }

        if (phoneNumber === "") {
            isCompleteData = false;

            var color3 = 1;

            var blink3 = setInterval(function () {
                if (color3 === 1) {
                    $("#phone-number").css("background-color", "#424347");
                    color3 = 2;
                } else {
                    $("#phone-number").css("background-color", "#202125");
                    color3 = 1;
                }

                $("#phone-number").attr("placeholder", "Заполните поле");
            }, 200);

            setTimeout(() => {
                clearInterval(blink3);
                $("#phone-number").css("background-color", "#202125");
                $("#phone-number").attr("placeholder", "Номер телефона");
            }, 4000);
        }

        if (!isCompleteData) {
            return;
        }

        var column1 = $("<td></td>").text(number);
        var column2 = $("<td></td>").text(lastName);
        var column3 = $("<td></td>").text(name);
        var column4 = $("<td></td>").text(phoneNumber);
        var column5 = $("<td></td>").text("1");

        var row = $("<tr></tr>").append(column1, column2, column3, column4, column5);

        row.appendTo("#table-body");
    });
});