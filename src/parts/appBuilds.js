import React, { Component } from "react";
import PropTypes from "prop-types";
import "./page.sass";
import "./apiBuilds.sass";

import IconRekola from "../apiData/rekola.jpg";
import CardListBuilds from "../components/cardListBuilds";
import IconMobile from "../shapes/mobile";
import Button from "../components/button";
import IconBack from "../shapes/back";

export default class AppBuilds extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loaded: false,
			name: "Goodlok",
			identifier: props.match.params.appId,
			build: 0,
			version: "",
			platform: props.match.params.platform,
			builds: []
		};

		this.downloadBuild = this.downloadBuild.bind(this);
	}

	componentDidMount() {
		this.context.connector
			.apps(this.state.platform, this.state.identifier, 10)
			.then(result => {
				console.log(result);
				this.setState({
					loaded: true,
					name: result[0].name,
					version: result[0].version,
					build: result[0].build,
					builds: result
				});
			})
			.catch(err => {
				console.error(err);
			});
	}

	downloadBuild(e) {
		e.preventDefault();
		console.log("Started download");
		this.context.connector
			.download(this.state.uuid)
			.then(result => {
				console.log(result);
				if (typeof result.error !== "undefined") {
					throw new Error();
				}
				const isIos =
					/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
				if (this.state.platform === "ios" && isIos) {
					// download for ios
					window.location.href = result.ios;
				} else {
					// download for desktop and android
					window.location.href = result.file;
				}
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
				<div className="card">
					<div className="card-header builds">
						<div className="builds-icon">
							<img
								className="builds-icon-image"
								src={IconRekola}
								alt={this.state.name}
							/>
						</div>
						<div className="builds-name">{this.state.name}</div>
						<div className="builds-id">({this.state.identifier})</div>
						<div className="builds-version">
							v{this.state.version} ({this.state.build})
						</div>
						<Button
							className="card-column-download"
							onClick={this.downloadBuild}
						>
							<IconMobile /> <span>Install latest</span>
						</Button>
					</div>
					<div className="card-content">
						<CardListBuilds showAll={true} builds={this.state.builds} />
					</div>
				</div>
			</div>
		);
	}
}

AppBuilds.contextTypes = {
	connector: PropTypes.object,
	token: PropTypes.string
};
