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
		todoClassName = todoClassName+' columns uncentered small-12 medium-12 large-12';
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
		var onClickEdit = () => {
			console.log("edit action goes here");
		}

		var onClickNewTag = () => {
			console.log("new tag action goes here");
		}
		return (
			<div className="row expanded align-middle">

					<div className={todoClassName} /*onClick={onClickToggle}*/>
							<div className="columns large-10 small-6 medium-6">
								<input type='checkbox' defaultChecked={completed} onChange={onClickToggle} />
								<span> {text} </span><br/>
								<span className="todo-subtext">{renderDate()}</span>
								<ul className='tag-list'>
									<button className ="tag button tiny alert">label1</button>
									<button className ="tag button tiny warning">label2</button>
									<button className ="tag button tiny success">label3</button>
									<button className ="tag button tiny success" onClick={onClickNewTag}> + </button>
								</ul>
							</div>
							<div className="columns uncentered small-6 medium-6 large-2">
								<div className="button expanded warning button-edit" onClick={onClickEdit}>edit</div>
								<div className="button expanded alert button-remove" onClick={onClickDelete}>remove</div>

							</div>


					</div>

			</div>
		);
	}
}
// by default exporting redux-connected TodoItem
export default connect()(TodoItem);


// import TodoItem from 'TodoItem'; // refers to default export (linked to redux)
// import {TodoItem as RawTodoItem} from 'TodoItem'; // refers to raw class
