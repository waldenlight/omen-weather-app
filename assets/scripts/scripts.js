//#region Aside 
// City search
var citySubmitForm = $("#submit-button");
var citySearch = $("#city-search");
// Aside Cities
var cityOne = $("#city-one");
var cityTwo = $("#city-two");
var cityThree = $("#city-three");
//#endregion
//#region Current City
// City Name
var mainCityTitle = $('#main-city-name');
// Current
var currentCityTitle = $('#current-city-name');
var currentTemperature = $('#current-temperature');
var currentHumidity = $('#current-humidity');
var currentWind = $('#current-wind');
// Day One
var dayOne = $("#day-one-title");
var dayOneTemp = $("#day-one-temperature");
var dayOneHumidity = $("#day-one-humidity");
var dayOneWind = $("#day-one-wind");
// Day Two
var dayTwo = $("#day-two-title");
var dayTwoTemp = $("#day-two-temperature");
var dayTwoHumidity = $("#day-two-humidity");
var dayTwoWind = $("#day-two-wind");
// Day Three
var dayThree = $("#day-three-title");
var dayThreeTemp = $("#day-three-temperature");
var dayThreeHumidity = $("#day-three-humidity");
var dayThreeWind = $("#day-three-wind");
// Day Four
var dayFour = $("#day-four-title");
var dayFourTemp = $("#day-four-temperature");
var dayFourHumidity = $("#day-four-humidity");
var dayFourWind = $("#day-four-wind");
// Day Five
var dayFive = $("#day-five-title");
var dayFiveTemp = $("#day-five-temperature");
var dayFiveHumidity = $("#day-five-humidity");
var dayFiveWind = $("#day-five-wind");
//#endregion

var displayData = function (data) {
    if (data.length === 0) {
        currentCityTitle.text("No city found. Please enter a real place lol.");
        return
    }
    // Change current card
    currentCityTitle.text(data.city.name);
    currentTemperature.text(Math.floor((((data.list[0].main.temp - 273.15) * 9) / 5) + 32));
    currentHumidity.text(data.list[0].main.humidity + "%");
    currentWind.text(Math.floor(data.list[0].wind.speed * 2.23694) + " mph");
    // Change Day One Card
    // ADD day of the week
    dayOneTemp.text(Math.floor((((data.list[1].main.temp - 273.15) * 9) / 5) + 32));
    dayOneHumidity.text(data.list[1].main.humidity + "%");
    console.log(data.list[1].wind.speed)
    dayOneWind.text(Math.floor(data.list[1].wind.speed * 2.23694) + " mph");
    // Change Day One Card
    // ADD day of the week
    dayTwoTemp.text(Math.floor((((data.list[2].main.temp - 273.15) * 9) / 5) + 32));
    dayTwoHumidity.text(data.list[2].main.humidity + "%");
    dayTwoWind.text(Math.floor(data.list[2].wind.speed * 2.23694) + " mph");
    // Change Day One Card
    // ADD day of the week
    dayThreeTemp.text(Math.floor((((data.list[3].main.temp - 273.15) * 9) / 5) + 32));
    dayThreeHumidity.text(data.list[3].main.humidity + "%");
    dayThreeWind.text(Math.floor(data.list[3].wind.speed * 2.23694) + " mph");
    // Change Day One Card
    // ADD day of the week
    dayFourTemp.text(Math.floor((((data.list[4].main.temp - 273.15) * 9) / 5) + 32));
    dayFourHumidity.text(data.list[4].main.humidity + "%");
    dayFourWind.text(Math.floor(data.list[4].wind.speed * 2.23694) + " mph");
    // Change Day One Card
    // ADD day of the week
    dayFiveTemp.text(Math.floor((((data.list[5].main.temp - 273.15) * 9) / 5) + 32));
    dayFiveHumidity.text(data.list[5].main.humidity + "%");
    dayFiveWind.text(Math.floor(data.list[5].wind.speed * 2.23694) + " mph");
}

var queryApi = function () {
    var cityName = citySearch.val();
    var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=f712db1c8055a459e955a6153fa03a11";
    fetch(url)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayData(data);
                });
            } else {
                currentCityTitle.text("No city found. Please enter a real place lol.");
            }
        })

}

citySubmitForm.on("click", queryApi);
