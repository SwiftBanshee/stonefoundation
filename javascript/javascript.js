
function openNav() {
    if (window.matchMedia("(max-width: 1000px)").matches) {
        document.getElementById("mySidebar").style.width = "80%";
    }
    else{
        document.getElementById("mySidebar").style.width = "250px";
    }
 // document.getElementById("main").style.marginLeft = "250px"; //if we want sidebar to move with it 
 /* document.body.style.backgroundColor = "rgba(0,0,0,0.4)";*/
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft= "0";
  document.body.style.backgroundColor = "white";
}

window.addEventListener("resize", function(){
    if (window.screen.width < 800)
        document.getElementById("btn").innerHTML = "☰";
    else
        document.getElementById("btn").innerHTML = "☰ open sidebar";

});

function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsRenderer = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: {lat: 44, lng: -78}
    });
    directionsRenderer.setMap(map);

    document.getElementById('submit').addEventListener('click', function() {
      calculateAndDisplayRoute(directionsService, directionsRenderer);
    });
  }

  function calculateAndDisplayRoute(directionsService, directionsRenderer) {

    directionsService.route({
      origin: document.getElementById('start').value,
      destination: document.getElementById('end').value,
      travelMode: 'TRANSIT'
    }, function(response, status) {
      if (status === 'OK') {
        directionsRenderer.setDirections(response);
        var route = response.routes[0];
        var summaryPanel = document.getElementById('directions-panel');
        summaryPanel.innerHTML = '';
        // For each route, display summary information.
        for (var i = 0; i < route.legs.length; i++) {
          var routeSegment = i + 1;
          summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
              '</b><br>';
          summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
          summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
          summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
        }
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }