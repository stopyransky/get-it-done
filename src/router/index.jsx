import React from 'react';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';
import TodoApp from 'TodoApp';
import TodoLogin from 'TodoLogin';
import firebase from './../firebase/index.js';

var App = require('App');
// var Weather = require("Weather");
// var Greeter = require("Greeter");
// var Examples  = require("Examples");
// var About = require('AppAbout');
var Home = require('AppHome');
// var Timer = require('Timer');
// var Countdown = require('Countdown');
// var AppNav = require("AppNav");

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

export default (
	<Router history={hashHistory}>
		<Route path="/" component={App} >
			<IndexRoute component={TodoLogin} onEnter={redirectIfLogin}/>
			<Route path="home"		component={Home} />
			{/*<Route path="greeter" 	component={Greeter} />*/}
			{/*<Route path="timer" 	component={Timer} />*/}
			{/*<Route path="countdown" component={Countdown} />*/}
			{/*<Route path="weather" 	component={Weather} />*/}
			{/* <Route path="examples" 	component={Examples}/> */}
			<Route path="todo" 		component={TodoApp} onEnter={requireLogin}/>
			{/* <Route path="about" 	component={About} /> */}
		</Route>
	</Router>
);


// var App = (props) =>
// 	<div id='app'>
// 		<AppNav/>
// 		<div className="row">
// 				<div>
// 				{props.children}
// 				</div>
// 		</div>
//
// 	</div>;

// var React = require("react");
// var AppNav = require("AppNav");
//
// var App = (props) =>
// 	<div id='app'>
// 		<AppNav/>
// 		<div className="row">
// 				<div>
// 				{props.children}
// 				</div>
// 		</div>
//
// 	</div>;
//
// module.exports = App;
