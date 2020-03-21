$(".search").on("click", function () {
    var searchCity = $("#search-input").val();
    console.log(searchCity);

    var newDiv = $("<div>").text(searchCity);
    // $("#search-input").empty();
    $("#search-list").prepend(newDiv);

    var APIKey = "75900bea1841f363eb7e4ff8ed89560d";

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
        searchCity + "&appid=" + APIKey;

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            console.log(response);
            console.log(response.name);
            var city = $("<h3>").text(searchCity);
            var temp = $("<p>").text("Teperature: " + response.main.temp);
            var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
            var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed);
            var UVIndex = $("<p>").text("")
            $("#current-weather").append(city);
            $("#current-weather").append(temp);
            $("#current-weather").append(humidity);
            $("#current-weather").append(windSpeed);
            $("#current-weather").append(UVIndex);

        });

});


