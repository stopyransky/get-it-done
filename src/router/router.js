import React from 'react';
import { Route, Router, IndexRoute, hashHistory } from 'react-router';

// import TodoApp from 'TodoApp';
import TodoApp from '../components/TodoApp';
import TodoLogin from '../components/TodoLogin';
import firebase from './../firebase/index.js';

const redirectIfLogin = (nextState, replace, next) => {
	if(firebase.auth().currentUser) {
		replace('/todo');
	}
	next();
};

const requireLogin = (nextState, replace, next) => {
	if(!firebase.auth().currentUser) {
		replace('/');
	}
	next();
};

// TODO refactor to React Router v4
// - change history to browserHistory

// https://reacttraining.com/react-router/web/example/auth-workflow


const App = props => <div id='app'>{props.children}</div>;

export default (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={TodoLogin} onEnter={redirectIfLogin}/>
			<Route path="todo" component={TodoApp} onEnter={requireLogin}/>
		</Route>
	</Router>
);
