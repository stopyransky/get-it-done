var axios = require('axios');

const OPENWEATHER_URL = 'http://api.openweathermap.org/data/2.5/weather?appid=e604d781b89224c20697b66125d957b0&units=metric';

module.exports = {
	getTemp: function( location ) {
		var encodedLocation = encodeURIComponent(location);
		var requestUrl = `${OPENWEATHER_URL}&q=${encodedLocation}`;

		return axios.get(requestUrl).then( function(res) {

			if(res.data.cod && res.data.message) {

				console.warn("Something went wrong: " + res);
			} else {
				return res.data.main.temp;
			}
		}, function(err) {
	
			console.warn(err.data.message || err.message);
			// throw new Error(err.data.message);
		});
	}
}