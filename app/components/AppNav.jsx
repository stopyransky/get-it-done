var React = require("react");
var {Link, IndexLink} = require("react-router");

var AppNav = React.createClass({
	
	onSearch : function( e ) {
		e.preventDefault();
		var location = this.refs.search.value;
		var encodedLocation = encodeURIComponent(location);

		if( location.length > 0) {
			this.refs.search.value = "";

			// sending request to /weather route (which is Weather component)
			// and giving Weather compoennt new prop named location
			// this is then handled by its componentWillReceiveProps lifeycle method
			// @see Weather.jsx
			window.location.hash = "/weather?location=" + encodedLocation;
		}
	},

	render : function() {
		return (
		<div className ="top-bar">
			<div className="top-bar-left">
				<ul className ="menu">
					<li className="menu-text"><IndexLink to="/"><span>React App!</span></IndexLink></li>
					<li><Link to="/greeter" activeClassName="active-link" >Greeter</Link></li>
					<li><Link to="/timer" activeClassName="active-link" >Timer</Link></li>
					<li><Link to="/countdown" activeClassName="active-link" >Countdown</Link></li>
					<li><Link to="/weather" activeClassName="active-link" >Weather</Link></li>
					<li><Link to="/examples" activeClassName="active-link" >Examples</Link></li>
					<li><Link to="/about" activeClassName="active-link" >About</Link></li>
				</ul>
			</div>
			<div className="top-bar-right">
			
				<form onSubmit={this.onSearch}>
					<ul className="menu">
						<li><a href="https://github.com/stopyransky/react-from-scratch" target="_blank">
						<img src='assets/github-32.png' width='32' height='32'/></a></li>
						<li><input type="search" ref="search" placeholder="Search weather by city"/></li>
						<li><input type="submit" className="button" value="Get Weather"/></li>
					</ul>
				</form>
			</div>
		</div>
		);
	}
});

module.exports = AppNav;