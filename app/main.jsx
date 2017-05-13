var React = require("react");
var ReactDOM = require('react-dom');

var { Route, Router, IndexRoute, hashHistory } = require('react-router');
var App = require('App');
var Weather = require("Weather");
var Greeter = require("Greeter");
var Examples  = require("Examples");
var About = require('AppAbout');
var Home = require('AppHome');
var Timer = require('Timer');
var Countdown = require('Countdown');

var TodoApp = require("TodoApp");

// load foundation  - included in webpack to handle scss 
// require('style-loader!css-loader!foundation-sites/dist/foundation.min.css')
$(document).foundation();

// load main css styles
require('style-loader!css-loader!sass-loader!mainStyles'); 

// // load app/styles/main.css
// require('style-loader!css-loader!mainStyles')

const element = (<Router history={hashHistory}>
					<Route path="/" component={App}>
						<IndexRoute component={Home} />
						<Route path="greeter" component={Greeter} />
						<Route path="timer" component={Timer} />
						<Route path="countdown" component={Countdown} />
						<Route path="weather" component={Weather} />
						<Route path="examples" component={Examples} />
						<Route path="todo" component={TodoApp} />
						<Route path="about" component={About} />
					</Route>
				</Router>);

const container = document.getElementById("container");


// ReactDOM.render( element, container );

ReactDOM.render( 
	
	element
	, 

	container );

	// <Provider store={store}>
	// 	<TodoApp/>
	// </Provider>