import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../redux/actions';

import TodoAPI from 'TodoAPI';

class TodoModalSearch  extends React.Component {
	
    componentDidMount() {
        /* if user clicks outside search-modal-contents - close modal*/
        window.addEventListener("click", (event) => {
            var modal = document.getElementById("todo-search-modal");
            if (event.target == modal) {
                modal.style.display = "none";
            }
        });
    }
    componentDidUpdate() {
		// props.tagFilter can be changed elsewere ( in TodoItemTags)
		// so we need to update ref for tag filter here if such event occurs
		// this.refs.tagFilter.value = this.props.tagFilter;
	}


    onClose = (event) => {
        // console.log("on close event in todo modal search");
        var modal = document.getElementById("todo-search-modal");
         
        modal.style.display = "none";
          
    }

    render() {

        var {dispatch, statusFilter, searchText, todos, tagFilter} = this.props;

		var onChangeSearchText = () => {
			var searchText = this.refs.searchText.value;
			dispatch(actions.setSearchText(searchText))
		};
		
		var filterByStatus = () =>{
			var status = this.refs.statusFilter.value;
			dispatch(actions.filterByStatus(status));
			// console.log("filterByStatus actions dispatch goes here");
		}
		var filterByTag = () => {
			var tagFilter = this.refs.tagFilter.value;
		 	dispatch(actions.filterByTag(tagFilter));
			// console.log("filter by tag action goes here", tagFilter);
		}

		// this does not neeed to be here in render but instead it needs to be 
		// called on new todo/delete todo and update todo tags;
		var tagList = TodoAPI.getAllTags(todos).map((tag, index) => <option key={index} value={tag}>{tag}</option>);

        return (
            <div id="todo-search-modal">
                <div id="todo-search-modal-contents" >
                    <div className="todo-modal-search-close" onClick={this.onClose}>&times;</div>  
                    <select id="todo-search-status" onChange={filterByStatus} ref="statusFilter" defaultValue="TODO">
                        <option value="ALL">ALL </option>
                        <option value="DONE">DONE</option>
                        <option value="TODO">TODO</option>
                    </select>

                    <input id="todo-search-text"
                        type='text'
                        ref="searchText"
                        placeholder ="Enter search text..."
                        value={searchText}
                        onChange={onChangeSearchText} /> 

                    <select id="todo-search-by-tag" onChange={filterByTag} ref="tagFilter" defaultValue="ALL">
                        <option key={-2} value="ALL">Any Tag</option>
                        {tagList}
                        <option key={-1} value="NO TAGS">No Tags</option>
                    </select>

                </div>
			</div>
        );

    }
}


var mapStateToProps = (state) => {
	return {
		showCompleted: state.showCompleted,
		searchText : state.searchText,
		todos : state.todos,
		tagFilter : state.tagFilter
	}
};

export default connect(mapStateToProps)(TodoModalSearch);