var uuid = require("node-uuid");
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

export var todosReducer = (state = [], action) => {
	switch(action.type) {
		case "ADD_TODO" :
			return [
				...state, // already present todos
				{
					id: uuid(),
					text : action.text,
					completed : false,
					createdAt : moment().unix(),
					completedAt : null
				}
			];
		case "TOGGLE_TODO" : 
			return state.map((todo) => {
				if(todo.id === action.id) {
					var isCompleted = !todo.completed;
					return {
						...todo,
						completed : isCompleted,
						completedAt : isCompleted ? moment().unix() : null
					}
				}
				return todo;
			});
		default : 
			return state;
	}	
};


