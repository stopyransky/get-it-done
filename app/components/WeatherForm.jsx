var React = require('react');

var WeatherForm = React.createClass( {
	
	onFormSubmit: function( e ) {
		
		e.preventDefault();
		var cityName = this.refs.cityName.value;
		var updates = {};
		
		if( cityName.length > 0 ) {
            this.refs.cityName.value = ""; 
            this.props.onSearch( cityName );
            updates.cityName = cityName;
        }

        this.props.onUpdate( updates );
	},
    render : function() {
        return (
        	<div id='weatherForm'>
	            <form onSubmit={ this.onFormSubmit }>
	            	<input type='text' ref='cityName' placeholder='Enter City'/>
	            	<button>Get Weather</button>
	            </form>
            </div>
        );
    }
} );

module.exports = WeatherForm;