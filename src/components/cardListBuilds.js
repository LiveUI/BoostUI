import React, { Component } from "react";
import CardItem from "./cardItem";
import IconRekola from "../apiData/rekola.jpg";

export default class CardListBuilds extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: props.id,
			builds: props.builds || [],
			showAll: props.showAll || false
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			id: nextProps.id,
			builds: nextProps.builds || [],
			showAll: nextProps.showAll || false
		});
	}

	getBuildDate(dateTime) {
		let date = new Date(dateTime);
		return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
	}

	render() {
		return (
			<div className="card-content-list">
				{this.state.builds.map((item, key) => {
					return (
						<CardItem
							isAll={false}
							isLast={key === 0}
							key={key}
							link={
								"/app/" +
								this.state.id +
								"/" +
								this.state.platform +
								"/build/" +
								item.id
							}
							icon={IconRekola}
							versionNumber={item.version}
							versionCode={"568"}
							date={this.getBuildDate(item.created)}
						/>
					);
				})}
				{this.state.showAll === false ? (
					<CardItem
						isAll={!this.state.showAll}
						isLast={false}
						link={"/app/" + this.state.id + "/" + this.state.platform}
						icon={IconRekola}
					/>
				) : null}
			</div>
		);
	}
}
