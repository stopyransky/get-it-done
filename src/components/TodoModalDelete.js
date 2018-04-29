import React from "react";

class DeleteTodoModal extends React.Component {
  onConfirm = () => this.props.onConfirm();

  onClose = () => {
    const modal = document.getElementById(this.props.id + "-modal");
    modal.style.display = "none";
  };

  clickAway = event => {
    const modal = document.getElementById(this.props.id + "-modal");
    if (event.target == modal) {
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
    return (
      <div id={this.props.id + "-modal"} className="modal-delete">
        <div className="todo-modal-delete-content">
          <span className="modal-delete-close" onClick={this.onClose}>
            &times;
          </span>
          <p>Are you sure you want to delete this todo? </p>
          <p>{this.props.text}</p>
          <button onClick={this.onConfirm}>Yes</button>
          <button onClick={this.onClose}>No</button>
        </div>
      </div>
    );
  }
}

export default DeleteTodoModal;
