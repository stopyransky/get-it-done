var React = require("react");

var WeatherMessage = ( {temp, location} ) => {        
    //var { temp, location } = props;
    return (
        <div id='weatherMessage' data-animate ="fade-in fade-out" className="callout primary information text-center">
            <p>It is {temp}°C in {location}.</p>
        </div>
    );
}

module.exports = WeatherMessage;