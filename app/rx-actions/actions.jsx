import firebase, { firebaseRef } from './../firebase/index.js';
import moment from 'moment';

export var setSearchText = (searchText) => {
	return {
		type : "SET_SEARCH_TEXT",
		searchText
	}
};

export var addTodo = (todo) => {
	return {
		type: "ADD_TODO",
		todo
	}
};

export var startAddTodo = (text) => {
	return (dispatch, getState) => {
		var todo = {
			// id: uuid(), //added by firebase now
			text,
			completed : false,
			createdAt : moment().unix(),
			completedAt : null
		};
		var todoRef = firebaseRef.child('todos').push(todo);

		return todoRef.then(() => {
			dispatch(addTodo({
				...todo,
				id : todoRef.key
			}));
		});
	};
};
export var addTodos = (todos) => {
	return {
		type : "ADD_TODOS",
		todos
	}
};

export var startAddTodos = () => {
	return (dispatch, getState) => {
		var todosRef = firebaseRef.child('todos');

		return todosRef.once('value').then((snapshot)=>{
			var todos = snapshot.val() || {};
			var parsedTodos = [];

			Object.keys(todos).forEach((todoId)=>{
				parsedTodos.push({
					id : todoId,
					...todos[todoId]
				})
			});

			dispatch(addTodos(parsedTodos));
		});
	}
};


// //FIREBASE
// {
// 	334395348 : {
// 		text:
// 	}
// }
//
// // app
// [
// 	{
// 		id: 3435345
// 		text:
// 	}
// ]



export var updateTodo = (id, updates) => {
	return {
		type: "UPDATE_TODO",
		id,
		updates
	}
};

export var startToggleTodo = (id, completed) => {
	return (dispatch, getState) => {
		var todoRef = firebaseRef.child(`todos/${id}`); // === 'todos/'+id
		var updates = {
			completed,
			completedAt : completed ? moment().unix() : null
		};

		return todoRef.update(updates).then(
			() => {
				console.log("updated firebase, updating Todo");
				dispatch(updateTodo(id, updates));
			},
			(error) => {
				console.log("actions.startToggleTodo error: ", error);
		});
	};
};

export var toggleShowCompleted = () => {
	return {
		type : "TOGGLE_SHOW_COMPLETED"
	}
};
