var React = require("react");
var AppNav = require("AppNav");

var App = React.createClass( {

    render : function() {
        return (
            <div id='app'>
                <AppNav />
                {this.props.children}
               
            </div>
        );
    }
} );

module.exports = App;