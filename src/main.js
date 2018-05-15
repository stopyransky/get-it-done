import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import * as actions from './redux/actions';
import configureStore, { history } from './redux/configureStore';

// import TodoApp from 'TodoApp';
import TodoApp from '../components/TodoApp';
import TodoLogin from '../components/TodoLogin';
import firebase from './../firebase/index';

// importing assets and css
require('./styles/main.scss')
require('./assets/facebook-48-black.png')
require('./assets/facebook-48.png')
require('./assets/github-48-black.png')
require('./assets/github-48.png')
require('./assets/twitter-48-black.png')
require('./assets/twitter-48.png')

const store = configure();

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


firebase.auth().onAuthStateChanged((user) => {
	if(user) {
		store.dispatch(actions.login(user.uid));
		store.dispatch(actions.startAddTodos());
		history.push('/todo');
	} else {
		store.dispatch(actions.logout());
		history.push('/');
	}
});

const element = (
	<Provider store={store}>
		<Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={TodoLogin} onEnter={redirectIfLogin}/>
        <Route path="todo" component={TodoApp} onEnter={requireLogin}/>
      </Route>
    </Router>
	</Provider>
);

const container = document.getElementById("container");

ReactDOM.render(element, container);
