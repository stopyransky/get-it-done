var React = require("react");

var AppMessage = React.createClass( {
    
    render : function() {
        
        var name = this.props.name;
        var msg = this.props.msg;
        return (
            <div id='greeterMessage'>
                <h1 className="text-center page-title">Hello {name}!</h1>
                <p>{msg}</p>
            </div>
        );
    }
} ); 

module.exports = AppMessage;