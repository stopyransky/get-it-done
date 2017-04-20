var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require("WeatherMessage");
var ErrorModal = require("ErrorModal");
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
            isLoading: false,
            errorMessage: null
        }
    },

    handleUpdates  : function( updates ) {
        this.setState( updates );
    },

    handleSearch : function( location ) {
    	
        var that = this;
        this.setState({ 
            isLoading : true,
            errorMessage : null
        });
        
        owApi.getTemp(location).then( function(temp) {
            
            that.setState({
                cityName : location,
                temp : temp,
                isLoading : false
            });

        }, function( err ) {
            
            that.setState({
                isLoading: false, 
                errorMessage : err.message,
                temp : null, 
                cityName: ""
            });
        });
    	
    },

    render : function() {

        var {isLoading, temp, cityName, errorMessage} = this.state;

        function renderMessage() {
            if( isLoading ) {
                return <h3 className="text-center"> Fetching weather... </h3>
            } else if( temp && location ) {
                return <WeatherMessage temp={temp} cityName={cityName} />;
              
            }
        }

        function renderError() {
            if(typeof errorMessage === 'string') {
                return <ErrorModal message={errorMessage} />;
            }
        }
       
        return (
            <div id='weather'>
            	<h1 className="text-center"> Get Weather </h1>
                <WeatherForm onUpdate={this.handleUpdates} onSearch={this.handleSearch} />
                { renderMessage() }
                {renderError()}
            </div>
        );
    }

} );

module.exports = Weather;