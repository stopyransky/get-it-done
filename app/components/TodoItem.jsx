var React = require('react');
var moment = require('moment');
var TodoItem = React.createClass({
	

	render : function() {
		var {id, text, completed, createdAt, completedAt } = this.props;
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
			<div onClick={() => {this.props.onToggle(id)}}>
	
					<input type='checkbox' checked={completed} />
					<span> {text}</span><br/>
					<span>{renderDate()}</span>
				
			</div>
		);
	}
});

module.exports = TodoItem;