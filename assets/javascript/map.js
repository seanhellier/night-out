var eventAddress = '350 Fifth Avenue New York, NY';
var mapQueryURL =
	'https://maps.googleapis.com/maps/api/geocode/json?address=' +
	eventAddress +
	'CA&key=AIzaSyCawnsR30sCrk5W1lYTbAERCEkJUMm1M2Z';

// // console.log(latlong);
$.ajax({
	url: mapQueryURL,
	method: 'GET'
}).then(function(data) {
	console.log(data);
	var eventLatitude = data.results[0].geometry.location.lat;
	var eventLongitude = data.results[0].geometry.location.lng;
	console.log(typeof eventLatitude);
	console.log(typeof eventLongitude);

	initMap(eventLatitude, eventLongitude);
});

function initMap(eventLatitude, eventLongitude) {
	var map = new google.maps.Map(document.getElementById('map'), {
		center: { lat: eventLatitude, lng: eventLongitude },
		zoom: 14
	});
}
