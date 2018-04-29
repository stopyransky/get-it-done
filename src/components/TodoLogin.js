import React from "react";
import * as Redux from 'react-redux';
import * as actions from '../redux/actions';

export class TodoLogin extends React.Component {

	constructor(props) {
		super(props);
		this.onGithubLogin=this.onGithubLogin.bind(this);
		this.onFacebookLogin=this.onFacebookLogin.bind(this);
		this.onTwitterLogin=this.onTwitterLogin.bind(this);
	}

	onGithubLogin() {
		const {dispatch} = this.props;
		dispatch(actions.startLogin());
	}
	onFacebookLogin() {
		console.log("Facebook login action");
		const {dispatch} = this.props;
		dispatch(actions.startFacebookLogin());
	}
	onTwitterLogin() {
		console.log("Twitter login action goes here");
	}

	render() {
		return (
			<div className="todo-login">
				<div className="login-button" onClick={this.onGithubLogin}>
					<img src="assets/github-48.png" alt="github icon" />
				</div>
				<div className="login-button" onClick={this.onFacebookLogin}>
					<img src="assets/facebook-48.png" alt="facebook icon" />
				</div>
				<div className="login-button" onClick={this.onTwitterLogin}>
					<img src="assets/twitter-48.png" alt="twitter icon" />
				</div>
			</div>
		);
	}
}

export default Redux.connect()(TodoLogin);
