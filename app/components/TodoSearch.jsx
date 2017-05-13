var React = require('react');
var { connect } = require('react-redux');
var actions = require("actions");

export var TodoSearch = React.createClass({

	// handleSearch : function() {
	// 	var showCompleted = this.refs.showCompleted.checked; //!!! not value
	// 	var searchText = this.refs.searchText.value;

	// 	this.props.onSearch(showCompleted, searchText);
	// },

	render : function() {
		var {dispatch, showCompleted, searchText} = this.props;
		var onChangeSearchText = () => {
			var searchText = this.refs.searchText.value;
			dispatch(actions.setSearchText(searchText))
		};

		var onChangeShowCompleted = () => {
			dispatch(actions.toggleShowCompleted());
		}
		return (
			<div className="container__header">
				<div>
					<input
						type='text'
						ref="searchText"
						placeholder ="Search todos"
						value={searchText}
						onChange={onChangeSearchText} />
				</div>
				<div>
					<label>
						<input
							type="checkbox"
							ref="showCompleted"
							checked={showCompleted}
							onChange={onChangeShowCompleted}/>
						show completed todos
					</label>
				</div>
			</div>
		);
	}
});

export default connect(
(state) => {
	return {
		showCompleted: state.showCompleted,
		searchText : state.searchText
	};
}
)(TodoSearch);
