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

import TodoLogin from "TodoLogin";
import TodoApp from "TodoApp";
var { Provider } = require('react-redux');
var actions = require('actions');
var store = require('store').configure();

$(document).foundation();

// load main css styles
require('style-loader!css-loader!sass-loader!mainStyles');

store.dispatch(actions.startAddTodos());

const element = (
				<Provider store={store}>
					<Router history={hashHistory}>
						<Route path="/" component={App}>
							<IndexRoute component={TodoLogin} />
							<Route path="greeter" 	component={Greeter} />
							<Route path="timer" 	component={Timer} />
							<Route path="countdown" component={Countdown} />
							<Route path="weather" 	component={Weather} />
							<Route path="examples" 	component={Examples}/>
							<Route path="todo" 		component={TodoApp} />
							<Route path="about" 	component={About} />
						</Route>

					</Router>
				</Provider>);

const container = document.getElementById("container");


ReactDOM.render( element, container );
//
// var React = require("react");
// var AppNav = require("AppNav");
//
// var App = (props) =>
// 	<div id='app'>
// 		<AppNav/>
// 		<div className="row">
// 				<div id="contents">
// 				{props.children}
// 				</div>
// 		</div>
//
// 	</div>;
//
// module.exports = App;
