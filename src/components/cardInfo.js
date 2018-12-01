import React, { Component } from "react";
import PropTypes from "prop-types";
import "./card.sass";
import "./cardInfo.sass";

import Button from "./button";
import AppIcon from "./AppIcon";

import IconMobile from "../shapes/mobile";
import IconDownload from "../shapes/download";

import bytes from "pretty-bytes";

export default class CardInfo extends Component {
	static getPlatformName(platform) {
		switch (platform) {
			case "ios":
				return "iOS";
			case "android":
				return "Android";
			default:
				return "Unknown";
		}
	}

	downloadBuild = e => {
		e.preventDefault();
		console.log("Started download");
		this.context.connector
			.download(this.props.uuid)
			.then(result => {
				console.log(result);
				if (typeof result.error !== "undefined") {
					throw new Error();
				}
				const isIos =
					/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
				if (this.props.platform === "ios" && isIos) {
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
	};

	render() {
		return (
			<div className="card card-columns">
				<div className="card-column">
					<div className="card-column-icon">
						<AppIcon
							empty={!this.props.icon}
							appId={this.props.uuid}
							name={this.props.name}
						/>
					</div>
					{(navigator.userAgent.toLowerCase().indexOf("android") > -1 &&
						this.props.platform === "android") ||
					(/iPad|iPhone|iPod/.test(navigator.userAgent) &&
						!window.MSStream &&
						this.props.platform === "ios") ? (
						<Button
							className="card-column-download"
							onClick={this.downloadBuild}
						>
							<IconMobile /> <span>Install latest</span>
						</Button>
					) : (
						<Button
							className="card-column-download"
							onClick={this.downloadBuild}
						>
							<IconDownload /> <span>Download latest</span>
						</Button>
					)}
				</div>
				<div className="card-column">
					<h1 className="card-column-name">{this.props.name}</h1>
					<h2 className="card-column-id">({this.props.id})</h2>
					<p className="card-column-description">
						Lorem ipsum dolor sit amet. Jenkins and CI could even save you the
						embarrassment of potentially deploying an unstable version of your
						code to your beta testers or worse, into app stores. So now that
						you've decided you want to improve your team's quality of code,
						reduce time spent tracking old bugs and reduce risk early on with...
					</p>
					<div className="card-column-commit">
						<div className="card-column-commit-header">
							<div className="card-column-commit-header-info">
								Commit message:{" "}
								<span className="card-column-commit-header-info-msg">
									#346224
								</span>
							</div>
							<div className="card-column-commit-header-version">
								{this.props.versionNumber}
							</div>
						</div>
						<p className="card-column-commit-content">
							So now that you've decided you want to improve your team's quality
							of code, reduce time spent tracking old bugs and reduce risk early
							on with...
						</p>
					</div>
				</div>
				<div className="card-column">
					<div className="card-column-infobox">
						<div className="card-column-infobox-item">
							<div className="card-column-infobox-item-name">Platform:</div>
							<div className="card-column-infobox-item-value">
								{CardInfo.getPlatformName(this.props.platform)}
							</div>
						</div>
						<div className="card-column-infobox-item">
							<div className="card-column-infobox-item-name">Version:</div>
							<div className="card-column-infobox-item-value">
								{this.props.versionNumber}
							</div>
						</div>
						<div className="card-column-infobox-item">
							<div className="card-column-infobox-item-name">Bundle:</div>
							<div className="card-column-infobox-item-value">
								{this.props.versionCode}
							</div>
						</div>
						<div className="card-column-infobox-item">
							<div className="card-column-infobox-item-name">Size:</div>
							<div className="card-column-infobox-item-value">
								{this.props.size && bytes(this.props.size)}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CardInfo.contextTypes = {
	connector: PropTypes.object,
	token: PropTypes.string
};
