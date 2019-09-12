// datepicker function
$( function() {
    var dateFormat = "mm/dd/yy",
      from = $( "#from" )
        .datepicker({
          defaultDate: "0",
          changeMonth: true,
          numberOfMonths: 1
        })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
        }),
      to = $( "#to" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 1
      })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      });
 
    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }
 
      return date;
    }
});

// Attach click event to "search" button
$("#search-events").on("click", function(event){
    event.preventDefault();
    // set user input values to variables
    var searchEventKeyword = $("#search-keyword").val().trim()
    var startDate = $("#from").val();
    var endDate = $("#to").val();
    // testing
    console.log(searchEventKeyword);
    console.log(startDate);
    console.log(endDate);
    // converting input of startDate and endDate to formats acceptable to the ticketmaster API
    var convertedStartDate = moment(startDate, "MM/DD/YYYY").format("YYYY-MM-DDTHH:mm:ss");
    var convertedEndDate = moment(endDate, "MM/DD/YYYY").format("YYYY-MM-DDTHH:mm:ss");
    //testing
    console.log(convertedStartDate);
    console.log(convertedEndDate);
    //event Counter
    var eventCounter = 0;

    // ajax request to ticketmaster 
    // variables for event ajax request 
    var eventQueryURL = "https://app.ticketmaster.com/discovery/v2/events?apikey=AHGfgxBdK3vAe03qYCGGX5HfyeUHC6g3&locale=*&startDateTime="+convertedStartDate+"Z&endDateTime="+convertedEndDate+"Z&classificationName=music&city=New%20York&sort=date,asc&keyword="+searchEventKeyword;
    $.ajax({
        url: eventQueryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        $("#events-display").html("<h3>Your search returned " +response._embedded.events.length+ " results. </h3>");
        $("h3").addClass("border-bottom");
        for (var i=0; i < response._embedded.events.length; i++){
            var eventImageSrc = response._embedded.events[i].images[8].url;
            var eventName = response._embedded.events[i].name;
            var eventVenue = response._embedded.events[i]._embedded.venues[0].name;
            var eventAddress = response._embedded.events[i]._embedded.venues[0].address.line1+ " " + response._embedded.events[i]._embedded.venues[0].city.name+ ", " + response._embedded.events[i]._embedded.venues[0].state.name;
            var eventDate = moment(response._embedded.events[i].dates.start.localDate, "YYYY-MM-DD").format("MMM Do YYYY");
            //eventPrice
            //eventURL --> to buy tickets
            //eventStartTime
            
            //testing
            console.log(eventVenue);

            // appending event information to page 
            var newEventElement = $("<div>").attr("id", "event-"+eventCounter);
            var eventImage = $("<img>").attr("src", eventImageSrc).css("height", "100px").addClass("float-right ml-2");
            newEventElement.append(eventImage);
            var eventNameElement = $("<h4>").text(eventName);
            newEventElement.append(eventNameElement);
            var eventVenueElement = $("<h5>").text( eventVenue);
            newEventElement.append(eventVenueElement);
            var eventAddressElement = $("<p>").text("Address: " + eventAddress);
            newEventElement.append(eventAddressElement);
            var eventDateElement = $("<p>").text("Date: " + eventDate);
            newEventElement.append(eventDateElement);
            var detailsBtn = $("<button>").text("Show Weather").addClass("mb-2 btn btn-primary show-weather");
            detailsBtn.attr("data-address", eventAddress);
            detailsBtn.attr("data-date", eventDate);
            detailsBtn.attr("data-event", eventCounter);
            newEventElement.append(detailsBtn);
            newEventElement.addClass("border-bottom mt-2");
            $("#events-display").append(newEventElement);
            eventCounter++;
        }
    });

});

//Attach click event to "clear results" button
$("#clear-results").on("click", function (event){
  event.preventDefault();
  $("#events-display").empty();
  $("#search-keyword").val("");
  $("#to").val("");
  $("#from").val("");
});

// Attach click event to Show Details buttons 
$(document).on("click", ".show-weather", function(){
  var thisEventAddress = $(this).attr("data-address");
  var eventDate = $(this).attr("data-date");
  var thisEventDate = moment(eventDate, "MMM Do YYYY").format("YYYY-MM-DD");
  var thisEventNumber = $(this).attr("data-event");
  console.log(thisEventAddress);
  console.log(thisEventDate);

  var weatherElement =$("<div>").addClass("card text-center m-2").css("width", "230px");
  var innerWeatherElement = $("<div>").addClass("card-body");
  $("#event-"+thisEventNumber).append(weatherElement);
  weatherElement.append(innerWeatherElement);
  var weatherQueryURL = "https://api.weatherbit.io/v2.0/forecast/daily?city=New+York,NY&key=5a5ea84d5dec48e7bb74f8da7dab4a96&units=I";

  $.ajax({
    url: weatherQueryURL,
    method: "GET"
  }).then(function (results){
    console.log(results);
    for (var i=0; i < results.data.length; i++){
      if (results.data[i].datetime === thisEventDate) {
        var temp = results.data[i].temp;
        var weatherDescription = results.data[i].weather.description;
        var weatherIcon = "https://www.weatherbit.io/static/img/icons/" + results.data[i].weather.icon + ".png";
        console.log(temp);
        var tempText = $("<p>").addClass("card-text").text("The temperature will be " + temp + " degrees Fahrenheit.");
        var weatherDescriptionText = $("<p>").addClass("card-text").text(weatherDescription);
        var weatherIconElement = $("<img>").attr("src", weatherIcon);
        innerWeatherElement.append(tempText);
        innerWeatherElement.append(weatherIconElement);
        innerWeatherElement.append(weatherDescriptionText);
      }
    }
  })
});
