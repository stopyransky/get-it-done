import React from 'react';
import {connect} from "react-redux";

import * as _ from 'lodash';
import moment from 'moment';


import * as actions from 'actions';

export class TodoAdd extends React.Component {

	
	render() {
		
		var {dispatch, expanded }  = this.props;
		
		return (
			<div id="todo-add">ADD</div>
		);
	}
}

var mapStateToProps = (state, ownProps ) => {
	return {
		expanded: state.addExpanded
	}
}
export default connect(mapStateToProps)(TodoAdd);
