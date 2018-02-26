
function recaptchaCallback() {
  document.getElementById("submit").removeAttribute("disabled");
}

var Module = (function () {

  firebase.initializeApp({
    "apiKey": "AIzaSyBhifPuU09GpDgshChybUMWiLw6GsTfc4o",
    "databaseURL": "https://althea-locator.firebaseio.com",
    "storageBucket": "althea-locator.appspot.com",
    "authDomain": "althea-locator.firebaseapp.com",
    "messagingSenderId": "569457338008",
    "projectId": "althea-locator"
  });
  var emailAddr = document.getElementById("user_email_input");
  var firstName = document.getElementById("user_fname_input");
  var lastName = document.getElementById("user_lname_input");
  var country = document.getElementById("user_country_menu");
  var city = document.getElementById("user_city_input");
  var zipCode = document.getElementById("user_zip_code_input");

  function initMap() {
    // Initialize blank map with markers
    resetView();

    geocoder = new google.maps.Geocoder();

    document.getElementById("submit").addEventListener("click", function () {
      address = city.value + " " + zipCode.value + " " + country.value;
      geocodeAddress(geocoder, map);
    });
  }

  function resetView() {
    map = new google.maps.Map(document.getElementById("map"), {
      center: {
        lat: 15,
        lng: 0
      },
      zoom: 2
    });

    let markerArr = [];

    markerCluster = new MarkerClusterer(map, markerArr, {
      imagePath: "./resources/m"
    });

    readFromFirebase(map);

    return map;
  }

  function readFromFirebase(map) {
    markerArr = [];

    // Query data base for stored location
    var fireDataBase = firebase
      .database()
      .ref()
      .child("Markers/");

    fireDataBase.on("child_added", function (snapshot) {
      var storedData = snapshot.val();

      // Updates map with stored marker
      var marker = new google.maps.Marker({
        position: {
          lat: parseFloat(storedData.GPS_Coordinates.Latitude),
          lng: parseFloat(storedData.GPS_Coordinates.Longitude)
        }
      });
      marker.setMap(map);
      markerArr.push(marker);
      markerCluster.addMarkers(markerArr);
    });
  }

  // Convert address to Lat/ Lng
  function geocodeAddress(geocoder, resultsMap) {
    geocoder.geocode(
      {
        address: address
      },
      function (results, status) {
        if (status === "OK") {
          resultsMap.setCenter(results[0].geometry.location);
          resultsMap.setZoom(14);
        } else {
          alert(
            "Geocode was not successful for the following reason: " + status
          );
        }
      }
    );
  }

  return {
    initMap: initMap,
    resetView: resetView,
  };
})();
