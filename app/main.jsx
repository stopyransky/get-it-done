var React = require("react");
var ReactDOM = require('react-dom');
var { Route, Router, IndexRoute, hashHistory } = require('react-router');
var App = require('App');
var Weather = require("Weather");
var Greeter = require("Greeter");
var About = require('AppAbout');
var container = document.getElementById("container");

require('style-loader!css-loader!foundation-sites/dist/foundation.min.css');

$(document).foundation();

ReactDOM.render( 
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={Greeter} />
			<Route path="about" component={About} />
			<Route path="weather" component={Weather} />
		</Route>
	</Router>
	, container );
