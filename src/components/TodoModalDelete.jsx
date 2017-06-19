import React from 'react';


class DeleteTodoModal extends React.Component {

    
    onConfirm = () => this.props.onConfirm();

    onClose = () => {
         var modal = document.getElementById(this.props.id+"-modal");
         modal.style.display = "none";
    }

    componentDidMount() {
        /* if user clicks outside todo-modal-delete - close modal*/
        window.addEventListener("click", (event) => {
            var modal = document.getElementById(this.props.id+"-modal");
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }

    componentWillUnmount() {
        // unplug event listener from componentdidmount
    }

    render() {
        return (
            <div id={this.props.id+"-modal"} className="modal delete">
                <div className="todo-modal-delete-content">
                    <span className="modal-close" onClick={this.onClose}>&times;</span>
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