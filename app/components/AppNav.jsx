var React = require("react");
var {Link, IndexLink} = require("react-router");

var AppNav = ( props ) =>
	<div id='appNav'>
		<span>AppNav</span>
		<IndexLink to="/" activeClassName="active" activeStyle={{ fontWeight: 'bold' }}>Greeter</IndexLink>
		<Link to="/weather" activeClassName="active" activeStyle={{ fontWeight: 'bold' }}>Weather</Link>
		<Link to="/about" activeClassName="active" activeStyle={{ fontWeight: 'bold' }}>About</Link>
	</div>;
	
module.exports = AppNav;