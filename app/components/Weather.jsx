var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require("WeatherMessage");
var ErrorModal = require("ErrorModal");
var owApi = require("OpenWeatherApi");

var Weather = React.createClass( {

    getDefaultProps : function() {
        return {
            location: "None",
            temp : 0
        }
    },

    getInitialState : function() {
        return {
            isLoading: false,
            errorMessage: null
        }
    },

    componentDidMount : function() {
        var location = this.props.location.query.location;
        
        if(location && location.length >  0) {
            this.handleSearch(location);
            window.location.hash = '#/weather';
        }
    },
    
    componentWillReceiveProps : function( newProps ) {
         var location = newProps.location.query.location;
        
        if(location && location.length >  0) {
            this.handleSearch(location);
            window.location.hash = '#/weather';
        }
    },

    handleUpdates  : function( updates ) {
        this.setState( updates );
    },

    handleSearch : function( location ) {
    	
        var that = this;
        this.setState({ 
            isLoading : true,
            errorMessage : null,
            location : null,
            temp : null
        });
        
        owApi.getTemp( location ).then( function(temp) {
            
            that.setState({
                location : location,
                temp : temp,
                isLoading : false
            });

        }, function( err ) {
            
            that.setState({
                isLoading: false, 
                errorMessage : err.message,
                temp : null, 
                location: null
            });
        });
    	
    },

    render : function() {

        var {isLoading, temp, location, errorMessage} = this.state;

        function renderMessage() {
            if( isLoading ) {
                return <h3 className="text-center"> Fetching weather... </h3>
            } else if( temp && location ) {
                return <WeatherMessage temp={temp} location={location} />;
              
            }
        }

        function renderError() {
            if(typeof errorMessage === 'string') {
                return <ErrorModal message={errorMessage} />;
            }
        }
       
        return (
            <div id='weather'>
            	<h1 className="text-center page-title"> Get Weather </h1>
                <WeatherForm onUpdate={this.handleUpdates} onSearch={this.handleSearch} />
                { renderMessage() }
                { renderError()  }
            </div>
        );
    }

} );

module.exports = Weather;