var main = $('main')
var hero = $('#hero')
//#region Aside 
var aside = $('aside');
// City search
var citySubmitForm = $("#submit-button");
var citySearch = $("#city-search");
// Aside Cities
var cities = $('.cities');
var cityOne = $("#city-one");
var cityOneDiv = $('#city-one-div');
var cityTwoContainer = $('#city-two-container');
var cityTwo = $("#city-two");
var cityTwoDiv = $('#city-two-div');
var cityThreeContainer = $('#city-three-container');
var cityThree = $("#city-three");
var cityThreeDiv = $('#city-three-div');
//#endregion
//#region Current City
var city = $('#city');
// City Name
var mainCityTitle = $('#main-city-name');
// Current
var currentCityTitle = $('#current-city-name');
var currentTemperature = $('#current-temperature');
var currentHumidity = $('#current-humidity');
var currentWind = $('#current-wind');
var currentIcon = $("#current-icon");
// Day One
var dayOne = $("#day-one-title");
var dayOneTemp = $("#day-one-temperature");
var dayOneHumidity = $("#day-one-humidity");
var dayOneWind = $("#day-one-wind");
var dayOneIcon = $("#day-one-icon");
// Day Two
var dayTwo = $("#day-two-title");
var dayTwoTemp = $("#day-two-temperature");
var dayTwoHumidity = $("#day-two-humidity");
var dayTwoWind = $("#day-two-wind");
var dayTwoIcon = $("#day-two-icon");
// Day Three
var dayThree = $("#day-three-title");
var dayThreeTemp = $("#day-three-temperature");
var dayThreeHumidity = $("#day-three-humidity");
var dayThreeWind = $("#day-three-wind");
var dayThreeIcon = $("#day-three-icon");
// Day Four
var dayFour = $("#day-four-title");
var dayFourTemp = $("#day-four-temperature");
var dayFourHumidity = $("#day-four-humidity");
var dayFourWind = $("#day-four-wind");
var dayFourIcon = $("#day-four-icon");
// Day Five
var dayFive = $("#day-five-title");
var dayFiveTemp = $("#day-five-temperature");
var dayFiveHumidity = $("#day-five-humidity");
var dayFiveWind = $("#day-five-wind");
var dayFiveIcon = $("#day-five-icon");
//#endregion

var saveCity = function (cityName) {
    // Create local storage objects if none exist
    if (!localStorage.getItem("cityOne")) {
        var cityOne = {
            name: cityName,
        };
        localStorage.setItem("cityOne", JSON.stringify(cityOne));
        var cityTwo = {
            name: '',
        };
        localStorage.setItem("cityTwo", JSON.stringify(cityTwo));
        var cityThree = {
            name: '',
        };
        localStorage.setItem("cityThree", JSON.stringify(cityThree));
    } else {
        var cityOneObject = JSON.parse(localStorage.getItem("cityOne"));
        var cityTwoObject = JSON.parse(localStorage.getItem("cityTwo"));
        var cityThreeObject = JSON.parse(localStorage.getItem("cityThree"));
        // Change local object values
        var cityOne = {
            name: cityName,
        };
        localStorage.setItem("cityOne", JSON.stringify(cityOne));
        var cityTwo = {
            name: cityOneObject.name,
        };
        localStorage.setItem("cityTwo", JSON.stringify(cityTwo));
        var cityThree = {
            name: cityTwoObject.name,
        };
        localStorage.setItem("cityThree", JSON.stringify(cityThree));
    }
    setHistory();
}

var setHistory = function () {
    var cityOneObject = JSON.parse(localStorage.getItem("cityOne"));
    var cityTwoObject = JSON.parse(localStorage.getItem("cityTwo"));
    var cityThreeObject = JSON.parse(localStorage.getItem("cityThree"));
    // Display on aside
    cityOne.text(cityOneObject.name);
    if (cityTwoObject.name !== "") {
        cityTwoContainer.show();
        cityTwo.text(cityTwoObject.name);
    } else {
        cityTwoContainer.hide();
    }
    if (cityThreeObject.name !== "") {
        cityThreeContainer.show();
        cityThree.text(cityThreeObject.name);
    } else {
        cityThreeContainer.hide();
    }
}

// Populate Cities
var populateSearchHistory = function () {
    if (localStorage.getItem("cityOne")) {
        setHistory();
    } else {
        cities.hide();
    }
    aside.css("min-width", "100%");
    hero.hide();
    city.hide();
}

populateSearchHistory();

var displayData = function (data, retrieve) {
    // Change background photo
    // var url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=" + placeId + "&fields=photo&key=" + apiKey;
    // fetch(url)
    //     .then(function (response) {
    //         if (response.ok) {
    //             response.json().then(function (data) {
    //                 // Display new background photo
    //             });
    //         }
    //     })
    console.log(data)

    aside.css("min-width", "");
    city.show();
    if (data.length === 0) {
        currentCityTitle.text("No city found. Please enter a real place lol.");
        return
    }
    hero.show();
    mainCityTitle.text(data.city.name)
    // Change current card

    const findCurrentTemp = function () {
        let currentHour = dayjs().format("H");
        let convertedCurrentHour = Math.floor(currentHour / 3);
        for (let i = 0; i < 8; i++) {
            if (i = convertedCurrentHour) {
                const temp = Math.floor((((data.list[i].main.temp - 273.15) * 9) / 5) + 32);
                return temp
            }
        }
    }

    // currentCityTitle.text(data.city.name + " " + dayjs().format("MMMM D, YYYY"));
    currentCityTitle.text(dayjs().format("MMMM D, YYYY"));
    currentTemperature.text(findCurrentTemp());
    currentHumidity.text(data.list[0].main.humidity + "%");
    currentWind.text(Math.floor(data.list[0].wind.speed * 2.23694) + " mph");

    // Set icons
    for (let i = 0; i < 6; i++) {
        // Determine icon to be manipulated
        if (i === 0) {
            icon = currentIcon
        } else if (i === 1) {
            icon = dayOneIcon
        } else if (i === 2) {
            icon = dayTwoIcon
        } else if (i === 3) {
            icon = dayThreeIcon
        } else if (i === 4) {
            icon = dayFourIcon
        } else if (i === 5) {
            icon = dayFiveIcon
        }
        // Change icon based on weather
        if (data.list[i].weather[0].description === "clear sky"
            || data.list[i].weather[0].description === "few clouds") {
            icon.attr("class", "fa-solid fa-sun")
        } else if (data.list[i].weather[0].description === "scattered clouds"
            || data.list[i].weather[0].description === "overcast clouds"
            || data.list[i].weather[0].description === "broken clouds") {
            icon.attr("class", "fa-solid fa-cloud-sun")
        } else if (data.list[i].weather[0].description === "mist") {
            icon.attr("class", "fa-solid fa-cloud-fog")
        } else if (data.list[i].weather[0].description === "shower rain"
            || data.list[i].weather[0].description === "rain"
            || data.list[i].weather[0].description === "thunderstorm") {
            icon.attr("class", "fa-solid fa-raindrops")
        } else if (data.list[i].weather[0].description === "snow") {
            icon.attr("class", "fa-solid fa-snowflake")
        }
    }

    // Determine extrema for each day
    const findTempExtrema = function (day) {
        let highTemp = null;
        let lowTemp = null;
        if (day === 1) {
            for (let i = 8; i < 16; i++) {
                const temp = Math.floor((((data.list[i].main.temp - 273.15) * 9) / 5) + 32);
                if (temp >= highTemp || highTemp == null) {
                    highTemp = temp;
                }
                if (temp <= lowTemp || lowTemp == null) {
                    lowTemp = temp;
                }
            }
        }
        if (day === 2) {
            for (let i = 16; i < 24; i++) {
                const temp = Math.floor((((data.list[i].main.temp - 273.15) * 9) / 5) + 32);
                if (temp >= highTemp || highTemp == null) {
                    highTemp = temp;
                }
                if (temp <= lowTemp || lowTemp == null) {
                    lowTemp = temp;
                }
            }
        }
        if (day === 3) {
            for (let i = 24; i < 32; i++) {
                const temp = Math.floor((((data.list[i].main.temp - 273.15) * 9) / 5) + 32);
                if (temp >= highTemp || highTemp == null) {
                    highTemp = temp;
                }
                if (temp <= lowTemp || lowTemp == null) {
                    lowTemp = temp;
                }
            }
        }
        if (day === 4) {
            for (let i = 32; i < 40; i++) {
                const temp = Math.floor((((data.list[i].main.temp - 273.15) * 9) / 5) + 32);
                if (temp >= highTemp || highTemp == null) {
                    highTemp = temp;
                }
                if (temp <= lowTemp || lowTemp == null) {
                    lowTemp = temp;
                }
            }
        }
        return [highTemp, lowTemp]
    }

    // Change day one card
    dayOne.text(dayjs().add(1, 'day').format("MMMM D, YYYY"));
    dayOneTemp.text(findTempExtrema(1)[0] + ", " + findTempExtrema(1)[1]);
    dayOneHumidity.text(data.list[1].main.humidity + "%");
    dayOneWind.text(Math.floor(data.list[1].wind.speed * 2.23694) + " mph");
    // Change day two card
    dayTwo.text(dayjs().add(2, 'day').format("MMMM D, YYYY"));
    dayTwoTemp.text(findTempExtrema(2)[0] + ", " + findTempExtrema(2)[1]);
    dayTwoHumidity.text(data.list[2].main.humidity + "%");
    dayTwoWind.text(Math.floor(data.list[2].wind.speed * 2.23694) + " mph");
    // Change day three card
    dayThree.text(dayjs().add(3, 'day').format("MMMM D, YYYY"));
    dayThreeTemp.text(findTempExtrema(3)[0] + ", " + findTempExtrema(3)[1]);
    dayThreeHumidity.text(data.list[3].main.humidity + "%");
    dayThreeWind.text(Math.floor(data.list[3].wind.speed * 2.23694) + " mph");
    // Change day four card
    dayFour.text(dayjs().add(4, 'day').format("MMMM D, YYYY"));
    dayFourTemp.text(findTempExtrema(4)[0] + ", " + findTempExtrema(4)[1]);
    dayFourHumidity.text(data.list[4].main.humidity + "%");
    dayFourWind.text(Math.floor(data.list[4].wind.speed * 2.23694) + " mph");

    // // Change day five card
    // dayFive.text(dayjs().add(5, 'day').format("MMMM D, YYYY"));
    // dayFiveTemp.text(Math.floor((((data.list[5].main.temp - 273.15) * 9) / 5) + 32));
    // dayFiveHumidity.text(data.list[5].main.humidity + "%");
    // dayFiveWind.text(Math.floor(data.list[5].wind.speed * 2.23694) + " mph");

    // Check if data has been previously looked up using retrieve parameter
    if (retrieve === false) {
        saveCity(data.city.name);
    }
}

var queryApi = function () {
    var cityName = citySearch.val();
    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=f712db1c8055a459e955a6153fa03a11";
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayData(data, false);
                });
            } else {
                currentCityTitle.text("No city found. Please enter a real place lol.");
            }
        })
}

citySubmitForm.on("click", queryApi);

citySearch.on('keypress', function (e) {
    if (e.which == 13) {
        e.preventDefault()
        queryApi()
    }
});

var retrieveData = function (event) {
    var city = $(event.target);
    cityName = city.text();
    var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=f712db1c8055a459e955a6153fa03a11";
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayData(data, true);
                });
            }
        })
}

cities.on("click", retrieveData);