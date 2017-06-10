import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

export class TodoSearch extends React.Component {

	render() {

		var {dispatch, showCompleted, searchText} = this.props;

		var onChangeSearchText = () => {
			var searchText = this.refs.searchText.value;
			dispatch(actions.setSearchText(searchText))
		};

		var onChangeShowCompleted = () => {
			dispatch(actions.toggleShowCompleted());
		}

		return (
			<div id="todo-search" >
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
		searchText : state.searchText
	}
};

export default connect(mapStateToProps)(TodoSearch);
