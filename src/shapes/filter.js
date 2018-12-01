import React, { Component } from "react";

export default class IconFilter extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isOpened: false
		};

		this.opened = {
			fill: "#236aea"
		};

		this.closed = {
			fill: "none",
			strokeWidth: "2px",
			strokeLinecap: "round",
			stroke: "#364041"
		};
	}

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			this.setState({
				isOpened: this.props.isOpened
			});
		}
	}

	render() {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="27"
				height="27"
				viewBox="-1.5 -1.5 30 30"
			>
				<defs>
					<path
						id="8722a"
						d="M1418.31 28h-23.62a1.69 1.69 0 0 0-1.2 2.88l9.63 9.63v9.85c0 .49.22.95.58 1.27l3.38 2.95c1.07.94 2.8.2 2.8-1.27v-12.8l9.62-9.63a1.69 1.69 0 0 0-1.19-2.88z"
					/>
				</defs>
				<g>
					<g transform="translate(-1393 -28)">
						<use
							style={this.state.isOpened ? this.opened : this.closed}
							xlinkHref="#8722a"
						/>
					</g>
				</g>
			</svg>
		);
	}
}
