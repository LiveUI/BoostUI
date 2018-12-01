import React, { Component } from "react";

import "./cardInfoDetailMessage.sass";

export default class CardInfoDetailMessage extends Component {
	state = {
		icon: this.props.icon,
		name: this.props.name,
		date: this.props.date,
		content: this.props.content
	};

	render() {
		return (
			<div className="card-info-detail-message">
				<div className="card-info-detail-message-icon">
					<img src={this.props.icon} alt={this.props.name} />
				</div>
				<div className="card-info-detail-message-item">
					<div className="card-info-detail-message-header">
						<div className="card-info-detail-message-header-name">
							{this.props.name}
						</div>
						<div className="card-info-detail-message-header-date">
							{this.props.date}
						</div>
					</div>
					<div className="card-info-detail-message-content">
						{this.props.content}
					</div>
				</div>
			</div>
		);
	}
}
