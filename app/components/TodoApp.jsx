var React = require('react');
var TodoList = require('TodoList');
var TodoAdd = require('TodoAdd');
var TodoSearch = require('TodoSearch');
var uuid = require('uuid');

var TodoApp = React.createClass({
	getInitialState : function() {
		return {
			showCompleted : false,
			searchText : "",
			todos : [
				{
					id :  uuid(),
					text : "walk the dog"
				},
				{
					id : uuid(), 
					text : "clean the yard"
				},
							{
					id :  uuid(),
					text : "learn react"
				},
				{
					id : uuid(), 
					text : "trash bin"
				}
			]
		};
	},

	handleAddTodo : function(text) {
		this.setState({
			todos : [...this.state.todos, {
				id : uuid(),
				text : text
			}],
		});
		// alert('new todo: ' + text);
	},

	handleSearch : function( showCompleted, searchText ) {
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