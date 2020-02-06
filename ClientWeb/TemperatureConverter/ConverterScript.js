"use strict";

(function () {
    var convertButton = document.getElementById("convert");

    convertButton.addEventListener("click", function () {
        var celsiusValue = document.getElementById("celsius-value");
        var celsiusNumber = Number(celsiusValue.value);
        var fahrenheitValue = document.getElementById("fahrenheit-value");
        var kelvinValue = document.getElementById("kelvin-value");

        if (isNaN(celsiusNumber) || celsiusValue.value === "") {
            var warning = document.getElementById("warning");

            var blink = setInterval(() => {
                warning.setAttribute("style", "visibility: visible;");

            },
                100);
            setTimeout(() => {
                clearInterval(blink);
                warning.removeAttribute("style");
            },
                3000);

            kelvinValue.value = "";
            fahrenheitValue.value = "";

            return;
        } else {
            var kelvinNumber = celsiusNumber + 273.15;
            kelvinValue.value = kelvinNumber;

            var fahrenheitNumber = celsiusNumber * 9 / 5 + 32;
            fahrenheitValue.value = fahrenheitNumber;
        }
    });
})();