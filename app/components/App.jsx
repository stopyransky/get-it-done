var React = require("react");
var AppNav = require("AppNav");
var App = ({children}) => 
	<div id='app'>
		<AppNav/>
		{children}
	</div>;
module.exports = App;