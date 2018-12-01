import React, { Component } from "react";
import "./cardItem.sass";

import IconArrowRight from "../shapes/arrowRight";

export default class TeamItem extends Component {
	state = {
		name: this.props.name || "Unknown team",
		icon: this.props.icon,
		id: this.props.id
	};

	componentWillReceiveProps(nextProps) {
		this.setState({
			name: nextProps.name || "Unknown team",
			icon: nextProps.icon,
			id: nextProps.id
		});
	}

	selectTeam = () => {
		this.props.select(this.state.id);
	};

	render() {
		return (
			<div
				onClick={this.selectTeam}
				className={
					"card-content-list-item is-team" +
					(this.state.active ? " is-active" : "")
				}
			>
				<div className="card-content-list-item-image">
					<img alt="Goodlok" src={this.state.icon} />
				</div>
				<div className="card-content-list-item-text">{this.state.name}</div>
				<div className="card-content-list-item-open">
					<IconArrowRight />
				</div>
			</div>
		);
	}
}
