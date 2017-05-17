var React = require("react");
var ReactDOM = require('react-dom');
var { hashHistory } = require('react-router');
var { Provider } = require('react-redux');
var actions = require('actions');
var store = require('store').configure();
import firebase from './firebase/index.js';
import router from './router/index.jsx';

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

const element = (
	<Provider store={store}>
		{router}
	</Provider>);
const container = document.getElementById("container");

ReactDOM.render( element, container );
