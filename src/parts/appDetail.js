import React, { Component } from "react";
import PropTypes from "prop-types";
import "./page.sass";

import CardInfo from "../components/cardInfo";
import CardInfoDetail from "../components/cardInfoDetail";
import IconBack from "../shapes/back";
import CardTags from "../components/cardTags";

export default class AppDetail extends Component {
	state = {
		loaded: false,
		id: this.props.match.params.buildId,
		name: "",
		identifier: "",
		build: 0,
		version: "",
		platform: ""
	};

	componentDidMount() {
		this.context.connector
			.build(this.state.id)
			.then(result => {
				console.log(result);
				if (typeof result.error !== "undefined") {
					throw new Error();
				}
				this.setState({
					...result,
					loaded: true
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		return (
			<div className="page">
				<div className="page-controls">
					<div
						className="page-control is-active"
						onClick={this.props.history.goBack}
					>
						<IconBack /> Back
					</div>
				</div>
				<CardInfo
					name={this.state.name}
					versionNumber={this.state.version}
					versionCode={this.state.build}
					icon={this.state.icon}
					id={this.state.identifier}
					platform={this.state.platform}
					uuid={this.state.id}
					size={this.state.size}
				/>
				<CardTags />
				<CardInfoDetail />
			</div>
		);
	}
}

AppDetail.contextTypes = {
	connector: PropTypes.object,
	token: PropTypes.string
};
