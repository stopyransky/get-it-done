import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import * as _ from 'lodash';
import moment from 'moment';

import * as actions from 'actions';

export default class TodoAddModal extends React.Component {
	static defaultProps = {
		title: "Add New Todo"
	}
    
	constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this)
    }

	onFormSubmit( e ) {
		e.preventDefault();
		console.log("onFormSubmit");
		var refs = this.refs;
		var data = {
			text  : refs.text,
			dueDate : refs.dueDate,
			tags : refs.tags,
		}

		this.props.onTodoAdd(data);
	}

	componentDidMount() {

        var modalMarkup = (
            <div id="todo-add-modal" className="reveal" data-reveal="">
				<form onSubmit={this.onFormSubmit}>
					<label> Text <input type='text' ref='text' placeholder="Enter new task..."/> </label>
					<div className="optional">
						<label> Due date <input type='date' ref='dueDate'/> </label>
						<label> Tags <input type="text" ref='tags' placeholder="enter coma separated tags" /> </label>
					</div>
					<button className="button expanded large" onClick={this.onFormSubmit} data-close=""> GET IT DONE </button>
				</form>
			</div>);

		// jquery selector
		var $modal = $(ReactDOMServer.renderToString(modalMarkup));
		$(ReactDOM.findDOMNode(this)).html($modal);
		
		var modal = new Foundation.Reveal($("#todo-add-modal"));
		modal.open(); // here foundation is messing (adding new) with commponents that react manages therefore
		// above modalMarkup is needed to be reloaded by React server and dom each time we have error
	}
	
	render() {
		return (<div></div>);
	}
}

// TodoAddModal.propTypes =  {
//     title : React.PropTypes.string,
//     message : React.PropTypes.string.isRequired
// };