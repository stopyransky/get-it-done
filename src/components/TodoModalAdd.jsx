import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
// import * as _ from 'lodash';
import moment from 'moment';

import * as actions from 'actions';


class TodoModalAdd extends React.Component {
	
    constructor(props) {
        super(props);
        this.state = {
            showMore: false
        }
    }

    onConfirm = (e) => {
        e.preventDefault();

        var startDateRef = this.refs.startDate;
        var dueDateRef = this.refs.dueDate;
        var tagsRef = this.refs.tags;
        
        var newText = this.refs.text.value;
        var startDate = "";
        var dueDate = "";
        var tags = [];
        
        if(tagsRef) {
           var tarr = tagsRef.value.split(","); 
            if(tarr.length > 0) {
                tarr.forEach( ( tag )=> {
                    var t = tag.trim();
                    if(t) tags.push(t);
                });
            }
        }
        
        if(dueDateRef) dueDate = moment(dueDateRef.value, "YYYY-MM-DD").unix();
        if(startDateRef) startDate = moment(startDateRef.value, "YYYY-MM-DD").unix();
        
        
        var newTodo = {
            text: newText,
            startDate,
            dueDate,
            tags 
        } 

        if(newText.length > 0) {
           if( this.refs.text) this.refs.text.value = "";
           if(this.refs.startDate) this.refs.startDate.value = "";
           if(this.refs.dueDate) this.refs.dueDate.value = "";
           if(this.refs.tags) this.refs.tags.value = [];
           
           this.props.onSubmit(newTodo);
        } else {
            this.refs.text.focus();
        }
        
    }

    onClose = (event) => {
         var modal = document.getElementById("todo-add-modal");
         this.refs.text.value="";
        if(this.refs.text) this.refs.text.value="";
        if(this.refs.startDate) this.refs.startDate.value="";
        if(this.refs.dueDate) this.refs.dueDate.value="";
         this.setState({showMore : false}, () => modal.style.display = "none");
         
    }
    
    onMore = (e) =>{
        e.preventDefault();
        this.setState({
            showMore : !this.state.showMore
        })
    }
	
	componentDidMount() {
        /* if user clicks outside add-modal - close modal*/
        window.addEventListener("click", (event) => {
            var modal = document.getElementById("todo-add-modal");
            if (event.target == modal) {
                if(this.refs.text) this.refs.text.value="";
                if(this.refs.startDate) this.refs.startDate.value="";
                if(this.refs.dueDate) this.refs.dueDate.value="";
                modal.style.display = "none";
            }
        });
    }

	render() {

        var renderMoreOptions = () => {
            if(this.state.showMore) {
                return (
                    <div className="todo-modal-add-more-options">
                        <div className="row">
                            <label>Start date: <input type="date" ref="startDate"/></label>
                            <label>Due date: <input type="date" ref="dueDate" /></label>
                        </div>
                        <div className="row">
                            <label>Tags: <input type="text" ref="tags" /></label>
                        </div>
                    </div>
                );
            }
        }
        return (
            <div id="todo-add-modal" >
                <div id="todo-modal-add-contents">
                    <div className="todo-modal-add-close" onClick={this.onClose}>&times;</div>
                    <form onSubmit={this.onConfirm} >
                        <div className="todo-modal-add-group" >
                            <input className="todo-modal-add-input" type="text" ref="text" placeholder="Enter new task text here..."/>
                            <div className="todo-modal-add-button" onClick={this.onConfirm}>ADD</div>
                        </div>
                        <div className="todo-modal-add-more" onClick={this.onMore}>more options...
                            {renderMoreOptions()}
                        </div>   
                    </form>
                </div>
            </div>
        );
    }
}


export default TodoModalAdd;