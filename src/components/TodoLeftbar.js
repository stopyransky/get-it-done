import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../redux/actions';

export class TodoLeftbar extends React.Component {

    componentDidMount() {
        window.addEventListener("click", this.clickAway);
    }

    componentWillUnmount() {
        window.removeEventListener("click", this.clickAway);
    }
    handleLogout = (e) => {
        e.preventDefault();
        const {dispatch} = this.props;
        dispatch(actions.startLogout());
    }
    
    clickAway = (event) => {
        const expandedPanel = document.getElementById("todo-leftbar");
        if (event.target == expandedPanel) {
            this.props.dispatch(actions.hideLeftbarPanel());
        }
    }
    
    render() {
        
        return (
            <div id="todo-leftbar">
                <div id='todo-leftbar-inner'>
                    <div className="todo-leftbar-group">
                        <div className="todo-leftbar-item">List View</div>
                        <div className="todo-leftbar-item">Tile View</div>
                        <div className="todo-leftbar-item">view3</div>
                        <div className="todo-leftbar-item">view4</div>
                        <div className="todo-leftbar-item" onClick={this.handleLogout}>Logout</div>
                    </div>
                    <div className="todo-leftbar-group">
                        <div className="todo-leftbar-item">
                            <a href="https://github.com/stopyransky/get-it-done" target="_blank">
                                <img src="assets/github-48.png" />
                            </a>
                        </div>
                        <div className="todo-leftbar-item">
                            <a href="https://www.facebook.com/m1530" target="_blank">
                                <img src="assets/facebook-48.png" />
                            </a>
                        </div>
                        <div className="todo-leftbar-item">
                            <a href="https://twitter.com/stopyransky" target="_blank">
                                <img src="assets/twitter-48.png" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => state)(TodoLeftbar);