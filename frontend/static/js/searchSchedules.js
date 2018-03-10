//JS search for route and display real time departure dates, trip info and
intervalId = null;
lat_dest = null;
lng_dest = null;
lat_org = null;
lng_org = null;
document.getElementById("map").innerHTML = " ";
setInterval(function () {document.getElementById("searchSchedules").onclick();}, 30000);
document.getElementById("searchSchedules").onclick = function () {
        var filterDepartureStation = document.getElementById("departureStation").value;
        var filterArrivalStation = document.getElementById("arrivalStation").value;

        if (filterDepartureStation =='Select' || filterArrivalStation=="Select") {
            document.getElementById("results").innerHTML = "Select both Arrival and Departure station ";
            clearInterval(intervalId);
            document.getElementById("Countdown").innerHTML = " ";
            document.getElementById("map").innerHTML = " ";

        }
        else if ((filterDepartureStation!='Select') && ((filterDepartureStation==filterArrivalStation) || (filterArrivalStation==filterDepartureStation))) {
            document.getElementById("results").innerHTML = "Arrival and Departure stations cant be the same ";
            document.getElementById("Countdown").innerHTML = " ";
            clearInterval(intervalId);
            document.getElementById("map").innerHTML = " ";
        }
        else
        {
            getLatLngDest(filterArrivalStation);
            getLatLngOrigin(filterDepartureStation);
            initMap();
            $.ajax({
                    url: "http://suryarajasekaran.com:8881/trips?source="+filterDepartureStation+"&dest="+filterArrivalStation,
                    type: "GET",
                    //contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    cache: false,
                    success: function(result) {
                        document.getElementById("results").innerHTML = " ";
                        var dataset = result.data;
                        var results = document.getElementById("results");
                        var fare,CO2,timetaken,bike,lineno;
                        for(var i = 0; i < dataset.length; i++) {
                            var opt = document.createElement('option');
                            document.getElementById("fares").innerHTML =" <h5>For the selected stations,<br> </h5> BART Blue Ticket Fare :" + String(dataset[0]["@fare"]);
                            document.getElementById("CO2").innerHTML ="CO2 emission is : " + String(dataset[0]["@co2"]);
                            document.getElementById("timetaken").innerHTML = "Estimated Minutes of trip :" + String(dataset[0]["@tripTime"]);
                            timer(dataset[0]["@origTimeMin"]);
                            opt.innerHTML = "Leg "+(i+1)+": <br> &emsp;|&emsp;Departure Time : " +String(dataset[i]["@origTimeMin"] + "&emsp;|&emsp;"+"Arrival Time : " + dataset[i]["@destTimeMin"]);
                            dataset[0].leg['@bikeflag']
                            opt.value = "Leg "+(i+1)+": &emsp;|&emsp;Departure Time : " +String(dataset[i]["@origTimeMin"] + "&emsp;|&emsp;"+"Arrival Time : " + dataset[i]["@destTimeMin"]);
                            results.appendChild(opt);
                        }

                    },
                    error: function() {
                        console.log("SeachSchedules.js error");
                    },
            });
        }
};

function timer(destTimeHours) {

    var currentTime = new Date();
    var day = currentTime.getDate();
    var month = currentTime.getMonth();
    var year = currentTime.getFullYear();
    var hour = convert_to_24h(destTimeHours)[0]
    var min = convert_to_24h(destTimeHours)[1]
    var countDownDate = new Date(year,month,day,hour,min).getTime();
 //clearing the values so that two events dont run or overlap with previous events
    var x = setInterval(function() {
        if (intervalId != x && intervalId != null){
            clearInterval(intervalId);
        }
        intervalId = x;
        var now = new Date().getTime();
         distance=countDownDate - now;
         var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // Output the result element with id="Countdown"
        document.getElementById("Countdown").innerHTML = "Time left till the next train departs:"+days + "d " + hours + "h "+ minutes + "m " + seconds + "s ";
        if (distance < 0) {
            clearInterval(x);
            clearInterval(window.refreshIntervalId);
            document.getElementById("Countdown").innerHTML = "Your Train has departed";
        }
    }, 1000);
  };

function convert_to_24h(time_str) {
    // Convert a string like 10:05 PM to 24h format, returns like [22,5]
    var time = time_str.match(/(\d+):(\d+) (\w)/);
    var hours = Number(time[1]);
    var minutes = Number(time[2]);
    var meridian = time[3].toLowerCase();

    if (meridian == 'p' && hours < 12) {
      hours += 12;
    }
    else if (meridian == 'a' && hours == 12) {
      hours -= 12;
    }
    return [hours, minutes];
  };


function initMap() {
    console.log("init"+lat_org)
    console.log("init"+lng_org)
    if (lat_org == null || lat_dest == null || lng_org == null || lng_dest == null){
        document.getElementById("map").innerHTML = " ";
   }
   else{
   document.getElementById("map").innerHTML = " ";
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 14,
      center: {lat: lat_org, lng: lng_org}
    });
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  }
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    console.log("calc"+lat_org)
    console.log("calc"+lng_org)
    var selectedMode = "TRANSIT";
    directionsService.route({
      origin: {lat: lat_org, lng: lng_org},
      destination: {lat: lat_dest, lng: lng_dest},
      travelMode: google.maps.TravelMode[selectedMode],
      transitOptions: {
        modes: ['RAIL']
      },
    }, function(response, status) {
      if (status == 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
}

function getLatLngOrigin(station){
    $.ajax({
        url: "http://suryarajasekaran.com:8881/station?source="+station,
        type: "GET",
        async: false,
        //contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function(result) {
            lat_org = parseFloat(result.data.gtfs_latitude);
            lng_org = parseFloat(result.data.gtfs_longitude);
            console.log("get"+lat_org)
            console.log("get"+lng_org)
       },
        error: function() {
            console.log(" LatLongOrigin error");
        },

    });
}

function getLatLngDest(station){
    $.ajax({
        url: "http://suryarajasekaran.com:8881/station?source="+station,
        type: "GET",
        async: false,
        //contentType: "application/json; charset=utf-8",
        dataType: "json",
        cache: false,
        success: function(result) {
            lat_dest = parseFloat(result.data.gtfs_latitude);
            lng_dest = parseFloat(result.data.gtfs_longitude);
       },
        error: function() {
            console.log(" LatLOngDest error");
        },

    });
}