import React, { Component } from "react";
import "./button.sass";

export default class Button extends Component {
	state = {
		children: this.props.children,
		inactive: this.props.inactive || false,
		onClick: this.props.onClick
	};

	componentWillReceiveProps(nextProps) {
		this.setState({
			children: nextProps.children,
			inactive: nextProps.inactive || false,
			onClick: nextProps.onClick
		});
	}

	render() {
		return (
			<button
				className={"button" + (this.props.inactive ? " inactive" : "")}
				onClick={this.state.onClick}
			>
				{this.state.children}
			</button>
		);
	}
}
