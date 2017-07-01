import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

import TodoAPI from 'TodoAPI';
// import TodoModalSearch from 'TodoModalSearch';

export class TodoSearch extends React.Component {
	
	// componentDidUpdate() {
	// 	// props.tagFilter can be changed elsewere (TodoItemTags)
	// 	// so we need to update ref for tag filter here 
	// 	this.refs.tagFilter.value = this.props.tagFilter;
	// }
	
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
				<select id="todo-search-status" 
						className="todo-active-item" 
						onChange={filterByStatus} 
						ref="statusFilter" 
						defaultValue="TODO">
					<option value="ALL">ALL </option>
					<option value="DONE">DONE</option>
					<option value="TODO">TODO</option>
				</select>

				<input id="todo-search-text" 
					   className="todo-active-item"
					   type='text'
					   ref="searchText"
				  	   placeholder ="Enter search text..."
					   value={searchText}
					   onChange={onChangeSearchText} /> 

				<select id="todo-search-by-tag" 
					    className="todo-active-item" 
						onChange={filterByTag} 
						ref="tagFilter" 
						defaultValue="ALL">
					<option key={-2} value="ALL">Any Tag</option>
						{tagList}
					<option key={-1} value="NO TAGS">No Tags</option>
				</select>

			</div>
		);
	}
}


export default connect(state => state)(TodoSearch);

// export default TodoSearch;