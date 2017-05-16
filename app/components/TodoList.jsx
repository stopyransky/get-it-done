var React = require('react');
var {connect} = require('react-redux');
import TodoItem from 'TodoItem';
import TodoAPI from 'TodoAPI';
// var TodoItem = require('TodoItem');

export var TodoList = React.createClass({

	render : function() {

		var { todos, showCompleted, searchText } =  this.props;

		var filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);
		var renderTodos = () => {
			if(filteredTodos.length === 0) {
				return (<p className= "container__message"> Nothing to do. </p>)
			}
			return filteredTodos.map((todo) => {
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
		return state;
	}
)(TodoList);
