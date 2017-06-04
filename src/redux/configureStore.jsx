import * as redux from 'redux';
import thunk from 'redux-thunk';
import { 
	searchTextReducer, 
	showCompletedReducer, 
	filterByTagReducer, 
	todosReducer, 
	authReducer } from 'reducers';

export var configure = (initialState = {}) => {
	var reducer = redux.combineReducers({
		searchText : searchTextReducer,
		showCompleted : showCompletedReducer,
		tagFilter : filterByTagReducer,
		todos : todosReducer,
		auth : authReducer
	});

	var store = redux.createStore(reducer, initialState, redux.compose(
		redux.applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));

	return store;
};
