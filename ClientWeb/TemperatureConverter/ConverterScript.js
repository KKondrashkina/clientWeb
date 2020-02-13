"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var convertButton = document.getElementById("convert");

    convertButton.addEventListener("click", function () {
        var celsiusValue = document.getElementById("celsius-value");
        var celsiusTemperature = Number(celsiusValue.value);
        var fahrenheitValue = document.getElementById("fahrenheit-value");
        var kelvinValue = document.getElementById("kelvin-value");

        if (isNaN(celsiusTemperature) || celsiusValue.value === "") {
            var warning = document.getElementById("warning");

            setTimeout(function () {
                warning.style.display = "none";
            }, 3000);

            warning.style.display = "block";

            kelvinValue.value = "";
            fahrenheitValue.value = "";

            return;
        }

        var kelvinTemperature = celsiusTemperature + 273.15;
        kelvinValue.value = kelvinTemperature.toFixed(3);

        var fahrenheitTemperature = celsiusTemperature * 9 / 5 + 32;
        fahrenheitValue.value = fahrenheitTemperature.toFixed(3);
    });
});