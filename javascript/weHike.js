(function() {
    var placesAutocomplete = places({
      appId: 'pl02J9DTRSCU',
      apiKey: 'f099e7b02e4b0724d8cdb3f3ff4b3307',
      container: document.querySelector('#address')
    });
  
    var $address = document.querySelector('#address-value')
    placesAutocomplete.on('change', function(e) {
      $address.textContent = e.suggestion.value
    });
  
    placesAutocomplete.on('clear', function() {
      $address.textContent = 'none';
    });
  
  })();


function getHikeInfo(lat, lon, rad) {

    var key = "200637782-30288d07ad9589c7fb834a4deb5b5a6e"
    var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + lat + "&lon=" + lon + "&maxDistance=" + 10 + "&key=" + key;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data
        console.log(results[0])
        $("#inputHikes").clear()
        for (let i = 0; i < results.length; i++) {
            const hikeDiv = $("<div>")

            var name = $("<div>").text("Distance: " + results[i].name)
            var dist = $("<div>").text("Distance: " + results[i].length)

            var trailImage = $("<img>")
            topicImage.attr("src", results[i].imgSqSmall)

            hikeDiv.append(name);
            hikeDiv.append(topicImage)

            $("#inputHikes").append(hikeDiv)
        }

    });

}