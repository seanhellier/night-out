var query = "music";
var queryURL = "https://app.ticketmaster.com/discovery/v2/events?apikey=AHGfgxBdK3vAe03qYCGGX5HfyeUHC6g3&locale=*&startDateTime=2019-09-05T19:38:00Z&endDateTime=2019-09-07T19:38:00Z&classificationName="+query+ "&dmaId=345"
var eventName;
var eventVenue;
var eventAddress;
var eventDate;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    console.log(response);
    for (var i=0; i < response._embedded.events.length; i++){
        eventName = response._embedded.events[i].name;
        // eventVenue = response._embedded.events[i]._embedded.venues[0].name;
        eventAddress = response._embedded.events[i]._embedded.venues[0].address.line1;
        eventDate = response._embedded.events[i].dates.start.localDate;

        var newEventElement = $("<div>");
        var eventNameElement = $("<h3>");
        eventNameElement.text(eventName);
        newEventElement.append(eventNameElement);
        // var eventVenueElement = $("<h4>");
        // eventVenueElement.text(eventVenue);
        // newEventElement.append("Venue: " + eventVenueElement);
        var eventAddressElement = $("<p>")
        eventAddressElement.text("Address: " + eventAddress);
        newEventElement.append(eventAddressElement);
        var eventDateElement = $("<p>");
        eventDateElement.text("Date: " + eventDate);
        newEventElement.append(eventDateElement);
        $("#events-display").append(newEventElement);
    }
    
});

// eventAddress= response._embedded.events[0]._embedded.venues[0].address.line1;
//     console.log(eventAddress);
//     $("#address").text(eventAddress);

