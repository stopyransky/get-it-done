import React from 'react';
import {connect} from "react-redux";
import * as actions from 'actions';

class TodoItemTags extends React.Component {

    constructor(props) {
        super(props);
		this.onAddTag = this.onAddTag.bind(this);
		this.onFilterByTag = this.onFilterByTag.bind(this);
		this.passRemoveTag = this.passRemoveTag.bind(this);
        this.passNewTag = this.passNewTag.bind(this);
        this.state = {
            editMode : false,
            toggleOnRemove : false
        }
    }

    onAddTag() {
        this.setState({
            editMode: true
        });
    }

    onFilterByTag() {
        console.log("filter by tag action goes here");
    }

    // onRemoveTag() {
        
    // }
        
    passNewTag(e) {
        e.preventDefault();
        var newTag= this.refs.newTag.value;
        this.refs.newTag.value = "";
        this.props.onNewTag(newTag);
        this.setState({
            editMode: false
        });
    }

    passRemoveTag(index) {
        console.log("remove tag action goes here");
        if(this.props.tags[index]) {
            this.props.onRemoveTag(index);
            this.setState({
                toggleOnRemove : !this.state.toggleOnRemove
            });
        }
    }



    render() {
        
        var {tags} = this.props;
        var listItems = [];

        var self = this;
        var renderAddTagForm = () => {
            if(this.state.editMode ) {
                return (<form onSubmit={this.passNewTag}>
                    <input type="text" ref="newTag" placeholder="new tag"/>
                </form>);
            }
        }

        if(tags && tags.length > 0) {
            listItems = tags.map(( tag, index ) => {
                    return (
                        <div className="tag" key={index}  style={{display:"inline"}}>
                            <button className ="tag-content button hollow small alert collapse" 
                                    onClick={self.onFilterByTag}>{tag}
                            </button>
                            <button className ="tag-remove button small alert collapse" 
                                    onClick={() => {
                                        self.passRemoveTag(index);
                                    }}> - 
                            </button>
                        </div>
                    );
            });
        }
            
        listItems.push (
            <div key="-1" className="tag" style={{display:"inline"}}>
                <button  className ="tag-add button hollow small success" onClick={self.onAddTag}> + </button>
            </div>);


        return (<div>
            <ul className='tag-list'>{listItems}</ul>
            {renderAddTagForm() }
            </div>
        );
        
	}
    

}

export default TodoItemTags;