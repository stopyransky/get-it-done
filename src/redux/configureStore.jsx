import * as redux from 'redux';
import thunk from 'redux-thunk';
import { 
	searchTextReducer, 
	filterByStatusReducer, 
	filterByTagReducer, 
	todosReducer,
	authReducer,
	panelReducer } from 'reducers';

export var configure = (initialState = {}) => {
	var reducer = redux.combineReducers({
		searchText : searchTextReducer,
		statusFilter : filterByStatusReducer,
		tagFilter : filterByTagReducer,
		todos : todosReducer,
		auth : authReducer,
		expanded : panelReducer
	});

	var store = redux.createStore(reducer, initialState, redux.compose(
		redux.applyMiddleware(thunk),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	));

	return store;
};
