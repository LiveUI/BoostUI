import React, { Component } from "react";

import CardInfoDetailMessage from "./cardInfoDetailMessage";
import CardInfoDetailInstall from "./cardInfoDetailInstall";

import "./card.sass";
import "./cardInfoDetail.sass";

import IconRekola from "../apiData/rekola.jpg";
import CardInfoDetailForm from "./cardInfoDetailForm";

export default class CardInfoDetail extends Component {
	render() {
		return (
			<div className="card card-detail">
				<div className="card-detail-column">
					<div className="card-detail-column-header">
						<h2>Messages:</h2>
					</div>
					<CardInfoDetailMessage
						icon={IconRekola}
						name={"Rafiki270"}
						date={"31/12/2017 - 13:30"}
						content={
							"Hey @spoony, make it pretty or else! Lorem ipsum dolor sit amet. Jenkins and CI could even save you the embarrassment of potentially deploying an unstable version of your code to your beta testers or worse, into app stores. So now that you've decided you want to" +
							"improve your team's quality of code, reduce time spent tracking old bugs and reduce risk early on with ..."
						}
					/>
					<CardInfoDetailMessage
						icon={IconRekola}
						name={"Pavelfuchs"}
						date={"31/12/2017 - 13:30"}
						content={
							"Hey @spoony, make it pretty or else! Lorem ipsum dolor sit amet. Jenkins and CI could even save you the embarrassment of potentially deploying an unstable version of your code to your beta testers or worse, into app stores. So now that you've decided you want to."
						}
					/>
					<CardInfoDetailMessage
						icon={IconRekola}
						name={"Rafiki270"}
						date={"31/12/2017 - 13:30"}
						content={
							"Hey @spoony, make it pretty or else! Lorem ipsum dolor sit amet. Jenkins and CI could even save you the embarrassment of potentially deploying an unstable version of your code to your beta testers or worse, into app stores. So now that you've decided you want to" +
							"improve your team's quality of code, reduce time spent tracking old bugs and reduce risk early on with ..."
						}
					/>
					<CardInfoDetailMessage
						icon={IconRekola}
						name={"Pavelfuchs"}
						date={"31/12/2017 - 13:30"}
						content={
							"Hey @spoony, make it pretty or else! Lorem ipsum dolor sit amet. Jenkins and CI could even save you the embarrassment of potentially deploying an unstable version of your code to your beta testers or worse, into app stores. So now that you've decided you want to."
						}
					/>
					<CardInfoDetailForm icon={IconRekola} name={"Pavelfuchs"} />
				</div>
				<div className="card-detail-column card-detail-column-border">
					<div className="card-detail-column-header">
						<h2>Installs:</h2>
					</div>
					<CardInfoDetailInstall
						icon={IconRekola}
						name={"Rafiki270 - iPad Pro"}
						date={"31/12/2017 - 13:30"}
					/>
					<CardInfoDetailInstall
						icon={IconRekola}
						name={"Rafiki270 - iPad Pro"}
						date={"31/12/2017 - 13:30"}
					/>
					<CardInfoDetailInstall
						icon={IconRekola}
						name={"Rafiki270 - iPad Pro"}
						date={"31/12/2017 - 13:30"}
					/>
					<CardInfoDetailInstall
						icon={IconRekola}
						name={"Rafiki270 - iPad Pro"}
						date={"31/12/2017 - 13:30"}
					/>
				</div>
			</div>
		);
	}
}
