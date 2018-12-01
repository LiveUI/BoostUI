import React, { Component } from "react";
import PropTypes from "prop-types";
import Dropzone from "react-dropzone";

import "./modal.sass";

export default class Modal extends Component {
	state = {
		accepted: false,
		onAccept: this.props.onAccept
	};

	handleDrop = (acceptedFiles, rejectedFiles) => {
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
		} else {
			// wtf shouldn't happen
		}
	};

	render() {
		return (
			<div className="modal">
				<div className="modal-inner">
					{this.props.type === "file" ? (
						<Dropzone className="modal-dropzone" onDrop={this.handleDrop}>
							Drop .apk or .ipa to upload
						</Dropzone>
					) : (
						"unknown"
					)}
				</div>
			</div>
		);
	}
}

Modal.contextTypes = {
	connector: PropTypes.object,
	token: PropTypes.string
};
