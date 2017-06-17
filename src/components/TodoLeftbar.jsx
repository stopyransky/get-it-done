import React from 'react';

export default class TodoLeftbar extends React.Component {

    render() {
        return (
            <div id="todo-leftbar">
                <div className="todo-leftbar-group views">
                    <div className="todo-leftbar-item">view1</div>
                    <div className="todo-leftbar-item">view2</div>
                    <div className="todo-leftbar-item">view3</div>
                    <div className="todo-leftbar-item">view4</div>
                    <div className="todo-leftbar-item">view5</div>
                </div>
                <div className="todo-leftbar-group media">
                    <div className="todo-leftbar-item">
                        <img src="assets/github-48.png" />
                    </div>
                    <div className="todo-leftbar-item">
                        <img src="assets/facebook-48.png" />
                    </div>
                    <div className="todo-leftbar-item">
                        <img src="assets/twitter-48.png" />
                    </div>
                </div>
            </div>
        );
    }
}