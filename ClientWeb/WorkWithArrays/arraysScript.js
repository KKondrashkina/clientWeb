"use strict";

var numbersArray1 = [2, 34, 53, 22, 111, -3, 5, 2, 4, 44, 9, -23, -45, 65, 535];

console.log("Изначальный массив: " + numbersArray1);

numbersArray1.sort(function (e1, e2) {
    return e2 - e1;
});

console.log("Отсортированный по убыванию массив: " + numbersArray1);

function getFirstFiveElements(array) {
    return array.slice(0, 5);
}

console.log("Первые пять элементов полученного массива: " + getFirstFiveElements(numbersArray1));

function getLastFiveElements(array) {
    return array.slice(array.length - 5);
}

console.log("Последние пять элементов полученного массива: " + getLastFiveElements(numbersArray1));

function getEvenElementsSum(array) {
    var evenArray = array.filter(function (number) {
        return number % 2 === 0;
    });

    return evenArray.reduce(function (memo, e) {
        return memo + e;
    }, 0);
};

console.log("Сумма четных чисел массива: " + getEvenElementsSum(numbersArray1));

function createArray() {
    var newArray = [];

    for (var i = 0; i <= 100; i++) {
        newArray.push(i);
    }

    return newArray;
}

console.log("Созданный циклом массив чисел от 0 до 100: " + createArray());

function getEvenNumbersSquares(array) {
    var evenArray = array.filter(function (number) {
        return number % 2 === 0;
    });

    return evenArray.map(function (e) {
        return Math.pow(e, 2);
    });
}

console.log("Квадраты четных чисел этого массива: " + getEvenNumbersSquares(createArray()));