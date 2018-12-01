import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";
import { Link } from "react-router-dom";
import "./header.sass";

import Button from "./button";

import IconPlus from "../shapes/plus";
import IconBars from "../shapes/bars";
import IconTimes from "../shapes/times";
import IconFilter from "../shapes/filter";

export default class Header extends Component {
	state = {
		upload: false,
		icon: this.props.icon,
		isMoved: false,
		filteringIsVisible: false
	};

	componentDidMount() {
		if (this.context.token.length === 0) {
			window.location.href = "/login";
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			this.setState({
				isMoved: this.props.isMoved,
				filteringIsVisible: this.props.filteringIsVisible
			});
		}
	}

	onAccept = () => {
		this.setState({
			upload: false
		});
	};

	showUpload = () => {
		this.setState({
			upload: true
		});
	};

	handleDrop(acceptedFiles, rejectedFiles) {
		if (this.state.accepted === false) {
			if (acceptedFiles.length !== 0) {
				this.setState({
					accepted: true
				});
				this.context.connector
					.upload(acceptedFiles[0])
					.then(result => {
						if (typeof result.error !== "undefined") {
							throw new Error();
						}
						this.state.onAccept();
					})
					.catch(error => {
						console.log(error);
					});
			}
		}
	}

	render() {
		return (
			<header
				className={
					"header" + (this.state.filteringIsVisible ? " has-filtering" : "")
				}
			>
				<div className="header-part header-menu">
					<div onClick={this.props.toggleMenu}>
						{this.state.isMoved === true ? <IconTimes /> : <IconBars />}
					</div>
				</div>
				<div className="header-part header-logo">
					<Link className="header-logo-link" to={"/"}>
						<img
							src={this.context.icons[64]}
							srcSet={`${this.context.icons[64]}, ${
								this.context.icons[128]
							} 2x`}
							alt={this.context.name}
						/>
					</Link>
				</div>
				<div className="header-part header-buttons">
					<Dropzone className="none" onDrop={this.handleDrop}>
						<Button>
							<IconPlus />
							<span>Add new build</span>
						</Button>
					</Dropzone>
					<div className="header-filter" onClick={this.props.toggleFiltering}>
						<IconFilter isOpened={this.state.filteringIsVisible} />
					</div>
				</div>
				<div className="header-filtering">
					<div className="header-filtering-inner">
						<input
							className="header-filtering-search"
							placeholder="Search"
							type="search"
						/>
						<div className="header-filtering-list">
							<div className="header-filtering-item">
								jQuery 10.13 <IconTimes />
							</div>
							<div className="header-filtering-item">
								Xcode 10 <IconTimes />
							</div>
							<div className="header-filtering-item">
								Vapor 3 <IconTimes />
							</div>
						</div>
					</div>
				</div>
			</header>
		);
	}
}

Header.contextTypes = {
	connector: PropTypes.object,
	token: PropTypes.string,
	name: PropTypes.string,
	icons: PropTypes.object
};
