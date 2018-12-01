import React, { Component } from "react";
import PropTypes from "prop-types";
import "./card.sass";
import "./cardTags.sass";

import Button from "./button";
import IconTimes from "../shapes/times";
import IconPlus from "../shapes/plus";

export default class CardTags extends Component {
	render() {
		return (
			<div className="card card-columns">
				<div className="card-filtering card-column">
					<div className="card-filtering-inner">
						<div className="card-filtering-add">
							<input
								className="card-filtering-search"
								placeholder="Search or type new tag"
								type="search"
							/>
							<Button>
								<IconPlus /> Add tag
							</Button>
						</div>
						<div className="card-filtering-list">
							<div className="card-filtering-item">
								jQuery 10.13 <IconTimes />
							</div>
							<div className="card-filtering-item">
								Xcode 10 <IconTimes />
							</div>
							<div className="card-filtering-item">
								Vapor 3 <IconTimes />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

CardTags.contextTypes = {
	connector: PropTypes.object,
	token: PropTypes.string
};
