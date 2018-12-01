import AppIcon from "./AppIcon";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./cardItem.sass";

import Button from "./button";

import IconMobile from "../shapes/mobile";
import IconDownload from "../shapes/download";

export default class CardItem extends Component {
	render() {
		if (this.props.isAll === false) {
			return (
				<Link to={this.props.link} className="card-content-list-item">
					<div className="card-content-list-item-image">
						<AppIcon
							empty={!this.props.icon}
							name={this.props.name}
							appId={this.props.appId}
						/>
					</div>
					<div className="card-content-list-item-text">
						<div className="card-content-list-item-text-date">
							{this.props.date}
						</div>
						<div className="card-content-list-item-text-version">
							{this.props.versionNumber} ({this.props.versionCode}) >{" "}
						</div>
						{this.props.isLast === true ? (
							<div className="card-content-list-item-text-last">Last build</div>
						) : null}
					</div>
					<div className="card-content-list-item-download">
						{(navigator.userAgent.toLowerCase().indexOf("android") > -1 &&
							this.props.platform === "android") ||
						(/iPad|iPhone|iPod/.test(navigator.userAgent) &&
							!window.MSStream &&
							this.props.platform === "ios") ? (
							<Button inactive>
								<IconMobile />
							</Button>
						) : (
							<Button inactive>
								<IconDownload />
							</Button>
						)}
					</div>
				</Link>
			);
		} else {
			return (
				<Link to={this.props.link} className="card-content-list-item">
					<div className="card-content-list-item-all">
						<div className="card-content-list-item-all-big">Show all</div>
						<div className="card-content-list-item-all-small">(10 builds)</div>
					</div>
				</Link>
			);
		}
	}
}
