var latlng;
var longitude;
var latitude;

(function () {
  var placesAutocomplete = places({
    appId: 'pl02J9DTRSCU',
    apiKey: 'f099e7b02e4b0724d8cdb3f3ff4b3307',
    container: document.querySelector('#address')
  });

  var $address = document.querySelector('#address-value')
  placesAutocomplete.on('change', function (e) {
    $address.textContent = e.suggestion.value
    latlng = e.suggestion.latlng;
    latitude = latlng.lat;
    longitude = latlng.lng;
    console.log(latlng);
    console.log("latitude: ", latitude);
    console.log("longitude: ", longitude);
    getHikeInfo(latitude, longitude, 10)
  });

  placesAutocomplete.on('clear', function () {
    $address.textContent = 'none';

  });

})();


function getHikeInfo(lat, lon, rad) {
  //constructs query
  var queryURL = "https://www.hikingproject.com/data/get-trails?"
  queryURL += "lat=" + lat
  queryURL += "&lon=" + lon
  queryURL += "&maxDistance=" + rad
  queryURL += "&sort=" + "quality" //can be quality or distance 
  queryURL += "&minLength=" + 0
  queryURL += "&key=200637782-30288d07ad9589c7fb834a4deb5b5a6e"
  console.log(queryURL)
  //runs query
  $.ajax({
    url: queryURL,
    method: "GET"

  }).then(function (response) //hiking trail data
  {
    console.log('response');
    console.log(response);
    var results = response.trails
    $("#inputHikes").empty()
    //loops through all the returned trails
    for (let i = 0; i < results.length; i++) {
      //for ea. hiking trail save lat/long to these variable
      latitude = results[i].latitude;
      longitude = results[i].longitude;
      var weatherURL = "http://api.weatherbit.io/v2.0/current";
      weatherURL = weatherURL + "?key=fb86184ee63d4019a19812bec4768676";
      weatherURL = weatherURL + "&lat=" + latitude + "&lon=" + longitude;
      weatherURL = weatherURL + "&units=I";
      $.ajax
        ({
          url: weatherURL,
          method: "GET",
          async: false,
          datatype: JSON,
        }).then(function (WeatherResponse) {
          console.log('WeatherResponse');
          console.log(WeatherResponse);
          var weather = WeatherResponse.data[0].temp;
          const hikeDiv = $("<div class='eachhike'>")
          //adds Identifiers for Yelp API
          hikeDiv.addClass("hike")
          hikeDiv.attr("lat", results[i].latitude)
          hikeDiv.attr("lon", results[i].longitude)
          //adds trail name and distance
          var name = $("<br><h3>").append($("<a>").text(results[i].name).attr("href", results[i].url))
          var summary = $("<p>").text(results[i].summary)
          var dist = $("<p class='inline'>").text("Distance: " + results[i].length + " miles,  ")
          var wh = $("<p>").text("Weather: " + weather);
          //adds trail image
          var trailImage = $("<img>")
          trailImage.attr("src", results[i].imgSmall)
          trailImage.addClass("trail-pic")
          //appends trail to page
          hikeDiv.append(name);
          hikeDiv.append(summary)
          hikeDiv.append(dist);
          hikeDiv.append(wh);
          hikeDiv.append(trailImage)
          $("#inputHikes").append(hikeDiv)
        })
    }
  });
}