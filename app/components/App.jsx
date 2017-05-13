var React = require("react");
var AppNav = require("AppNav");
var { Provider } = require('react-redux');
var actions = require('actions');
var store = require('store').configure();

store.subscribe(()=> {
	console.log("New state", store.getState())
});

store.dispatch(actions.addTodo("clean yard"));
store.dispatch(actions.setSearchText("yard"));
store.dispatch(actions.toggleShowCompleted());
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