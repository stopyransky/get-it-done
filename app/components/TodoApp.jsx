var React = require('react');
var TodoList = require('TodoList');
var TodoAdd = require('TodoAdd');
var TodoSearch = require('TodoSearch');

var TodoApp = React.createClass({
	getInitialState : function() {
		return {
			showCompleted : false,
			seachText : "",
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

	handleSearch : function(showCompleted, searchText ) {
		this.setState({
			showCompleted : showCompleted,
			searchText : searchText.toLowerCase()
		});


	},

	render : function() {
		var {todos} = this.state;
		return (
			<div>
				<h1 className="page-title">TodoApp</h1>
				<TodoSearch onSearch={this.handleSearch} />
				<TodoList todos={todos} />
				<br/>
				<TodoAdd onAddTodo={this.handleAddTodo} />
			</div>
		);
	}
});

module.exports = TodoApp;