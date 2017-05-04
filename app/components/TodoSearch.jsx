var React = require('react');

var TodoSearch = React.createClass({
	
	handleSearch : function() {
		var showCompleted = this.refs.showCompleted.checked; //!!! not value 
		var searchText = this.refs.searchText.value;

		this.props.onSearch(showCompleted, searchText);
	},
	
	render : function() {
		
		return (
			<div>
				<div>
					<input type='text' ref="searchText" placeholder ="Search todos" onChange={this.handleSearch} />
				</div>	
				<div>
					<label>
						<input type="checkbox" ref="showCompleted" onChange={this.handleSeach}/>
						show completed todos
					</label>
				</div>
			</div>
		);
	}
});

module.exports = TodoSearch;