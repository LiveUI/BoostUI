import React, { Component } from "react";

export default class IconEnter extends Component {
	render() {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="12"
				height="11"
				viewBox="0 0 12 11"
			>
				<defs>
					<path
						id="ls2sa"
						d="M831 508.56v9.2c0 .32-.25.57-.56.57h-7.27a.54.54 0 0 1-.54-.56v-2.56a.56.56 0 0 1 1.11 0v2h6.14v-8.1h-6.14v2a.56.56 0 0 1-1.11 0v-2.55c0-.31.23-.56.54-.56h7.27c.31 0 .56.25.56.56zm-5.92 6.4a.56.56 0 1 0 .79.78l2.18-2.2a.56.56 0 0 0 0-.79l-2.18-2.2a.56.56 0 0 0-.8.78l1.25 1.26-6.76.01a.56.56 0 0 0 0 1.12l6.76-.01z"
					/>
				</defs>
				<g>
					<g transform="translate(-819 -508)">
						<use fill={this.props.color || "#fff"} xlinkHref="#ls2sa" />
					</g>
				</g>
			</svg>
		);
	}
}
