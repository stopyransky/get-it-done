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
			<div className="todo-login">
				<div className="login-button" onClick={this.onGithubLogin}>
					<img src="assets/github-48.png" />
				</div>
				<div className="login-button" onClick={this.onFacebookLogin}>
					<img src="assets/facebook-48.png" />
				</div>
				<div className="login-button" onClick={this.onTwitterLogin}>
					<img src="assets/twitter-48.png" />
				</div>
			</div>
		);
	}
}

export default Redux.connect()(TodoLogin);
