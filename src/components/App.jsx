var React = require("react");
var AppNav = require("AppNav");

var App = (props) =>
	<div id='app'>
		<AppNav/>
		<div className="row">
			<div>
				{/* props.children are the routes provided by router in router.jsx
				they are children because App component is set as 'parent' route for other routes*/}
			{props.children} 
			</div>
		</div>
	</div>;

module.exports = App;
