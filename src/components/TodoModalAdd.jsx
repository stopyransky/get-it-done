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
            <div id="add-modal" className="modal-add">
                <form className="todo-modal-add-content" onSubmit={this.onConfirm} >
                   
                    <input className="todo-modal-add-text" type="text" ref="text" placeholder="Todo text"/>
					<button onClick={(e)=>{
						e.preventDefault();
						console.log("more clicked : create/expand existing modal");
						}}><b>more options</b></button>
                    <div className="todo-modal-add-button" >ADD</div>
                    <div className="modal-add-close" onClick={this.onClose}>&times;</div>
                </form>
            </div>
        );
    }
}


export default TodoModalAdd;