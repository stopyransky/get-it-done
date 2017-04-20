var React = require("react");

var WeatherMessage = ( {temp, location} ) => {        
    //var { temp, location } = props;
    return (
        <div id='weatherMessage'>
            <h3 className="text-center">Weather message: </h3>
            <p>It is {temp} in {location}.</p>
        </div>
    );
}

module.exports = WeatherMessage;