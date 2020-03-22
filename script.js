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
            var iconUrl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            var icon = $("<img>").attr("src", iconUrl);
            var temp = $("<p>").text("Teperature: " + response.main.temp);
            var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
            var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed);

            $("#city").append($("<p>").text(searchCity));
            $("#city").append(icon);
            $("#tempurature").append(temp);
            $("#humid").append(humidity);
            $("#wind").append(windSpeed);

            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;

            $.ajax({
                url: uvUrl,
                method: "GET"
            })
                .then(function (response) {
                    console.log(response);
                    var UV = $("<p>").text("UV Index: " + response.value);

                    $("#uv-index").append(UV);

                    // if (UV ) //change background color depend on UV condition
                })
        });

    var fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=" + APIKey;

    $.ajax({
        url: fiveDayURL,
        method: "GET"

    })
        .then(function (response) {
            console.log(response);

        })

});


