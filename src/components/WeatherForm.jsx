var React = require('react');

var WeatherForm = React.createClass( {
	
	onFormSubmit: function( e ) {
		
		e.preventDefault();
		var location = this.refs.location.value;
		var updates = {};
		
		if( location.length > 0 ) {
            this.refs.location.value = ""; 
            this.props.onSearch( location );
            updates.location = location;
        }

        this.props.onUpdate( updates );
	},
    render : function() {
        return (
        	<div id='weatherForm'>
	            <form onSubmit={ this.onFormSubmit }>
	            	<input type='search' ref='location' placeholder='Search weather by City'/>
	            	<button className="button hollow expanded">Get Weather</button>
	            </form>
            </div>
        );
    }
} );

module.exports = WeatherForm;