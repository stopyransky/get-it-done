var React = require('react');
var TodoList = require('TodoList');
var TodoAdd = require('TodoAdd');

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
	handleAddTodo : function(text) {
		alert('new todo: ' + text);
	},
	render : function() {
		var {todos} = this.state;
		return (
			<div>
				<h1 className="page-title">TodoApp</h1>
				<TodoList todos={todos} />
				<br/>
				<TodoAdd onAddTodo={this.handleAddTodo} />
			</div>
		);
	}
});

module.exports = TodoApp;