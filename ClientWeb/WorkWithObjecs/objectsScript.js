"use strict";

var countries = [
    {
        countryName: "New Zealand",
        cities: [
            {
                cityName: "Auckland",
                population: 1534700
            },
            {
                cityName: "Wellington",
                population: 412500
            },
            {
                cityName: "Hamilton",
                population: 203400
            }
        ]
    },
    {
        countryName: "Republic of Peru",
        cities: [
            {
                cityName: "Arequipa",
                population: 1008290
            },
            {
                cityName: "Trujillo",
                population: 919899
            }
        ]
    },
    {
        countryName: "Syrian Arab Republic",
        cities: [
            {
                cityName: "Aleppo",
                population: 2132100
            },
            {
                cityName: "Damascus",
                population: 1754000
            },
            {
                cityName: "Homs",
                population: 900492
            }
        ]
    },
    {
        countryName: "Vietnam",
        cities: [
            {
                cityName: "Ho Chi Minh City",
                population: 8426000
            },
            {
                cityName: "Haiphong",
                population: 1837302
            },
            {
                cityName: "Danang",
                population: 887069
            }
        ]
    }
];

function getСountriesWithMaxCitiesCount(array) {
    var maxCityCount = 0;
    var cityCount;

    array.forEach(function (e) {
        cityCount = e.cities.length;
        if (maxCityCount < cityCount) {
            maxCityCount = cityCount;
        }
    });

    return array.filter(function (e) {
        return e.cities.length === maxCityCount;
    });
}

console.log("Страны с максимальным количеством городов:");
console.log(getСountriesWithMaxCitiesCount(countries));

function getCountryPopulation(array) {
    return array.map(function (country) {
        return {
            name: country.countryName,
            populaion: country.cities.reduce(function (memo, city) {
                return memo + city.population;
            }, 0)
        };
    });
}

console.log("Страны и их суммрная численность:");
console.log(getCountryPopulation(countries));