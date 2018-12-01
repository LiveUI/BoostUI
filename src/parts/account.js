import React, { Component } from "react";
import Button from "../components/button";

import "./page.sass";
import "./account.sass";

import IconRekola from "../apiData/rekola.jpg";
import IconCamera from "../shapes/camera";
import PropTypes from "prop-types";

export default class Account extends Component {
	componentDidMount() {
		console.log(this.context.token);
		this.context.connector
			.token(this.context.token)
			.then(result => {
				console.log(result);
			})
			.catch(err => {
				console.error(err);
			});
	}

	render() {
		return (
			<div className="page account">
				<div className="account-photo">
					<div className="account-photo-image">
						<img src={IconRekola} alt="User" />
					</div>
					<div className="account-photo-edit">
						<IconCamera />
					</div>
				</div>
				<div className="account-form">
					<form>
						<label className="account-form-item">
							<span className="account-form-item-label">Name:</span>
							<input
								type="text"
								name="name"
								className="account-form-item-input"
							/>
						</label>
						<label className="account-form-item">
							<span className="account-form-item-label">Email:</span>
							<input
								type="email"
								name="email"
								className="account-form-item-input"
							/>
						</label>
						<label className="account-form-item">
							<span className="account-form-item-label">New password:</span>
							<input
								type="password"
								name="password"
								className="account-form-item-input"
							/>
						</label>
						<label className="account-form-item">
							<span className="account-form-item-label">Repeat password:</span>
							<input
								type="password"
								name="passwordagain"
								className="account-form-item-input"
							/>
						</label>
						<Button className="account-form-submit">Save changes</Button>
					</form>
				</div>
			</div>
		);
	}
}

Account.contextTypes = {
	connector: PropTypes.object,
	token: PropTypes.string
};
