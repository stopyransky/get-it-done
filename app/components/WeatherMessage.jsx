var React = require("react");

var WeatherMessage = ( {temp, cityName} ) => {        
    //var { temp, cityName } = props;
    return (
        <div id='weatherMessage'>
            <h2>Weather message: </h2>
            <p>It is {temp} in {cityName}.</p>
        </div>
    );
}

module.exports = WeatherMessage;