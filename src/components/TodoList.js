import React from 'react';
import {connect} from 'react-redux';

import TodoItem from './TodoItem';
import TodoAPI from '../api/TodoAPI';


export class TodoList extends React.Component {

	render() {

	 	const { todos, /*showCompleted,*/ statusFilter, searchText, tagFilter } =  this.props;

		const filteredTodos = TodoAPI.filterTodos(todos, /*showCompleted,*/ statusFilter, searchText, tagFilter);

		var renderTodos = () => {
			if(filteredTodos.length === 0)  {
				return (<p> No tasks. </p>)
			}
			return filteredTodos.map((todo) => {
				return (
					<TodoItem key={todo.id} {...todo}/>
				);
			});
		}
		return (
			<div className="gid-list">
				{ renderTodos()}
			</div>
		);
	}
}

export default connect( state => state )(TodoList);
