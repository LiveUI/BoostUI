import React, { Component } from "react";

export default class IconInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			color: props.color || "#878787"
		};
	}

	render() {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
			>
				<defs>
					<path
						id="rib0a"
						d="M190 950.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zM188.5 936h3l-1 10h-1zm1.5-5a12 12 0 1 0 0 24 12 12 0 0 0 0-24z"
					/>
				</defs>
				<g>
					<g transform="translate(-178 -931)">
						<use fill={this.state.color} xlinkHref="#rib0a" />
					</g>
				</g>
			</svg>
		);
	}
}
