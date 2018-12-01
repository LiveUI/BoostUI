import React, { Component } from "react";
import "../components/card.sass";
import Datalist from "react-datalist";
import "../components/textInput.sass";
import "../components/notice.sass";

import TeamMember from "../components/teamMember";
import Button from "../components/button";
import PropTypes from "prop-types";
import IconInfo from "../shapes/info";

export default class Team extends Component {
	state = {
		searchMembers: [],
		users: []
	};

	componentDidMount() {
		this.context.connector
			.teamUsers("3F2A7D0D-5FD7-4DF8-95E7-EB36B2A06EFB")
			.then(result => {
				this.setState({
					users: result
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	handleChange = e => {
		e.preventDefault();
		if (e.target.value === "") {
			this.setState({
				searchMembers: []
			});
		} else {
			this.context.connector
				.users(e.target.value)
				.then(result => {
					this.setState({
						searchMembers: result.map(item => item.username)
					});
				})
				.catch(error => {
					console.error(error);
				});
		}
	};

	render() {
		return (
			<div className="page">
				<div className="card">
					<div className="card-content">
						<div className="card-content-members">
							{this.state.users.map(item => (
								<TeamMember
									key={item.id}
									id={item.id}
									firstname={item.firstname}
									lastname={item.lastname}
									username={item.username}
									email={item.email}
								/>
							))}
						</div>
					</div>
					<div className="card-footer">
						<div className="card-footer-heading">
							Invite new members to the team:
						</div>
						<div className="card-footer-description">
							Lobortis id lorem id bibendum. Ut id consectetur magna. Quisque
							volutpat augue enim, pulvinar lobortis nibh lacinia at.
						</div>
						<form className="card-footer-form">
							<Datalist
								onInputChange={this.handleChange}
								placeholder="E-mail or username"
								className="textInput"
								list="email"
								options={this.state.searchMembers}
							/>
							<Button>Send invite</Button>
						</form>
					</div>
				</div>

				<div className="notice">
					<h2 className="notice-title">
						<IconInfo /> Want to delete team?
					</h2>
					<p className="notice-content">
						Curabitur lobortis id lorem id bibendum. Ut id consectetur magna.
						Quisque volutpat augue enim, pulvinar lobortis nibh lacinia at.
						Vestibulum nec erat ut mi sollicitudin porttitor id sit amet risus.
						Nam tempus vel odio vitae aliquam. In imperdiet eros id lacus
						vestibulum vestibulum.
					</p>
				</div>
			</div>
		);
	}
}

Team.contextTypes = {
	connector: PropTypes.object,
	team: PropTypes.string
};
