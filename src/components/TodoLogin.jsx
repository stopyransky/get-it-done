import React from "react";
import * as Redux from 'react-redux';
import * as actions from 'actions';

export class TodoLogin extends React.Component {

	constructor(props) {
		super(props);
		this.onGithubLogin=this.onGithubLogin.bind(this);
		this.onFacebookLogin=this.onFacebookLogin.bind(this);
		this.onTwitterLogin=this.onTwitterLogin.bind(this);
	}

	onGithubLogin() {
		var {dispatch} = this.props;
		dispatch(actions.startLogin());
	}
	onFacebookLogin() {
		console.log("Facebook login action");
		var {dispatch} = this.props;
		dispatch(actions.startFacebookLogin());
	}
	onTwitterLogin() {
		console.log("Twitter login action");
		// var {dispatch} = this.props;
		// dispatch(actions.startTwitterLogin());
	}

	render() {
		return (
			<div>
				<h1 className="page-title">TodoApp login</h1>
				<div className="row">
					<div className="columns small-centered small-10 medium-6 large-4">
						<p>Login with one of social accounts below.</p>
						<div className ="callout callout-auth">
							{/*<h3>Login</h3>*/}
							
							<button className="button" onClick={this.onGithubLogin}>
								<img src="assets/github-48.png" /></button>
							<button className="button" onClick={this.onFacebookLogin}>
								<img src="assets/facebook-48.png" /></button>
							{/*<button className="button" onClick={this.onTwitterLogin}>Login with Twitter</button>*/}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Redux.connect()(TodoLogin);
