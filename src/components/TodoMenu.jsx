import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions';

export class TodoMenu extends React.Component {

    constructor(props) {
        super(props); 

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout (e) {
        e.preventDefault();
        var {dispatch} = this.props;
        // console.log(typeof dispatch);
        dispatch(actions.startLogout());
    }


    render() {
        
        return (
            <div tabIndex="0" id="todo-menu" >
                <div id="todo-menu-content">
                    <div className="todo-menu-item">Options</div>
                    <div className="todo-menu-item" onClick={ this.handleLogout }>Logout</div>
                </div>
            </div>
        );
    }
}

export default connect(state=>state)(TodoMenu);