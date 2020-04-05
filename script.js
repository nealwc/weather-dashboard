$(".search").on("click", function () {
    // clear previous search results
    $("#city").empty();
    $("#temperature").empty()
    $("#humid").empty()
    $("#wind").empty()
    $("#wind").empty()
    $("#uv-index").empty()

    var searchCity = $("#search-input").val();
    console.log(searchCity);

    var newDiv = $("<div>").text(searchCity);
    // $("#search-input").empty();
    $("#search-list").prepend(newDiv);

    $("#current-weather").attr("class", "card border-secondary mb-3"); // format curent weather in a bootstrap card
    $("#five-day").attr("class", "card border-secondary mb-3"); // format five day forcast in a bootstrap card

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
            var iconUrl = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"; // current weather icon
            var icon = $("<img>").attr("src", iconUrl);
            var fahrTemp = ((response.main.temp - 271.15) * 1.8 + 32).toFixed(1); // converts open weather API 
            var temp = $("<p>").html("Teperature: " + fahrTemp + " &deg;F");
            var humidity = $("<p>").text("Humidity: " + response.main.humidity + "%");
            var windSpeed = $("<p>").text("Wind Speed: " + response.wind.speed + " MPH");
            var date = new Date(response.dt * 1000).toLocaleDateString("en-US"); // convert dt to date

            $("#city").append($("<h3>").text(cityName + " (" + date + ")"));
            $("#city").append(icon);
            $("#temperature").append(temp);
            $("#humid").append(humidity);
            $("#wind").append(windSpeed);

            var lat = response.coord.lat; // grab lattitude from current weather API for UV Index API
            var lon = response.coord.lon; // grab longitude from current weather API for UV Index API
            var uvUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=" + APIKey + "&lat=" + lat + "&lon=" + lon;

            $.ajax({
                url: uvUrl,
                method: "GET"
            })
                .then(function (response) {
                    console.log(response);
                    var UV = response.value;
                    var UVel = $("<p>").text("UV Index: " + UV);
                    console.log(UV);

                    $("#uv-index").append(UVel);

                    // change background color of UV index depending on UV condition
                    // if (UV < 2) {
                    //     $("#uv-index").append(UV).attr("style", "backgound: green");
                    // } else if (UV >= 2 && UV < 5) {
                    //     $("#uv-index").append(UV).attr("style", "backgound: green");
                    // } else {
                    //     $("#uv-index").append(UV).attr("style", "backgound: green");
                    // }
                    })
                });

            $("#forecast").text("5-Day Forecast:")

            var fiveDayURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + searchCity + "&appid=" + APIKey;

            $.ajax({
                url: fiveDayURL,
                method: "GET"

            })
                .then(function (response) {
                    console.log(response);
                    for (i = 0; i < 5; i++) {
                        var date = new Date(response.list[i].dt * 1000).toLocaleDateString("en-US"); // future date
                        // var iconUrl = "https://openweathermap.org/img/w/" + response.list[i].weather[i].icon + ".png"; // future weather icon
                        // var icon = $("<img>").attr("src", iconUrl);
                        var temp = $("<div>").html("Temperature: " + ((response.list[i].main.temp - 271.15) * 1.8 + 32).toFixed(1) + " &deg;F");
                        var humidity = $("<div>").text("Humidity: " +response.list[i].main.humidity + "%");
                        var newCard = $("<div>").attr("class", "card");
                        var newCardBody = $("<div>").attr("class", "card-body bg-primary text-white");
                        
                        
                        $("#five-day").append(date);
                        // $("#five-day").append(icon);
                        $("#five-day").append(temp);
                        $("#five-day").append(humidity);

                        console.log(date);
                        console.log(temp);
                        console.log(humidity);


                    }

                })

        });
