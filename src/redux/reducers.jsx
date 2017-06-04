// var uuid = require("node-uuid");
var moment = require("moment");

export var searchTextReducer = (state = "", action) => {

	switch(action.type) {
		case "SET_SEARCH_TEXT" :
			return action.searchText;
		default:
			return state;
	}
};

export var showCompletedReducer = (state = false, action) => {
	switch(action.type) {
		case "TOGGLE_SHOW_COMPLETED" :
			return !state;
		default:
			return state;
	}
};

export var filterByTagReducer = (state="", action) => {
	switch (action.type) {
		case "FILTER_BY_TAG" :
			return action.tag;
		default : return state;
	}
}

export var todosReducer = (state = [], action) => {
	switch(action.type) {
		case "ADD_TODO" :
			return [
				...state, // already present todos
				action.todo
			];
		case "ADD_TODOS" :
			return [
				...state,
				...action.todos
			];
		case "TOGGLE_EDIT_TODO" : 
			return state.map((todo) => {
				if(todo.id === action.id) {
					return {
						...todo,
						...action.editMode
					}
				} else {
					return todo;
				}
			});
		case "UPDATE_TODO" :
			return state.map((todo) => {
				if(todo.id === action.id) {
					return {
						...todo,
						...action.updates
					}
				} else {
					return todo;
				}
			});
		case "DELETE_TODO" :
			return state.filter((todo) => todo.id !== action.id);
		case "LOGOUT" :
			return [];
		default :
			return state;
	}
};

export var authReducer = ( state = {}, action ) => {
	switch( action.type ) {
		case "LOGIN" :
			return  {
				uid : action.uid
			};
		case "LOGOUT" :
			return {};
		default :
			return state;
	}
};
