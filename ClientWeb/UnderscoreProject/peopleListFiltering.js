(function () {
    "use strict";

    var people = [
        {
            name: "Maxim",
            lastName: "Volkov",
            age: 28
        },
        {
            name: "Evgeiniya",
            lastName: "Sidorova",
            age: 24
        },
        {
            name: "Lada",
            lastName: "Gavrilova",
            age: 39
        },
        {
            name: "Gleb",
            lastName: "Fomin",
            age: 51
        },
        {
            name: "Irina",
            lastName: "Orlova",
            age: 12
        },
        {
            name: "Fedor",
            lastName: "Sharov",
            age: 90
        },
        {
            name: "Oksana",
            lastName: "Sharova",
            age: 19
        },
        {
            name: "Vitaliy",
            lastName: "Kolesnikov",
            age: 4
        },
        {
            name: "Makar",
            lastName: "Gulyaev",
            age: 15
        },
        {
            name: "Roman",
            lastName: "Andreev",
            age: 21
        }
    ];

    var averageAge = _.chain(people)
        .pluck("age")
        .reduce(function (memo, value) {
            return memo + value;
        }, 0)
        .value() / people.length;

    console.log("Средний возраст людей из списка = " + averageAge);

    var middleAgedPeople = _.chain(people)
        .filter(function (people) {
            return people.age >= 20 && people.age <= 30;
        })
        .sortBy("age")
        .value();

    console.log("Люди от 20 до 30 лет, упорядоченные по возрастанию возраста: ");
    console.log(middleAgedPeople);

    _.each(people, function (people) {
        people.fullName = people.lastName + " " + people.name;
    });

    console.log("Список людей, после добавления нового поля:");
    console.log(people);
})();
