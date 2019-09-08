function initMap() {
	var directionsRenderer = new google.maps.DirectionsRenderer();
	var directionsService = new google.maps.DirectionsService();
	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 9,
		center: { lat: 40.7128, lng: -74.006 }
	});
	directionsRenderer.setMap(map);
	directionsRenderer.setPanel(document.getElementById('right-panel'));

	var control = document.getElementById('floating-panel');
	control.style.display = 'block';
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(control);

	var onChangeHandler = function() {
		calculateAndDisplayRoute(directionsService, directionsRenderer);
	};
	document.getElementById('start').addEventListener('change', onChangeHandler);
	document.getElementById('end').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsRenderer) {
	var start = document.getElementById('start').value;
	var end = document.getElementById('end').value;
	directionsService.route(
		{
			origin: start,
			destination: end,
			travelMode: 'TRANSIT'
		},
		function(response, status) {
			if (status === 'OK') {
				directionsRenderer.setDirections(response);
			} else {
				window.alert('Directions request failed due to ' + status);
			}
		}
	);
}
