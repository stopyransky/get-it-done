var React = require('react');
var Clock = require('Clock');
// stateless functional component
module.exports = ( props ) => 
	<div>
		<h1 className ="page-title text-center">Countdown</h1>
		<Clock totalSeconds={129}/>

	</div>;

