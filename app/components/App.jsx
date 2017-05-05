var React = require("react");
var AppNav = require("AppNav");
var App = (props) => 
	<div id='app'>
		<AppNav/>
		<div className="row">
			<div >
			{props.children}
			</div>
		</div>
		
	</div>;
module.exports = App;