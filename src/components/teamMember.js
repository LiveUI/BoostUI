import React, { Component } from "react";
import IconTrash from "../shapes/trash";
import CryptoJS from "crypto-js";

export default class TeamMember extends Component {
	state = {
		firstname: this.props.firstname,
		lastname: this.props.lastname,
		username: this.props.username,
		email: this.props.email,
		id: this.props.id,
		photo: ""
	};

	componentWillReceiveProps(nextProps) {
		this.setState({
			firstname: nextProps.firstname,
			lastname: nextProps.lastname,
			username: nextProps.username,
			email: nextProps.email,
			id: nextProps.id,
			photo: CryptoJS.MD5(nextProps.email)
		});
	}

	render() {
		return (
			<div className="card-content-member">
				<div className="card-content-member-info">
					<div className="card-content-member-info-photo">
						<img
							alt="Ondřej Rafaj"
							src={`https://www.gravatar.com/avatar/${this.state.photo}?s=66`}
							srcSet={`https://www.gravatar.com/avatar/${
								this.state.photo
							}?s=66, https://www.gravatar.com/avatar/${
								this.state.photo
							}?s=99 1.5x, https://www.gravatar.com/avatar/${
								this.state.photo
							}?s=132 2x`}
						/>
					</div>
					<div className="card-content-member-info-text">
						<div className="card-content-member-info-text-name">
							{this.state.firstname} {this.state.lastname}
						</div>
						<div className="card-content-member-info-text-contact">
							{this.state.username} • {this.state.email}
						</div>
					</div>
				</div>
				<div className="card-content-member-action">
					<IconTrash /> Remove
				</div>
			</div>
		);
	}
}
