import React, { Component } from "react";
import IconPen from "../shapes/pen";
import IconTrash from "../shapes/trash";
import PropTypes from "prop-types";

export default class ApiKey extends Component {
	state = {
		name: this.props.name,
		id: this.props.id,
		team: this.props.team
	};

	handleDelete = () => {
		this.props.deleteKey(this.state.id);
	};

	render() {
		return (
			<tr>
				<td>{this.state.name}</td>
				<td>20.2.2018</td>
				<td>
					<span className="api-action api-action-blue">
						<IconPen /> Edit
					</span>
					<span
						className="api-action api-action-red"
						onClick={this.handleDelete}
					>
						<IconTrash /> Delete
					</span>
				</td>
			</tr>
		);
	}
}

ApiKey.contextTypes = {
	connector: PropTypes.object,
	token: PropTypes.string
};
