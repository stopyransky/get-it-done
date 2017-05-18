import React from 'react';
import {connect} from "react-redux";
import moment from 'moment';
import * as actions from "actions";

// exporting raw React component for testing purposes
export var TodoItem = React.createClass({


	render : function() {
		// dispatch comes from redux.connect
		var {id, text, completed, createdAt, completedAt, dispatch } = this.props;
		var todoClassName = completed ? 'todo todo-completed' : 'todo';
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

		return (
			<div className={todoClassName} onClick={onClickToggle}>

					<div><input type='checkbox' checked={completed} /></div>
					<div>
						<span> {text}</span><br/>
						<span className = "todo-subtext">{renderDate()}</span>
					</div>
			</div>
		);
	}
});

// by default exporting redux-connected TodoItem
export default connect()(TodoItem);
