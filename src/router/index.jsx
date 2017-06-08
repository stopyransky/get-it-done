import React from 'react';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';
import TodoApp from 'TodoApp';
import TodoLogin from 'TodoLogin';
import firebase from './../firebase/index.js';

var App = require('App');

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
			<Route path="todo" component={TodoApp} onEnter={requireLogin}/>

		</Route>
	</Router>
);

