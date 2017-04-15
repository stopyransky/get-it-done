var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require("WeatherMessage");
var owApi = require("OpenWeatherApi");

var Weather = React.createClass( {

    getDefaultProps : function() {
        return {
            cityName: "None",
            temp : 0
        }
    },

    getInitialState : function() {
        return {
            isLoading: false
        }
    },

    handleUpdates  : function( updates ) {
        this.setState( updates );
    },

    handleSearch : function( location ) {
    	
        var that = this;
        this.setState({ isLoading : true});
        owApi.getTemp(location).then( function(temp) {
            that.setState({
                cityName : location,
                temp : temp,
                isLoading : false
            });
        }, function( err ) {
            that.setState({ isLoading: false});
            alert("City " + location + " does not exist.");
        });
    	
    },

    render : function() {

        var {isLoading, temp, cityName} = this.state;

        function renderMessage() {
            if( isLoading ) {
                return <h3> Fetching weather... </h3>
            } else if( temp && location ) {
                return <WeatherMessage temp={temp} cityName={cityName} />;
              
            }
        }
       
        return (
            <div id='weather'>
            	<h1> Get Weather </h1>
                <WeatherForm onUpdate={this.handleUpdates} onSearch={this.handleSearch} />
                { renderMessage() }
            </div>
        );
    }

} );

module.exports = Weather;