var React = require("react");

var WeatherMessage = React.createClass( {
    
    render : function() {
        
        var { temp, cityName } = this.props;
        return (
            <div id='weatherMessage'>
                <h2>Weather message: </h2>
                <p>It is {temp} in {cityName}.</p>
            </div>
        );
    }
} ); 

module.exports = WeatherMessage;