var React = require("react");
var AppForm = React.createClass({
    
    onFormSubmit: function( e ) {
        
        e.preventDefault();
        var updates = {};
        var name = this.refs.name.value;
        var msg  = this.refs.msg.value;
        
        if( name.length > 0 ) {
            this.refs.name.value = ""; // clears text box
            updates.name = name;
        }
        if( msg.length > 0) {
            this.refs.msg.value ="";
            updates.msg = msg;
        }
        
        this.props.onUpdate( updates );
    },

    render : function() {
        return (
            <form onSubmit={ this.onFormSubmit }>
                <input placeholder="Enter name: " type="text" ref="name"/>
                <br/>
                <textarea placeholder="Enter message: " ref="msg"></textarea>
                <br/>
                <button className="button expanded">Submit</button>
            </form> 
        );
    } 
});

module.exports = AppForm;