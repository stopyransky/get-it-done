import React from 'react';
import {connect} from 'react-redux';
import TodoItem from 'TodoItem';
import TodoAPI from 'TodoAPI';


export class TodoList extends React.Component {

	render() {

	 	const { todos, showCompleted, searchText } =  this.props;

		const filteredTodos = TodoAPI.filterTodos(todos, showCompleted, searchText);

		var renderTodos = () => {
			if(filteredTodos.length === 0)  {
				return (<p> Nothing to do. </p>)
			}
			return filteredTodos.map((todo) => {
				return (
					<TodoItem key={todo.id} {...todo}/>
				);
			});
		}
		return (
			<div id="todo-list">
				{ renderTodos()}
			</div>
		);
	}
}

export default connect( state => state )(TodoList);
