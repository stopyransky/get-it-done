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
			<div id="todo-search" className="columns large-4 medium-4 small-12">
				<label> Search text in todos:
				<input
					type='text'
					ref="searchText"
					placeholder ="Search todos"
					value={searchText}
					onChange={onChangeSearchText} /> </label>
			
				<label>
					<input
						type="checkbox"
						ref="showCompleted"
						checked={showCompleted}
						onChange={onChangeShowCompleted}/>
					Show completed todos
				</label>
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
