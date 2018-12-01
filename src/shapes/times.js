import React, { Component } from "react";

export default class IconTimes extends Component {
	render() {
		return (
			<svg
				width="18px"
				height="18px"
				viewBox="0 0 32 32"
				version="1.1"
				xmlns="http://www.w3.org/2000/svg"
				style={{
					fillRule: "evenodd",
					clipRule: "evenodd",
					strokeLinejoin: "round",
					strokeMiterlimit: 1.5,
					stroke: "rgb(54, 64, 65)"
				}}
			>
				<g>
					<path
						d="M1.1,1.1L30.9,30.9"
						style={{
							fill: "none",
							strokeWidth: "3px"
						}}
					/>
					<path
						d="M30.9,1.1L1.1,30.9"
						style={{
							fill: "none",
							strokeWidth: "3px"
						}}
					/>
				</g>
			</svg>
		);
	}
}
