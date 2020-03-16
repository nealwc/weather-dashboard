$(".search").on("click", function () {
    var searchCity = $("#search-input").val();
    var newDiv = $("<div>").text(searchCity);
    $("#search-input").empty();
    $("#search-list").prepend(newDiv);

});