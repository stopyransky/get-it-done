var React = require('react');
var WeatherForm = require('WeatherForm');
var WeatherMessage = require("WeatherMessage");
var ErrorModal = require("ErrorModal");
var owApi = require("OpenWeatherApi");

var Weather = React.createClass( {

    getDefaultProps : function() {
        return {
            location: "None",
            data : 0
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
            data : null
        });
        
        owApi.getWeather( location ).then( function(data) {
            
            that.setState({
                location : location,
                data : data,
                isLoading : false
            });

        }, function( err ) {
            
            that.setState({
                isLoading: false, 
                errorMessage : err.message,
                data : null, 
                location: null
            });
        });
    	
    },

    render : function() {

        var {isLoading, data, location, errorMessage} = this.state;

        function renderMessage() {
            if( isLoading ) {
                return <h3 className="text-center"> Fetching weather... </h3>
            } else if( data && location ) {
                return <WeatherMessage data={data} location={location} />;
              
            }
        }

        function renderError() {
            if(typeof errorMessage === 'string') {
                return <ErrorModal message={errorMessage} />;
            }
        }
       
        return (
            <div id='weather' className="columns medium-6 large-4 small-centered">
            	<h1 className="text-center page-title"> Get Weather </h1>
                <WeatherForm onUpdate={this.handleUpdates} onSearch={this.handleSearch} />
                { renderMessage() }
                { renderError()  }
            </div>
        );
    }

} );

module.exports = Weather;