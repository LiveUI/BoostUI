import React, { Component } from "react";
import "./form.sass";

export default class Form extends Component {
	constructor(props) {
		super(props);

		this.state = {
			children: this.props.children
		};
	}

	render() {
		return (
			<form {...this.props} className="form">
				{this.state.children}
			</form>
		);
	}
}
