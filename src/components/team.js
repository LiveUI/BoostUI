import React, { Component } from "react";
import "./card.sass";

import CardItem from "./cardItem";

import IconRekola from "../apiData/rekola.jpg";
import IconIos from "../shapes/ios";
import IconAndroid from "../shapes/android";
import IconTrash from "../shapes/trash";

export default class Team extends Component {
	static getBuildDate(dateTime) {
		let date = new Date(dateTime);
		return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
	}

	getPlatformIcon() {
		switch (this.state.platform) {
			case "ios":
				return <IconIos />;
			case "android":
				return <IconAndroid />;
			default:
				return null;
		}
	}

	render() {
		return (
			<div className="card">
				<div className="card-content">Tady bude kontentík</div>A tady mimo
			</div>
		);
	}
}
