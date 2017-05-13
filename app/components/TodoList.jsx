var React = require('react');
var {connect} = require('react-redux');
import TodoItem from 'TodoItem';
// var TodoItem = require('TodoItem');

export var TodoList = React.createClass({
	
	render : function() {

		var { todos } =  this.props;
		
		var renderTodos = () => {
			if(todos.length === 0) {
				return (<p className= "container__message"> Nothing to do. </p>)
			}
			return todos.map((todo) => {
				return (
					<TodoItem key={todo.id} {...todo}/>
				);
			});
		}
		return (
			<div>
				{ renderTodos()}
			</div>
		);
	}

});

 export default connect(
	(state) => {
		return { // todos state will be set as props of TodoList
			todos : state.todos
		}
	}
)(TodoList);