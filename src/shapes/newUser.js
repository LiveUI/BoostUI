import React, { Component } from "react";

export default class IconNewUser extends Component {
	render() {
		return (
			<svg
				className="newuser"
				xmlns="http://www.w3.org/2000/svg"
				width="16"
				height="11"
				viewBox="0 0 16 11"
			>
				<defs>
					<path
						id="8myta"
						d="M515.54 513.51a3.25 3.25 0 0 1 0-6.51 3.25 3.25 0 0 1 0 6.51zm0-5.55a2.29 2.29 0 0 0 0 4.59 2.29 2.29 0 0 0 0-4.59zm1.5 5.87c.67.21 4.03 1.37 4.03 3.04 0 .26-.21.48-.48.48h-10.1a.48.48 0 0 1-.49-.48c0-1.67 3.36-2.83 4.04-3.04a.48.48 0 0 1 .45.1l1.05.88 1.04-.89c.12-.1.3-.14.46-.1zm2.82 2.56a8.4 8.4 0 0 0-2.87-1.56l-1.14.98a.48.48 0 0 1-.63 0l-1.14-.98a8.4 8.4 0 0 0-2.86 1.56z"
					/>
					<path
						id="8mytb"
						d="M525.87 509.19h-2.06v-2.06a.13.13 0 0 0-.13-.13h-.36a.13.13 0 0 0-.13.13v2.06h-2.06a.13.13 0 0 0-.13.13v.36c0 .07.06.13.13.13h2.06v2.06c0 .07.06.13.13.13h.36c.07 0 .13-.06.13-.13v-2.06h2.06c.07 0 .13-.06.13-.13v-.36a.13.13 0 0 0-.13-.13z"
					/>
				</defs>
				<g>
					<g transform="translate(-510 -507)">
						<use fill={this.props.color || "#236aea"} xlinkHref="#8myta" />
					</g>
					<g transform="translate(-510 -507)">
						<use fill={this.props.color || "#236aea"} xlinkHref="#8mytb" />
					</g>
				</g>
			</svg>
		);
	}
}
