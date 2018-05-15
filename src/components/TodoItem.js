import React from 'react';
import {connect} from "react-redux";
import moment from 'moment';

import * as actions from "../redux/actions";
import TodoItemTags from './TodoItemTags';
import TodoModalDelete from './TodoModalDelete';

const mapStateToProps = state => state;

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		dispatch,
		onClickToggle : () => {
			const { id, completed } = ownProps;
			dispatch(actions.startToggleTodo(id, !completed))
		},

		onClickDelete : () => {
			const { id } = ownProps;
			dispatch(actions.startDeleteTodo(id));
		}
	}
};

export class TodoItem extends React.Component {
	constructor(props) {
		super(props);
		this.submitNewTag =  this.submitNewTag.bind(this);
		this.submitRemoveTag =  this.submitRemoveTag.bind(this);
		this.onSaveEdit = this.onSaveEdit.bind(this);
		this.cancelTextEdit = this.cancelTextEdit.bind(this);
		this.state = {
			editMode : false
		}
	}

	onSaveEdit(e) {
		e.preventDefault();
		const { id, dispatch } = this.props;
		const newText = this.refs.newText.value;
		if(newText.length > 0) {
			this.refs.newText.value = "";
			dispatch(actions.startUpdateTodo(id, { text: newText }))
			this.setState({ editMode: false });
		} else {
			this.refs.newText.focus();
		}
	}

	cancelTextEdit(e) {
		e.preventDefault();
		this.refs.newText.value = "";
		this.setState({
			editMode : false
		});
	}

	submitNewTag(newTag) {
		const { id, dispatch, tags = [] } = this.props;
		if(newTag.length > 0) {
			if(tags.length > 0) {
				tags.forEach((tag)=>{
					if(tag === newTag) return;
				});
			}
			tags.push(newTag);
			dispatch(actions.startUpdateTodo(id, { tags }));
		}
	}

	submitRemoveTag(index) {
		const { id, dispatch, tags} = this.props;
		if(tags[index] || tags[index] === '') {
			tags.splice(index,1);
		}
		dispatch(actions.startUpdateTodo(id, { tags : tags}));
	}

	submitFilterByTag = (tag) => this.props.dispatch(actions.filterByTag(tag));

  setEditModeTrue = () => this.setState({editMode : true});

	componentDidUpdate(prevProps, prevState) {
		if(this.state.editMode) {
			this.refs.newText.focus();
		}
  }

  renderTodoText = () => {
    const { text } = this.props
    if(this.state.editMode) {
      return (
        <form className="todo-item-contents-maintext" onSubmit={this.onSaveEdit} >
          <input
            type="text"
            defaultValue={text}
            ref="newText" />
        </form>
      );
    } else {
      return (
        <div className="todo-item-contents-maintext">
          <span >{text}</span>
        </div>
      );
    }
  }

  renderDate = () => {
    const { createdAt } = this.props;
    const message = 'Created ';
    const timestamp = createdAt;
    return message + moment.unix(timestamp).format("DD MM YYYY @ hh:mm ");
  }

  renderDueDate = () => {
    if(dueDate) {
      const message = ' Due date : ';
      const timestamp = dueDate;
      return message + moment.unix(timestamp).format("MMMM Do, YYYY");
    }
    return "No due date for this task.";
  }

  renderEditButton = () => {
    if(this.state.editMode) {
      return <div onClick={this.onSaveEdit}>Save</div>;
    } else {
      return <div onClick={this.setEditModeTrue}>Edit</div>;
    }
  }

	render() {
		const { id,
			text,
			completed,
			createdAt,
			completedAt,
			dueDate,
			tags,
			dispatch } = this.props;

		const { editMode } = this.state;

		return (
			<div tabIndex="2" className="todo-item masonry-item">
				<div className="group">
					<div className="todo-item-checkbox" onClick={this.props.onClickToggle}>
						{ completed? "UNDO" : "DONE"}
					</div>
					<div className="todo-item-contents" >
						{this.renderTodoText()}
						<TodoItemTags tags={tags}
							onTagFilter={this.submitFilterByTag}
							onNewTag={this.submitNewTag}
							onRemoveTag={ this.submitRemoveTag}/>
					</div>
				</div>
				<div className="todo-item-controls">
					{ this.renderEditButton() }
					<div onClick ={ () => {
						const modal = document.getElementById(id+"-modal");
						modal.style.display = "block";
					} }>Delete</div>
				</div>
				<TodoModalDelete id={id} text={text} onConfirm={this.props.onClickDelete} />
			</div>

		);
	}
}

export default connect( mapStateToProps, mapDispatchToProps )( TodoItem );
