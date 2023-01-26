//#region Aside 
// City search
var citySubmitForm = $("#submit-button");
var citySearch = $("#city-search");
// Aside Cities
var cities = $('.cities');
var cityOne = $("#city-one");
var cityOneDiv = $('#city-one-div');
var cityTwo = $("#city-two");
var cityTwoDiv = $('#city-two-div');
var cityThree = $("#city-three");
var cityThreeDiv = $('#city-three-div');
//#endregion
//#region Current City
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
    cityTwo.text(cityTwoObject.name);
    cityThree.text(cityThreeObject.name);
}

// Populate Cities
var populateSearchHistory = function () {
    if (localStorage.getItem("cityOne")) {
        setHistory();
    } else {
        return
    }
}
populateSearchHistory();

var displayData = function (data, retrieve) {
    if (data.length === 0) {
        currentCityTitle.text("No city found. Please enter a real place lol.");
        return
    }
    // Change current card
    currentCityTitle.text(data.city.name);
    currentTemperature.text(Math.floor((((data.list[0].main.temp - 273.15) * 9) / 5) + 32));
    currentHumidity.text(data.list[0].main.humidity + "%");
    currentWind.text(Math.floor(data.list[0].wind.speed * 2.23694) + " mph");
    // Set current icon
    if (data.list[0].weather[0].description === "clear sky" || data.list[0].weather[0].description === "few clouds") {
        currentIcon.attr("class", "fa-solid fa-sun")
    } else if (data.list[0].weather[0].description === "scattered clouds" || data.list[0].weather[0].description === "overcast clouds") {
        currentIcon.attr("class", "fa-solid fa-cloud")
    } else if (data.list[0].weather[0].description === "shower rain" || data.list[0].weather[0].description === "rain") {
        currentIcon.attr("class", "fa-solid fa-raindrops")
    }
    // Change day one card
    dayOne.text(dayjs().add(1, 'day').format('dddd'));
    dayOneTemp.text(Math.floor((((data.list[1].main.temp - 273.15) * 9) / 5) + 32));
    dayOneHumidity.text(data.list[1].main.humidity + "%");
    dayOneWind.text(Math.floor(data.list[1].wind.speed * 2.23694) + " mph");
    // Set day one icon
    if (data.list[1].weather[0].description === "clear sky" || data.list[1].weather[0].description === "few clouds") {
        dayOneIcon.attr("class", "fa-solid fa-sun")
    } else if (data.list[1].weather[0].description === "scattered clouds" || data.list[1].weather[0].description === "overcast clouds") {
        dayOneIcon.attr("class", "fa-solid fa-cloud")
    } else if (data.list[1].weather[0].description === "shower rain" || data.list[1].weather[0].description === "rain") {
        dayOneIcon.attr("class", "fa-solid fa-raindrops")
    }
    // Change day two card
    dayTwo.text(dayjs().add(2, 'day').format('dddd'));
    dayTwoTemp.text(Math.floor((((data.list[2].main.temp - 273.15) * 9) / 5) + 32));
    dayTwoHumidity.text(data.list[2].main.humidity + "%");
    dayTwoWind.text(Math.floor(data.list[2].wind.speed * 2.23694) + " mph");
    // Set day two icon
    if (data.list[2].weather[0].description === "clear sky" || data.list[2].weather[0].description === "few clouds") {
        dayTwoIcon.attr("class", "fa-solid fa-sun")
    } else if (data.list[2].weather[0].description === "scattered clouds" || data.list[2].weather[0].description === "overcast clouds") {
        dayTwoIcon.attr("class", "fa-solid fa-cloud")
    } else if (data.list[2].weather[0].description === "shower rain" || data.list[2].weather[0].description === "rain") {
        dayTwoIcon.attr("class", "fa-solid fa-raindrops")
    }
    // Change day three card
    dayThree.text(dayjs().add(3, 'day').format('dddd'));
    dayThreeTemp.text(Math.floor((((data.list[3].main.temp - 273.15) * 9) / 5) + 32));
    dayThreeHumidity.text(data.list[3].main.humidity + "%");
    dayThreeWind.text(Math.floor(data.list[3].wind.speed * 2.23694) + " mph");
    // Set day three icon
    if (data.list[3].weather[0].description === "clear sky" || data.list[3].weather[0].description === "few clouds") {
        dayThreeIcon.attr("class", "fa-solid fa-sun")
    } else if (data.list[3].weather[0].description === "scattered clouds" || data.list[3].weather[0].description === "overcast clouds") {
        dayThreeIcon.attr("class", "fa-solid fa-cloud")
    } else if (data.list[3].weather[0].description === "shower rain" || data.list[3].weather[0].description === "rain") {
        dayThreeIcon.attr("class", "fa-solid fa-raindrops")
    }
    // Change day four card
    dayFour.text(dayjs().add(4, 'day').format('dddd'));
    dayFourTemp.text(Math.floor((((data.list[4].main.temp - 273.15) * 9) / 5) + 32));
    dayFourHumidity.text(data.list[4].main.humidity + "%");
    dayFourWind.text(Math.floor(data.list[4].wind.speed * 2.23694) + " mph");
    // Set day four icon
    if (data.list[4].weather[0].description === "clear sky" || data.list[4].weather[0].description === "few clouds") {
        dayFourIcon.attr("class", "fa-solid fa-sun")
    } else if (data.list[4].weather[0].description === "scattered clouds" || data.list[4].weather[0].description === "overcast clouds") {
        dayFourIcon.attr("class", "fa-solid fa-cloud")
    } else if (data.list[4].weather[0].description === "shower rain" || data.list[4].weather[0].description === "rain") {
        dayFourIcon.attr("class", "fa-solid fa-raindrops")
    }
    // Change day five card
    dayFive.text(dayjs().add(5, 'day').format('dddd'));
    dayFiveTemp.text(Math.floor((((data.list[5].main.temp - 273.15) * 9) / 5) + 32));
    dayFiveHumidity.text(data.list[5].main.humidity + "%");
    dayFiveWind.text(Math.floor(data.list[5].wind.speed * 2.23694) + " mph");
    // Set day five icon
    if (data.list[5].weather[0].description === "clear sky" || data.list[5].weather[0].description === "few clouds") {
        dayFiveIcon.attr("class", "fa-solid fa-sun")
    } else if (data.list[5].weather[0].description === "scattered clouds" || data.list[5].weather[0].description === "overcast clouds") {
        dayFiveIcon.attr("class", "fa-solid fa-cloud")
    } else if (data.list[5].weather[0].description === "shower rain" || data.list[5].weather[0].description === "rain") {
        dayFiveIcon.attr("class", "fa-solid fa-raindrops")
    }

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