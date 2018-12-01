import React, { Component } from "react";
import "./textInput.sass";

export default class TextInput extends Component {
	state = this.props;

	componentWillReceiveProps(nextProps, prevProps) {
		this.setState(nextProps);
	}

	render() {
		return <input className="textInput" {...this.state} />;
	}
}
