import React, { Component } from "react";

import "./cardInfoDetailMessage.sass";
import Button from "./button";
import IconPlus from "../shapes/plus";

export default class CardInfoDetailForm extends Component {
	state = {
		icon: this.props.icon,
		name: this.props.name
	};

	render() {
		return (
			<div className="card-info-detail-message">
				<div className="card-info-detail-message-icon">
					<img src={this.props.icon} alt={this.props.name} />
				</div>
				<div className="card-info-detail-message-item">
					<textarea
						className="card-info-detail-message-item-form"
						rows="4"
						placeholder="Reply…"
					/>
					<Button className="card-info-detail-message-item-button">
						<IconPlus /> Send message
					</Button>
				</div>
			</div>
		);
	}
}
