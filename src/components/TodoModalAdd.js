import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import moment from 'moment';
import * as actions from '../redux/actions';

class TodoModalAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false
    }
  }

  onConfirm = (e) => {
    e.preventDefault();
    const startDateRef = this.refs.startDate;
    const dueDateRef = this.refs.dueDate;
    const tagsRef = this.refs.tags;
    const newText = this.refs.text.value;
    let startDate = "";
    let dueDate = "";
    const tags = [];

    if (tagsRef) {
      const tarr = tagsRef.value.split(",");
      if (tarr.length > 0) {
        tarr.forEach((tag) => {
          const t = tag.trim();
          if (t) tags.push(t);
        });
      }
    }

    if (dueDateRef) dueDate = moment(dueDateRef.value, "YYYY-MM-DD").unix();
    if (startDateRef) startDate = moment(startDateRef.value, "YYYY-MM-DD").unix();


    const newTodo = {
      text: newText,
      startDate,
      dueDate,
      tags
    }

    if (newText.length > 0) {
      if (this.refs.text) this.refs.text.value = "";
      if (this.refs.startDate) this.refs.startDate.value = "";
      if (this.refs.dueDate) this.refs.dueDate.value = "";
      if (this.refs.tags) this.refs.tags.value = [];

      this.props.onSubmit(newTodo);
    } else {
      this.refs.text.focus();
    }

  }

  onClose = (event) => {
    const modal = document.getElementsByClassName("todo-add-modal")[0];
    this.refs.text.value = "";
    if (this.refs.text) this.refs.text.value = "";
    if (this.refs.startDate) this.refs.startDate.value = "";
    if (this.refs.dueDate) this.refs.dueDate.value = "";
    this.setState({ showMore: false }, () => modal.style.display = "none");

  }

  onMore = (e) => {
    e.preventDefault();
    this.setState({
      showMore: !this.state.showMore
    })
  }

  clickAway = (event) => {
    const modal = document.getElementsByClassName("todo-add-modal")[0];
    if (event.target == modal) {
      if (this.refs.text) this.refs.text.value = "";
      if (this.refs.startDate) this.refs.startDate.value = "";
      if (this.refs.dueDate) this.refs.dueDate.value = "";
      modal.style.display = "none";
    }
  }

  componentDidMount() {
    window.addEventListener("click", this.clickAway);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.clickAway);
  }

  render() {

    // const renderMoreOptions = () => {
    //   console.log("soon...");
    //   if(this.state.showMore) {
    //       return (
    //           <div className="todo-modal-add-more-options">
    //               <div className="row">
    //                   <label>Start date: <input type="date" ref="startDate"/></label>
    //                   <label>Due date: <input type="date" ref="dueDate" /></label>
    //               </div>
    //               <div className="row">
    //                   <label>Tags: <input type="text" ref="tags" /></label>
    //               </div>
    //           </div>
    //       );
    //   }
    // }
    return (
      <div className="todo-add-modal" >
        <div className="todo-modal-add-contents">
          <div className="todo-modal-add-title">Add new todo</div>
          <div className="todo-modal-add-close" onClick={this.onClose}>&times;</div>
          <form onSubmit={this.onConfirm} >
            <div className="todo-modal-add-group" >
              <input className="todo-modal-add-input" type="text" ref="text" placeholder="Enter new task here..." />
              <div className="todo-modal-add-button" onClick={this.onConfirm}>ADD</div>
            </div>
            <div className="todo-modal-add-more" onClick={this.onMore}>more options...
              {/*{renderMoreOptions()}*/}
            </div>
          </form>
        </div>
      </div>
    );
  }
}


export default TodoModalAdd;