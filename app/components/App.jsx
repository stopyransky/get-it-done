var React = require("react");
var AppNav = require("AppNav");
var App = (props) => 
	<div id='app'>
		<AppNav/>
		<div className="row">
			<div className="columns medium-6 large-4 small-centered">
			{props.children}
			</div>
		</div>
		
	</div>;
module.exports = App;