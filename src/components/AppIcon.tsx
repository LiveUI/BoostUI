import cn from "classnames";
import memoize from "memoize-one";
import PropTypes from "prop-types";
import React, { Component } from "react";
import "./AppIcon.sass";

import IconEmpty from "../shapes/empty.png";

interface Props {
	appId: string;
	name: string;
	empty?: boolean;
}

interface State {
	url?: string;
}

export default class AppIcon extends Component<Props, State> {
	public static contextTypes = {
		connector: PropTypes.object
	};

	public context: any;

	public state = {
		url: undefined
	};

	private loadImage = memoize((empty, appId) => {
		if (!empty && appId) {
			this.context.connector.networking
				.get(`/apps/${appId}/icon`)
				.then((res: Response) => res.blob())
				.then((blob: Blob) => {
					const urlCreator = window.URL;
					const url = urlCreator.createObjectURL(blob);
					this.setState({ url });
				})
				.catch(() => {
					const url = IconEmpty;
					this.setState({ url });
				});
		} else {
			const url = IconEmpty;
			this.setState({ url });
		}
	});

	public componentDidMount() {
		this.loadImage(this.props.empty, this.props.appId);
	}

	public componentDidUpdate() {
		this.loadImage(this.props.empty, this.props.appId);
	}

	public render() {
		return (
			<div
				className={cn(
					"AppIcon",
					this.state.url ? "view-loaded" : "view-loading"
				)}
			>
				<span className="AppIcon-img">
					{this.state.url && <img src={this.state.url} alt={this.props.name} />}
				</span>
			</div>
		);
	}
}
