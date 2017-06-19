import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import * as _ from 'lodash';
import moment from 'moment';

import * as actions from 'actions';


class TodoModalAdd extends React.Component {
	
    onConfirm = () => this.props.onConfirm();

    onClose = () => {
         var modal = document.getElementById("add-modal");
         modal.style.display = "none";
    }
	
	componentDidMount() {
        /* if user clicks outside add-modal - close modal*/
        window.addEventListener("click", (event) => {
            var modal = document.getElementById("add-modal");
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }

	render() {
        return (
            <div id="add-modal" className="modal">
                <form className="todo-modal-add-content" onSubmit={this.onConfirm} >
                    <span className="modal-close" onClick={this.onClose}>&times;</span>
                    <input type="text" ref="text" placeholder="Todo text"/>
					<button onClick={(e)=>{
						e.preventDefault();
						console.log("more clicked : create/expand existing modal");
						}}>more...</button>
                </form>
            </div>
        );
    }
}


export default TodoModalAdd;