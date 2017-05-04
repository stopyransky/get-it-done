var React = require('react');
var TodoList = require('TodoList');

var TodoApp = React.createClass({
	getInitialState : function() {
		return {
			todos : [
				{
					id :  1,
					text : "walk the dog"
				},
				{
					id : 2, 
					text : "clean the yard"
				},
							{
					id :  3,
					text : "learn react"
				},
				{
					id : 4, 
					text : "trash bin"
				}
			]
		};
	},

	render : function() {
		var {todos} = this.state;
		return (
			<div>
				<h1 className="page-title">TodoApp</h1>
				<TodoList todos={todos} />
			</div>
		);
	}
});

module.exports = TodoApp;