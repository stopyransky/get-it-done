import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import * as _ from 'lodash';
import moment from 'moment';

import * as actions from 'actions';


class TodoModalAdd extends React.Component {
	
    onConfirm = (e) => {
        e.preventDefault();
        // console.log(newText);
        var newText = this.refs.text.value;
        if(newText.length > 0) {
            this.refs.text.value = "";
            this.props.onSubmit(newText);
        } else {
            this.refs.text.focus();
        }
        
    }
    onClose = (event) => {
         var modal = document.getElementById("add-modal");
         this.refs.text.value="";
         modal.style.display = "none";
    }
	
	componentDidMount() {
        /* if user clicks outside add-modal - close modal*/
        window.addEventListener("click", (event) => {
            var modal = document.getElementById("add-modal");
            if (event.target == modal) {
                if(this.refs.text) this.refs.text.value="";
                modal.style.display = "none";
            }
        });
    }

	render() {
        return (
            <div id="add-modal" className="modal-add">
                <form className="todo-modal-add-content" onSubmit={this.onConfirm} >
                   
                    <input className="todo-modal-add-text" type="text" ref="text" placeholder="Enter todo text here..."/>
					<div className="todo-modal-add-more" onClick={(e)=>{
						e.preventDefault();
						console.log("more clicked : this functionality not wired yet.");
						}}>more options</div>
                    <div className="todo-modal-add-button" onClick={this.onConfirm}>ADD</div>
                    <div className="todo-modal-add-close" onClick={this.onClose}>&times;</div>
                </form>
            </div>
        );
    }
}


export default TodoModalAdd;