var React = require("react");
var {Link, IndexLink} = require("react-router");

var AppNav = React.createClass({
	
	onSearch : function(e ) {
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
					<li className="menu-text">
						<IndexLink to="/" activeClassName="active" activeStyle={{ fontWeight: 'bold' }}>React App!</IndexLink>
					</li>
					<li>
						<Link to="/greeter" activeClassName="active" activeStyle={{ fontWeight: 'bold' }}>Greeter</Link>
					</li>
					<li>
						<Link to="/weather" activeClassName="active" activeStyle={{ fontWeight: 'bold' }}>Weather</Link>
					</li>
					<li>
						<Link to="/examples" activeClassName="active" activeStyle={{ fontWeight: 'bold' }}>Examples</Link>
					</li>
					<li>
						<Link to="/about" activeClassName="active" activeStyle={{ fontWeight: 'bold' }}>About</Link>
					</li>
				</ul>
			</div>
			<div className="top-bar-right">
			<form onSubmit={this.onSearch}>
				<ul className="menu">
					<li>
						<input type="search" ref="search" placeholder="Search weather by city"/>
					</li>
					<li>
						<input type="submit" className="button" value="Get Weather"/>
					</li>
				</ul>
			</form>
			</div>
		</div>
		);
	}
});

	
module.exports = AppNav;

var old = (
	<div id='appNav'>
		<span>AppNav</span>
		<IndexLink to="/" activeClassName="active" activeStyle={{ fontWeight: 'bold' }}>Greeter</IndexLink>
		<Link to="/weather" activeClassName="active" activeStyle={{ fontWeight: 'bold' }}>Weather</Link>
		<Link to="/about" activeClassName="active" activeStyle={{ fontWeight: 'bold' }}>About</Link>
	</div>
);