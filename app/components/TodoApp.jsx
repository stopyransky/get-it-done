import React from 'react';
import TodoList from 'TodoList';
import TodoAdd from 'TodoAdd';
import TodoSearch from 'TodoSearch';
import * as Redux from 'react-redux';
import * as actions from 'actions';

export var TodoApp = React.createClass({
    onLogout(e) {
        var {dispatch} = this.props;
        e.preventDefault();

        dispatch(actions.startLogout());
    },

 	render : function() {
		return (
            <div>
                <div className="row page-actions">
                    <a href="#" onClick ={this.onLogout}>Logout</a>
                </div>
                <div className ="row">
                    <div className="columns small-centered medium-uncentered large-uncentered small-12 medium-4 large-4">
                        <TodoSearch/>
                    </div>
                    <div className="columns small-centered medium-uncentered large-uncentered  small-12 medium-8 large-8">
                        <TodoAdd/>
                        <TodoList/>
                    </div>
                </div>
            </div>
		);
	}
});

export default Redux.connect()(TodoApp);
