import React, { Component } from "react";
import PropTypes from "prop-types";
import "./login.sass";
import "../components/form.sass";

import { Link } from "react-router-dom";
import Button from "../components/button";
import TextInput from "../components/textInput";

import IconEnter from "../shapes/enter";
import IconNewUser from "../shapes/newUser";
import IconInfo from "../shapes/info";

export default class Register extends Component {
	state = {
		icon: this.props.icon || ""
	};

	componentWillReceiveProps(props) {
		this.setState({
			icon: props.icon || ""
		});
		console.log(this.state.icon);
	}

	handleLogin = event => {
		let data = {
			email: this.state.email,
			username: this.state.username,
			firstname: this.state.fname,
			lastname: this.state.lname,
			password: this.state.password
		};
		this.context.connector
			.register(data)
			.then(response => {
				console.log(response);
				this.props.history.push("/login");
			})
			.catch(error => {
				this.setState({
					// TODO: Handle more failures (can't connect, incorrect credentials, server error...)
					showError: true
				});
				console.log(error);
			});
		event.preventDefault();
	};

	handleChange = event => {
		let change = {};
		change[event.target.name] = event.target.value;
		this.setState(change);
	};

	render() {
		console.log(this.state);
		return (
			<div className="login">
				<form onSubmit={this.handleLogin} className="form">
					<div className="form-icon">
						<img
							src={this.state.icon[64]}
							srcSet={`${this.state.icon[64]}, ${this.state.icon[128]} 2x`}
							alt="Server icon"
						/>
					</div>
					<TextInput
						name="username"
						type="text"
						placeholder="Username"
						value={this.state.username || ""}
						onChange={this.handleChange}
					/>
					<TextInput
						name="fname"
						type="text"
						placeholder="First name"
						value={this.state.fname || ""}
						onChange={this.handleChange}
					/>
					<TextInput
						name="lname"
						type="text"
						placeholder="Last name"
						value={this.state.lname || ""}
						onChange={this.handleChange}
					/>
					<TextInput
						name="email"
						type="email"
						placeholder="E-mail"
						value={this.state.email || ""}
						onChange={this.handleChange}
					/>
					<TextInput
						name="password"
						type="password"
						placeholder="Password"
						value={this.state.password || ""}
						onChange={this.handleChange}
					/>
					<TextInput
						name="password_again"
						type="password"
						placeholder="Password again"
						value={this.state.password_again || ""}
						onChange={this.handleChange}
					/>
					<div className="login-texts">
						{this.state.showError === true ? (
							<div className="login-error">
								<IconInfo color="#ff0000" /> Incorrect credentials
							</div>
						) : null}
						<Link className="login-forgot" to="/">
							Forgotten password
						</Link>
					</div>
					<div className="login-links">
						<Link className="login-link" to="/login">
							<IconEnter color="#236aea" /> Login
						</Link>
						<Button className="login-link login-link-submit">
							<IconNewUser color="white" /> Register
						</Button>
					</div>
				</form>
			</div>
		);
	}
}

Register.contextTypes = {
	connector: PropTypes.object,
	token: PropTypes.string,
	setToken: PropTypes.func,
	name: PropTypes.string
};
