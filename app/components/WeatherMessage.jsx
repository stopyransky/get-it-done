var React = require("react");

var WeatherMessage = ( {data, location} ) => {        
    //var { temp, location } = props;
    return (
        <div id='weatherMessage' data-animate ="fade-in fade-out" className="callout primary information text-center">
            <p>In {location}, {data.sys.country} ({data.coord.lon}, {data.coord.lat}), we have {data.weather[0].description}, the temperature is {data.main.temp}°C and wind speed is {data.wind.speed} m/s.</p>
            <p>Humidity : {data.main.humidity} %</p>
            <p>Pressure : {data.main.pressure} hpa</p>
        </div>
    );
}

module.exports = WeatherMessage;