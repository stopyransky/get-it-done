var React = require("react");
var AppNav = require("AppNav");

var TodoAPI = require("TodoAPI");
var { Provider } = require('react-redux');
var actions = require('actions');
var store = require('store').configure();

// store.subscribe(()=> {
// 	var state = store.getState();
// 	console.log("New state", store);
// 	TodoAPI.setTodos(state.todos)
// });

// var initialTodos = TodoAPI.getTodos();
// store.dispatch(actions.addTodos(initialTodos));
// store.dispatch(actions.addTodo("clean yard"));
// store.dispatch(actions.setSearchText("yard"));
// store.dispatch(actions.toggleShowCompleted());

store.dispatch(actions.startAddTodos());

var App = (props) =>
	<div id='app'>
		<AppNav/>
		<div className="row">
			<Provider store={store} >
				<div >
				{props.children}
				</div>
			</Provider>
		</div>

	</div>;

module.exports = App;
