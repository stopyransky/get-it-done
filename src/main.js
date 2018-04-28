import React from "react";
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';
import { Provider } from 'react-redux';

import * as actions from './redux/actions';
import { configure } from './redux/configureStore';
import firebase from './firebase/index';
import router from './router/router';

require('./styles/main.scss')

require('./assets/facebook-48-black.png')
require('./assets/facebook-48.png')
require('./assets/github-48-black.png')
require('./assets/github-48.png')
require('./assets/twitter-48-black.png')
require('./assets/twitter-48.png')

const store = configure();

firebase.auth().onAuthStateChanged((user) => {
	if(user) {
		store.dispatch(actions.login(user.uid));
		store.dispatch(actions.startAddTodos());
		hashHistory.push('/todo');

	} else {
		store.dispatch(actions.logout());
		hashHistory.push('/');
	}
});

const element = (
	<Provider store={store}>
		{router}
	</Provider>
);

const container = document.getElementById("container");

ReactDOM.render( element, container );
