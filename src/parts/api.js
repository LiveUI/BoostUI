import React, { Component } from "react";
import PropTypes from "prop-types";
import "../components/card.sass";

import "./api.sass";

import ApiKey from "../components/apiKey";

export default class Api extends Component {
	state = {
		keys: []
	};

	componentDidMount() {
		this.context.connector
			.apiKeys()
			.then(result => {
				console.log(result);
				this.setState({
					keys: result
				});
			})
			.catch(e => {
				console.error(e);
			});
	}

	deleteKey = id => {
		this.context.connector
			.deleteApiKey(id)
			.then(() => {
				let newKeys = [];
				this.state.keys.forEach(key => {
					if (key.id !== id) {
						newKeys.push(id);
					}
				});
				console.log(newKeys, this.state.keys);
				this.setState({
					keys: newKeys
				});
			})
			.catch(e => {
				console.error(e);
			});
	};

	render() {
		return (
			<div className="page">
				<div className="card">
					<div className="card-content">
						<table className="api">
							<thead>
								<tr>
									<td>Name/note</td>
									<td>Created</td>
									<td>Actions</td>
								</tr>
							</thead>
							<tbody>
								{this.state.keys.map((item, key) => {
									return (
										<ApiKey
											deleteKey={this.deleteKey}
											key={key}
											name={item.name}
											id={item.id}
											team={item.team}
										/>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		);
	}
}

Api.contextTypes = {
	connector: PropTypes.object,
	token: PropTypes.string
};
