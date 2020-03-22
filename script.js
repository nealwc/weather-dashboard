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
            var cityName = response.name // open weather API's city name
            var iconUrl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png"; // current weather icon
            var icon = $("<img>").attr("src", iconUrl);
            var fahrTemp = ((response.main.temp - 271.15) * 1.8 + 32).toFixed(1); // converts open weather API 
            var temp = $("<p>").html("Teperature: " + fahrTemp + " &deg;F");
            var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
            var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + " MPH");
            var date = new Date(response.dt*1000).toLocaleDateString("en-US"); // convert dt to date

            $("#city").append($("<h3>").text(cityName + " (" + date + ")"));
            $("#city").append(icon);
            $("#tempurature").append(temp);
            $("#humid").append(humidity);
            $("#wind").append(windSpeed);

            var lat = response.coord.lat; // grab lattitude from current weather API for UV Index API
            var lon = response.coord.lon; // grab longitude from current weather API for UV Index API
            var uvUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;

            $.ajax({
                url: uvUrl,
                method: "GET"
            })
                .then(function (response) {
                    console.log(response);
                    var UV = response.value;
                    var UVel = $("<p>").text("UV Index: ");
                    console.log(UV);

                    $("#uv-index").append(UVel);

                    //change background color of UV index depending on UV condition
                    // if (UV < 2) {
                    //     $("#uv-index").append(UV).attr("class", "badge badge-primary");
                    // } else if (UV >= 2 && UV < 5) {
                    //     $("#uv-index").append(UV).attr("class", "badge badge-warning");
                    // } else {
                    //     $("#uv-index").append(UV).attr("class", "bg-danger text-white");
                    // }
                    // })
                });

            $("#forecast").text("5-Day Forecast:")

            var fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=" + APIKey;

            $.ajax({
                url: fiveDayURL,
                method: "GET"

            })
                .then(function (response) {
                    console.log(response);

                })

        });
    });
