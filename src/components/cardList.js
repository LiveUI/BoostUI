import React, { Component } from "react";
import "./card.sass";
import PropTypes from "prop-types";

import CardItem from "./cardItem";

import IconRekola from "../apiData/rekola.jpg";
import IconIos from "../shapes/ios";
import IconAndroid from "../shapes/android";
import IconTrash from "../shapes/trash";

export default class CardList extends Component {
	state = {
		name: this.props.name,
		id: this.props.id,
		versionNumber: this.props.versionNumber,
		versionCode: this.props.versionCode,
		platform: this.props.platform,
		type: this.props.type || "list",
		builds: this.props.builds || [],
		delete: this.props.delete,
		index: this.props.index
	};

	componentWillReceiveProps(nextProps) {
		this.setState({
			name: nextProps.name,
			id: nextProps.id,
			versionNumber: nextProps.versionNumber,
			versionCode: nextProps.versionCode,
			platform: nextProps.platform,
			type: nextProps.type || "list",
			builds: nextProps.builds || [],
			delete: nextProps.delete,
			index: nextProps.index
		});
	}

	delete = () => {
		console.log(this.state.index);
		this.state.delete(this.state.index);
	};

	getBuildDate(dateTime) {
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
				{this.state.type === "list" ? (
					<div className="card-header">
						<div
							className="card-header-part card-header-part-delete"
							onClick={this.delete}
						>
							<IconTrash /> Delete all
						</div>
						<div className="card-header-part">
							<div className="card-header-part-name">
								{this.props.name}
								<span className="card-header-part-name-icon">
									{this.getPlatformIcon()}
								</span>
							</div>
							<div className="card-header-part-id">({this.props.id})</div>
						</div>
						<div className="card-header-part card-header-part-build">
							{this.props.versionNumber} (568)
						</div>
					</div>
				) : (
					<div className="card-header">
						<div
							className="card-header-part card-header-part-delete"
							onClick={this.delete}
						>
							<IconTrash /> Delete all
						</div>
						<div className="card-header-part">
							<div className="card-header-part-name">
								{this.props.name}
								<span className="card-header-part-name-icon">
									{this.getPlatformIcon()}
								</span>
							</div>
							<div className="card-header-part-id">({this.props.id})</div>
						</div>
						<div className="card-header-part" />
					</div>
				)}
				<div className="card-content">
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
									icon={item.icon}
									name={item.name}
									appId={item.id}
									versionNumber={item.version}
									versionCode={"568"}
									date={this.getBuildDate(item.created)}
								/>
							);
						})}
						<CardItem
							isAll={true}
							isLast={false}
							link={"/app/" + this.state.id + "/" + this.state.platform}
							icon={IconRekola}
						/>
					</div>
				</div>
			</div>
		);
	}
}

CardList.contextTypes = {
	connector: PropTypes.object,
	token: PropTypes.string
};
