import React, { Component } from "react";

import "./loading.sass";

export default class Loading extends Component {
	state = {
		status: this.props.status,
		total: this.props.total,
		current: this.props.current
	};

	componentWillReceiveProps(nextProps) {
		this.setState({
			status: nextProps.status,
			total: nextProps.total,
			current: nextProps.current
		});
	}

	render() {
		return (
			<div className="loading">
				loading
				<br />
				loading
				<br />
				loading
				<br />
				loading
				<br />
				loading
				<br />
				<div className="loading-line" />
			</div>
		);
	}
}
