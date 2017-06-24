import moment from 'moment';
// import TodoAPI from 'TodoAPI';

export var searchTextReducer = (state = "", action) => {

	switch(action.type) {
		case "SET_SEARCH_TEXT" :
			return action.searchText;
		default:
			return state;
	}
};

export var filterByStatusReducer = (state ="TODO", action ) => {
	switch(action.type) {
		case "FILTER_BY_STATUS" :
			return action.status;
		default : 
			return state;
	}
}

// export var showCompletedReducer = (state = false, action) => {
// 	switch(action.type) {
// 		case "TOGGLE_SHOW_COMPLETED" :
// 			return !state;
// 		default:
// 			return state;
// 	}
// };

// state is tagFilter string
export var filterByTagReducer = (state = "", action) => {
	switch(action.type) {
		case "FILTER_BY_TAG" :
			// console.log("filterbytag reducer: ", action.tagFilter);
			return action.tagFilter;
		default :
			return state;
	}
}

// export var tagReducer = (state=[], action) => {
// 	switch (action.type) {
// 		case "ADD_NEW_TAG" :
// 			return [
// 				...state,
// 				action.newTag
// 			]
// 		default : return state;
// 	}
// };

// export  var addTodoReducer = (state= false, action ) => {
// 	switch(action.type) {
// 		case "TOGGLE_EXPAND_ADD_TODO" :
// 			return !state;
// 		default: 
// 			return state;
// 	}
// };

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
