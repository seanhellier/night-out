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

    // ajax request to ticketmaster 
    // variables for event ajax request 
    var eventQueryURL = "https://app.ticketmaster.com/discovery/v2/events?apikey=AHGfgxBdK3vAe03qYCGGX5HfyeUHC6g3&locale=*&startDateTime="+convertedStartDate+"Z&endDateTime="+convertedEndDate+"Z&classificationName=music&dmaId=345&sort=date,asc&keyword="+searchEventKeyword;
    $.ajax({
        url: eventQueryURL,
        method: "GET"
    }).then(function(response){
        console.log(response);
        for (var i=0; i < response._embedded.events.length; i++){
            //eventImageSrc = response._embedded.events[i].images[8].url
            eventName = response._embedded.events[i].name;
            eventVenue = response._embedded.events[i]._embedded.venues[0].name;
            eventAddress = response._embedded.events[i]._embedded.venues[0].address.line1+ " " + response._embedded.events[i]._embedded.venues[0].city.name+ ", " + response._embedded.events[i]._embedded.venues[0].state.name;
            eventDate = moment(response._embedded.events[i].dates.start.localDate, "YYYY-MM-DD").format("MMM Do YYYY");
            //eventPrice
            //eventURL --> to buy tickets
            //eventStartTime
            
            //testing
            console.log(eventVenue);

            // appending event information to page 
            var newEventElement = $("<div>");
            var eventNameElement = $("<h3>");
            eventNameElement.text(eventName);
            newEventElement.append(eventNameElement);
            var eventVenueElement = $("<h5>");
            eventVenueElement.text( eventVenue);
            newEventElement.append(eventVenueElement);
            var eventAddressElement = $("<p>")
            eventAddressElement.text("Address: " + eventAddress);
            newEventElement.append(eventAddressElement);
            var eventDateElement = $("<p>");
            eventDateElement.text("Date: " + eventDate);
            newEventElement.append(eventDateElement);
            newEventElement.addClass("border-bottom");
            $("#events-display").append(newEventElement);
        }
    });

})