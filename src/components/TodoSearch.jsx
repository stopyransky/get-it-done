import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

import TodoAPI from 'TodoAPI';

export class TodoSearch extends React.Component {

	render() {

		var {dispatch, showCompleted, searchText, todos} = this.props;

		var onChangeSearchText = () => {
			var searchText = this.refs.searchText.value;
			dispatch(actions.setSearchText(searchText))
		};

		var onChangeShowCompleted = () => {
			dispatch(actions.toggleShowCompleted());
		}
		
		var filterByTag = () => {
			var tagFilter =this.refs.tagFilter.value;
			dispatch(actions.filterByTag(tagFilter));
			console.log("filter by tag action goes here", tagFilter);
		}

		// var tagList = <option>dummy</option>;
		var tagList = TodoAPI.getAllTags(todos).map((tag, index) => <option key={index} value={tag}>{tag}</option>);
		

		return (
			<div id="todo-search">
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
				<div id="todo-search-show-completed">   
				<label>
					<input
						type="checkbox"
						ref="showCompleted"
						checked={showCompleted}
						onChange={onChangeShowCompleted}/>
					Include Completed
				</label>
				</div>
			</div>
		);
	}
}

var mapStateToProps = (state) => {
	return {
		showCompleted: state.showCompleted,
		searchText : state.searchText,
		todos : state.todos
	}
};

export default connect(mapStateToProps)(TodoSearch);
