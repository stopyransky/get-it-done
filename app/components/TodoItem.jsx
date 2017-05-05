var React = require('react');
var moment = require('moment');
var TodoItem = React.createClass({
	

	render : function() {
		var {id, text, completed, createdAt, completedAt } = this.props;
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
		return (
			<div className={todoClassName} onClick={() => {this.props.onToggle(id)}}>
	
					<div><input type='checkbox' checked={completed} /></div>
					<div>
						<span> {text}</span><br/>
						<span className = "todo-subtext">{renderDate()}</span>
					</div>
			</div>
		);
	}
});

module.exports = TodoItem;