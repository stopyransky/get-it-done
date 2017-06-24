import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

import TodoAPI from 'TodoAPI';

export class TodoSearch extends React.Component {
	componentDidUpdate() {
		// props.tagFilter can be changed elsewere (TodoItemTags)
		// so we need to update ref for tag filter here 
		this.refs.tagFilter.value = this.props.tagFilter;
	}
	render() {

		var {dispatch, statusFilter, searchText, todos, tagFilter} = this.props;

		var onChangeSearchText = () => {
			var searchText = this.refs.searchText.value;
			dispatch(actions.setSearchText(searchText))
		};
		
		var filterByStatus = () =>{
			var status = this.refs.statusFilter.value;
			dispatch(actions.filterByStatus(status));
			// console.log("filterByStatus actions dispatch goes here");
		}
		var filterByTag = () => {
			var tagFilter = this.refs.tagFilter.value;
		 	dispatch(actions.filterByTag(tagFilter));
			// console.log("filter by tag action goes here", tagFilter);
		}

		// this does not neeed to be here in render but instead it needs to be 
		// called on new todo/delete todo and update todo tags;
		var tagList = TodoAPI.getAllTags(todos).map((tag, index) => <option key={index} value={tag}>{tag}</option>);

		return (
			<div id="todo-search">
				<div id="todo-search-status" >
					<select onChange={filterByStatus} ref="statusFilter" defaultValue="TODO">
						<option value="ALL">ALL </option>
						<option value="DONE">DONE</option>
						<option value="TODO">TO DO</option>
					</select>
				</div>

				<div id="todo-search-text"> 
				{/*<label> Search text in todos:*/}
				<input
					type='text'
					ref="searchText"
					placeholder ="Search todos"
					value={searchText}
					onChange={onChangeSearchText} /> 
				{/*</label>*/}
				</div>
				<div id="todo-search-by-tag" >
					<select onChange={filterByTag} ref="tagFilter" defaultValue="ALL">
						<option key={-2} value="ALL"> </option>
						{tagList}
						<option key={-1} value="NO TAGS" >NO TAGS</option>
						</select>
				</div>
			</div>
		);
	}
}

var mapStateToProps = (state) => {
	return {
		showCompleted: state.showCompleted,
		searchText : state.searchText,
		todos : state.todos,
		tagFilter : state.tagFilter
	}
};

export default connect(mapStateToProps)(TodoSearch);
