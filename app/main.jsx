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
import firebase from './firebase/index.js';

firebase.auth().onAuthStateChanged((user) => {
	if(user) {
		hashHistory.push('/todo');

	} else {
		hashHistory.push('/');
	}
})
$(document).foundation();

// load main css styles
require('style-loader!css-loader!sass-loader!mainStyles');

store.dispatch(actions.startAddTodos());

var requireLogin = (nextState, replace, next) => {
	if(!firebase.auth().currentUser) {
		// nobody is logged in
		replace('/');
	}
	next();
};

var redirectIfLogin = (nextState, replace, next) => {
	if(firebase.auth().currentUser) {
		// nobody is logged in
		replace('/home');
	}
	next();
};
const element = (
				<Provider store={store}>
					<Router history={hashHistory}>
						<Route path="/" component={App} >
							<IndexRoute component={TodoLogin} onEnter={redirectIfLogin}/>
							<Route path="home"		component={Home} />
							<Route path="greeter" 	component={Greeter} />
							<Route path="timer" 	component={Timer} />
							<Route path="countdown" component={Countdown} />
							<Route path="weather" 	component={Weather} />
							<Route path="examples" 	component={Examples}/>
							<Route path="todo" 		component={TodoApp} onEnter={requireLogin}/>
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
