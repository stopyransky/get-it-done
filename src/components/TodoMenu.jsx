import React from 'react';
import { connect } from 'react-redux';
import { TweenMax, Power4 } from 'gsap';

import * as actions from 'actions';

export class TodoMenu extends React.Component {

    constructor(props) {
        super(props); 

        this.handleLogout = this.handleLogout.bind(this);

        this.state = { 
            expanded : false
        }
    }

    handleLogout (e) {
        e.preventDefault();
        var {dispatch} = this.props;
        // console.log(typeof dispatch);
        dispatch(actions.startLogout());
    }

    handleMenuClick = () => {
        console.log("handle menu click")
        // keeping panel state  local 
        this.setState({
            expanded : !this.state.expanded
        }, () => { console.log("set state finished")});

        this.togglePanel();
    }

    togglePanel = () => {

        let tween = {
            duration : 0.3,
            ease : Power4.easeOut, 
            width : 70 // link this with sass variable https://css-tricks.com/making-sass-talk-to-javascript-with-json/

        }
        if(this.state.expanded) {
            TweenMax.to('#todo-leftbar', tween.duration, { left: -tween.width, ease: tween.ease} )
            TweenMax.to('#todo-app', tween.duration, { left: 0, ease: tween.ease} )
        } else {
            TweenMax.to('#todo-leftbar', tween.duration, { left: 0, ease: tween.ease} )
            TweenMax.to('#todo-app', tween.duration, { left: tween.width, ease: tween.ease} )
        }
    }

    render() {
        
        return (
            <div id="todo-menu" className="todo-active-item" onClick={this.handleMenuClick}>

                {/*<div id="todo-menu-content">
                    <div className="todo-menu-item">Options</div>
                    <div className="todo-menu-item" onClick={ this.handleLogout }>Logout</div>
                </div>*/}
            </div>
        );
    }
}

export default connect(state=>state)(TodoMenu);