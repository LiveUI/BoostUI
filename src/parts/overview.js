import React, { Component } from "react";
import PropTypes from "prop-types";
import "./page.sass";

import CardList from "../components/cardList";
import Button from "../components/button";
import IconBack from "../shapes/back";

export default class Overview extends Component {
	state = {
		loaded: false,
		loadingStatus: "start",
		data: [],
		appData: {},
		loadingTotal: 1,
		loadingCurrent: 0,
		appsOffset: 0,
		isFetchingAdditionalApps: false,
		noApps: false
	};

	componentDidMount() {
		this.fetchApps();
	}

	fetchApps = () => {
		this.setState({
			isFetchingAdditionalApps: true
		});
		this.context.connector
			.overview(9, this.state.appsOffset)
			.then(result => {
				if (typeof result.error !== "undefined") {
					throw new Error();
				}
				this.setState({
					loaded: true,
					data: this.state.data.concat(result),
					loadingStatus: "ajax",
					loadingCurrent: 1,
					appsOffset: this.state.appsOffset + 10,
					isFetchingAdditionalApps: false,
					noApps: this.state.data.concat(result).length === 0
				});
				let itemsProcessed = 0;
				result.forEach(item => {
					this.context.connector
						.apps(item.platform, item.identifier, 4)
						.then(cresult => {
							let appData = this.state.appData;
							appData[item.identifier + "-" + item.platform] = cresult;
							this.setState({
								appData: appData
							});
							itemsProcessed++;
							if (itemsProcessed === result.length - 1) {
								this.setState({
									loaded: true,
									loadingStatus: "done"
								});
							}
						})
						.catch(err => {
							console.error(err);
							itemsProcessed++;
							if (itemsProcessed === result.length - 1) {
								this.setState({
									loaded: true,
									loadingStatus: "done"
								});
							}
						});
				});
			})
			.catch(error => {
				console.error(error);
				this.setState({
					isFetchingAdditionalApps: false
				});
			});
	};

	handleScroll = e => {
		const bottom =
			e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
		if (bottom) {
			if (this.state.isFetchingAdditionalApps === false) {
				this.fetchApps();
			}
		}
	};

	getAppParam(identifier, platform, name) {
		let app = this.state.appData[identifier + "-" + platform];
		if (typeof app !== "undefined") {
			return app[app.length - 1][name];
		} else {
			return "Unknown";
		}
	}

	getAppBuilds(identifier, platform) {
		return this.state.appData[identifier + "-" + platform];
	}

	delete = index => {
		this.context.connector
			.deleteApps(this.state.data[index].identifier)
			.then(() => {
				console.log(this.state.data);
				let newBuilds = this.state.data.splice(index, 1);
				this.setState({
					data: newBuilds
				});
			})
			.catch(error => {
				console.error(error);
			});
	};

	render() {
		return this.state.loaded === false ? (
			<div id="loading">
				<div className="loading-line" />
			</div>
		) : this.state.noApps === false ? (
			<div className="page" onScroll={this.handleScroll}>
				<div className="page-controls">
					<div className="page-control">
						<IconBack /> Back
					</div>
					<div className="page-control">
						Sort by{" "}
						<select className="page-control-value">
							<option>name</option>
							<option>size</option>
							<option>upload date</option>
						</select>
					</div>
				</div>
				{this.state.data.map((item, key) => {
					return (
						<CardList
							key={key}
							index={key}
							delete={this.delete}
							name={this.getAppParam(item.identifier, item.platform, "name")}
							id={item.identifier}
							versionNumber={this.getAppParam(
								item.identifier,
								item.platform,
								"version"
							)}
							versionCode={"857"}
							platform={item.platform}
							builds={this.getAppBuilds(item.identifier, item.platform)}
						/>
					);
				})}
			</div>
		) : (
			<div className="page">
				<div className="page-upload">
					<p className="page-upload-text">No apps here yet.</p>
					<Button>Upload app</Button>
				</div>
			</div>
		);
	}
}

Overview.contextTypes = {
	connector: PropTypes.object,
	token: PropTypes.string
};
