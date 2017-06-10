import React from "react";
import ReactDOM from 'react-dom';
import { hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import * as actions from 'actions';
import { configure } from 'configureStore';
import firebase from './firebase/index.js';
import router from './router/router.jsx';

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
})
$(document).foundation();

// load main css styles
require('style-loader!css-loader!sass-loader!mainStyles');



const element = (
	<Provider store={store}>
		{router}
	</Provider>
);

const container = document.getElementById("container");

ReactDOM.render( element, container );
