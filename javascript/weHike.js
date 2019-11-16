function getHikeInfo(lat, lon, rad) {

    var queryURL = "https://www.hikingproject.com/data/get-trails?"
    queryURL += "lat=" + lat
    queryURL += "&lon=" + lon
    queryURL += "&maxDistance=" + rad
    queryURL += "&sort=" + "quality" //can be quality or distance 
    queryURL += "&minLength=" + 0
    queryURL += "&key=200637782-30288d07ad9589c7fb834a4deb5b5a6e"


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data
        console.log(results[0])
        $("#inputHikes").clear()
        for (let i = 0; i < results.length; i++) {
            const hikeDiv = $("<div>")
            hikeDiv.addClass("hike")
            hikeDiv.attr("lat", results[i].latitude)
            hikeDiv.attr("lon", results[i].longitude)

            var name = $("<div>").text(results[i].name)
            var dist = $("<div>").text("Distance: " + results[i].length)

            var trailImage = $("<img>")
            topicImage.attr("src", results[i].imgSqSmall)

            hikeDiv.append(name);
            hikeDiv.append(dist)
            hikeDiv.append(trailImage)

            $("#inputHikes").append(hikeDiv)
        }

    });

}