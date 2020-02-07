"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var convertButton = document.getElementById("convert");

    convertButton.addEventListener("click", function () {
        var celsiusValue = document.getElementById("celsius-value");
        var celsiusNumber = Number(celsiusValue.value);
        var fahrenheitValue = document.getElementById("fahrenheit-value");
        var kelvinValue = document.getElementById("kelvin-value");

        if (isNaN(celsiusNumber) || celsiusValue.value === "") {
            var warning = document.getElementById("warning");

            setTimeout(function () {
                warning.removeAttribute("style");
            }, 3000);

            warning.setAttribute("style", "visibility: visible;");

            kelvinValue.value = "";
            fahrenheitValue.value = "";

            return;
        }

        var kelvinNumber = celsiusNumber + 273.15;
        kelvinValue.value = kelvinNumber;

        var fahrenheitNumber = celsiusNumber * 9 / 5 + 32;
        fahrenheitValue.value = fahrenheitNumber;
    });
});