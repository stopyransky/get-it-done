
import firebase, { 
	firebaseRef, 
	twitterProvider, 
	facebookProvider, 
	githubProvider } from './../firebase/index.js';

import moment from 'moment';

import { TweenMax, Power4 } from 'gsap';


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

export var startAddTodo = (newTodo) => {
	
	return (dispatch, getState) => {
	
		var currentDate = moment().unix();
		var todo = {
			// id: uuid(), //added by firebase now
			text : newTodo.text,
			completed : false ,
			createdAt : currentDate,
			startDate: newTodo.startDate || currentDate,
			dueDate : newTodo.dueDate || "",
			completedAt : null,
			tags : newTodo.tags || []
			
		};

		var uid = getState().auth.uid;
		var todoRef = firebaseRef.child(`users/${uid}/todos`).push(todo);

		return todoRef.then(() => {
			dispatch(addTodo({
				...todo,
				id : todoRef.key
			}));
		});
	};
};

// export var toggleExpandAddTodo = () => {
// 	return {
// 		type: "TOGGLE_EXPAND_ADD_TODO"
// 	}
// };

export var addTodos = (todos) => {
	return {
		type : "ADD_TODOS",
		todos
	}
};

export var startAddTodos = () => {
	return (dispatch, getState) => {
		var uid = getState().auth.uid;
		var todosRef = firebaseRef.child(`users/${uid}/todos`);

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

export var toggleEditTodo = (id, editMode ) => {
	return {
		type: "TOGGLE_EDIT_TODO",
		id,
		editMode
	}
}

export var deleteTodo = (id) => {
	return {
		type: "DELETE_TODO",
		id
	}
};

export  var startDeleteTodo = (id) => {
	return (dispatch, getState) => {
		var uid = getState().auth.uid;
		var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`);
		return todoRef.remove().then(() => {
			dispatch(deleteTodo(id));
		});
	}
};

export var startUpdateTodo = (id, updates) => {
	return ( dispatch, getState) => {
		var uuid = getState().auth.uid;
		var todoRef = firebaseRef.child(`users/${uuid}/todos/${id}`);
		return todoRef.update(updates).then( () => {
			dispatch(updateTodo(id,updates));
		})
	}
}
export var updateTodo = (id, updates) => {
	return {
		type: "UPDATE_TODO",
		id,
		updates
	}
};

export var startToggleTodo = (id, completed) => {
	return (dispatch, getState) => {
		var uid = getState().auth.uid;
		var todoRef = firebaseRef.child(`users/${uid}/todos/${id}`); // === 'todos/'+id
		var updates = {
			completed,
			completedAt : completed ? moment().unix() : null
		};

		return todoRef.update(updates).then(
			() => {
				// console.log("updated firebase, updating Todo");
				dispatch(updateTodo(id, updates));
			},
			(error) => {
				// console.log("actions.startToggleTodo error: ", error);
		});
	};
};

export var filterByStatus = (status) => {
	return {
		type : "FILTER_BY_STATUS",
		status
	}
}
// export var toggleShowCompleted = () => {
// 	return {
// 		type : "TOGGLE_SHOW_COMPLETED"
// 	}
// };

export var filterByTag = (tagFilter) => {
	return {
		type : "FILTER_BY_TAG",
		tagFilter
	}
};

export var startLogin =  () => {
	return (dispatch, getState) => {
		return firebase.auth().signInWithPopup(githubProvider).then((result)=>{
			// console.log("Github auth worked", result);
		}, (error)=>{
			console.log("unable to log", error);
			console.log("Unable to log with Github.", error.message || error);
		});
	};
};
export var startFacebookLogin =  () => {
	return (dispatch, getState) => {
		return firebase.auth().signInWithPopup(facebookProvider).then((result)=>{
			 // This gives you a Facebook Access Token. You can use it to access the Facebook API.
			//var token = result.credential.accessToken;
			// The signed-in user info.
			//var user = result.user;
			// console.log("login with facebook successful")
		}, (error)=>{
			console.log("Unable to log with Facebook.", error.message || error);
		});
	};
};
export var startTwitterLogin =  () => {
	return (dispatch, getState) => {
		return firebase.auth().signInWithPopup(twitterProvider).then((result)=>{
			// console.log("auth worked", result);
		}, (error)=>{
			// console.log("unable to log", error);
			console.log("Unable to log with Twitter.", error.message || error);
		});
	};
};
export var startLogout =  () => {
	return (dispatch, getState) => {
		return firebase.auth().signOut().then(()=>{
			// console.log("logged out");
		},(error)=>{
			// console.log("error logging out",error);
		})
	};

};

export var login = (uid) =>{
	return {
		type: "LOGIN",
		uid
	}
};

export var logout = () => {
	return {
		type: "LOGOUT"
	}
};


/** below actions do not modify state of the app (store), they manipulate css settings and animate stuff only
	therefore returned object inside is just dummy type not handled by any reducer. 
*/
var tween = {
            duration : 0.3,
            ease : Power4.easeOut, 
            // link this with sass variable https://css-tricks.com/making-sass-talk-to-javascript-with-json/
            width : 200 

}
export var hideLeftbarPanel = () => {
			
		TweenMax.to('#todo-leftbar', tween.duration, { 
			opacity: 0.0, 
			ease: tween.ease
		});
		TweenMax.to('#todo-leftbar-inner', tween.duration, { 
			left: -tween.width, 
			ease: tween.ease,
			onComplete : () => document.getElementById('todo-leftbar').style.display = "none"
		});
		TweenMax.to('#todo-app', tween.duration, { 
			left: 0, 
			ease: tween.ease
		});
	
	return {
		type: "TOGGLE_LEFTBAR_PANEL"
	}
}

export var showLeftbarPanel = () => {
			document.getElementById('todo-leftbar').style.display="flex";
			TweenMax.to('#todo-leftbar', tween.duration, { opacity: 0.8 , ease: tween.ease})
            TweenMax.to('#todo-leftbar-inner', tween.duration, { left: 0, width: tween.width, ease: tween.ease} )
			TweenMax.to('#todo-app', tween.duration, { left: tween.width, ease: tween.ease} )
	
	return {
		type: "TOGGLE_LEFTBAR_PANEL"
	}
}
