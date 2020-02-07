(function () {
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

    function getCountriesWithMaxCitiesCount(array) {
        var maxCitiesCount = array.reduce(function (memo, e) {
            return (memo.cities.length > e.cities.length ? memo : e);
        }).cities.length;

        return array.filter(function (e) {
            return e.cities.length === maxCitiesCount;
        });
    }

    console.log("Страны с максимальным количеством городов:");
    console.log(getCountriesWithMaxCitiesCount(countries));

    function getCountryPopulation(array) {
        var countriesPopulation = {};

        array.forEach(function (country) {
            countriesPopulation[country.countryName] =
                country.cities.reduce(function (memo, city) {
                    return memo + city.population;
                }, 0);
        });

        return countriesPopulation;
    }

    console.log("Страны и их суммрная численность:");
    console.log(getCountryPopulation(countries));
})();