import React, { Component } from "react";

export default class CardInfoDetailInstall extends Component {
	state = {
		icon: this.props.icon,
		name: this.props.name,
		date: this.props.date
	};

	render() {
		return (
			<div className="card-detail-column-item">
				<div className="card-detail-column-item-left">
					<div className="card-detail-column-item-left-icon">
						<img src={this.state.icon} alt={this.state.name} />
					</div>
					<div className="card-detail-column-item-left-name">
						{this.state.name}
					</div>
				</div>
				<div className="card-detail-column-item-right">{this.state.date}</div>
			</div>
		);
	}
}
