import React from "react";
import PropTypes from "prop-types";

export default class HistoryWatcher extends React.Component {
	static contextTypes = {
		history: PropTypes.object
	};

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		console.log(this.props);
		this.unlisten = this.context.history.subscribe(() => {
			console.log("was I successful");
		});
	}

	componentWillUnmount() {
		//this.unlisten();
	}

	render() {
		return null;
	}
}
