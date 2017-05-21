import React from 'react';
import {connect} from "react-redux";
import moment from 'moment';
import * as actions from "actions";

// exporting raw React component for testing purposes
export class TodoItem extends React.Component {

	render() {
		// dispatch comes from redux.connect
		var {id, text, completed, createdAt, completedAt, dispatch } = this.props;

		var todoClassName = completed ? 'todo todo-completed' : 'todo todo-inprogress';

		var renderDate = () => {
			var message = 'Created ';
			var timestamp = createdAt;
			if(completed) {
				message = "Completed ";
				timestamp = completedAt;
			}
			return message + moment.unix(timestamp).format("MMMM Do, YYYY @ h:mm a");
		}

		var onClickToggle = ()=> {
			/* this.props.onToggle(id)} */
			dispatch(actions.startToggleTodo(id, !completed))
		};

		var onClickDelete = () => {
			dispatch(actions.startDeleteTodo(id));
		};

		return (
			<div className="row expanded align-middle collapse">
				<div className="columns uncentered small-9 medium-9 large-9">
					<div className={todoClassName} onClick={onClickToggle}>
						<div><input type='checkbox' checked={completed} /></div>
						<div>
							<span> {text} </span><br/>
							<span className="todo-subtext">{renderDate()}</span>
						</div>
					</div>
				</div>
				<div className="columns uncentered small-2 medium-2 large-2">
					<div className="button expanded" onClick={onClickDelete}>remove</div>
				</div>
			</div>
		);
	}
}
// by default exporting redux-connected TodoItem
export default connect()(TodoItem);


// import TodoItem from 'TodoItem'; // refers to default export (linked to redux)
// import {TodoItem as RawTodoItem} from 'TodoItem'; // refers to raw class
