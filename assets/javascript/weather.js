var city = 'New York';

$.getJSON(
	'https://api.openweathermap.org/data/2.5/forecast?q=' +
		city +
		'&units=imperial&appid=5a06a895e3eaf75b5ab8100f55b8cd46',
	function(data) {
		console.log('all the data: ', data);
		//this is the path to the icon
		// console.log('icon number: ', data.list[0].weather[0].icon);
		//weather description
		// console.log('descriptions: ', data.list[0].weather[0].description);
		// temperature in kelvin
		// console.log('temp: ', data.list[0].main.temp);
		// console.log(data.list[0].weather.description);

		var weatherData = data.list;

		for (let i = 0; i < 7; i++) {
			// this works for 1 day
			// $('.icon').attr('src', icon);
			// $('.weather').append(weather);
			// $('.temp').append(temp);
			// console.log('icon: ' + icon + ' temp: ' + temp + ' weather: ' + weather);

			var singleDay = $('<div>');
			var icon = 'http://openweathermap.org/img/w/' + data.list[i].weather[0].icon + '.png';
			var weatherIcon = $("<img class 'icon'>").attr('src', icon);
			var temp = $('<p>').text(Math.floor(data.list[i].main.temp));
			var weather = $('<p>').text(data.list[i].weather[0].description);

			singleDay.append(weatherIcon);
			singleDay.append(temp);
			singleDay.append(weather);
			singleDay.append($('<p>').text(i));

			$('.weather-container').append(singleDay);
		}
	}
);

// <img class="icon">
// 		<p class="weather"></p>
// 		<p class="temp"></p>

var wearthObj = {};
