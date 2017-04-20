var React = require('react');
var { Link } = require('react-router');
// stateless functional component
var AppAbout  = ( props ) => (
	<div>
		<h1 className="text-center page-title">Examples</h1>
		<p> Here are a few example locations to try out:</p>
		<ol>
			<li>
				<Link to='/?location=Philadelphia'>Philadelphia</Link>
			</li>
			<li>
				<Link to='/?location=Miami'>Miami</Link>
			</li>
			<li>
				<Link to='/?location=Los%20Angeles'>Los Angeles</Link>
			</li>
		</ol>
	</div>
	);

module.exports = AppAbout;