import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router";
import { BrowserRouter, NavLink } from "react-router-dom";
import "./app.sass";
import "./parts/switch.sass";
import Header from "./components/header";
import { Boost } from "./connector/Boost.ts";
import { Config } from "./connector/Config.ts";

import IconRekola from "./apiData/rekola.jpg";
import IconTimes from "./shapes/times";

// parts for router
import Login from "./parts/login";
import Register from "./parts/register";
import Overview from "./parts/overview";
import AppBuilds from "./parts/appBuilds";
import AppDetail from "./parts/appDetail";
import Team from "./parts/team";
import TeamItem from "./components/teamItem";
import Account from "./parts/account";
import Api from "./parts/api";

class App extends Component {
	constructor() {
		super();

		this.state = {
			token: localStorage.getItem("token"),
			loggedIn: true,
			route: window.location.pathname,
			menuIsVisible: false,
			icons: {},
			name: "Boost",
			teamName: null,
			switchIsVisible: false,
			filteringIsVisible: false,
			teams: [],
			team: ""
		};

		this.config = new Config();
		this.config.onLoggedOut = this.onLoggedOut;

		this.connector = new Boost(this.config, this.state.token);

		this.changeRoute = this.changeRoute.bind(this);
		this.setToken = this.setToken.bind(this);
		this.toggleMenu = this.toggleMenu.bind(this);
		this.hideMenu = this.hideMenu.bind(this);
		this.toggleSwitch = this.toggleSwitch.bind(this);
		this.selectTeam = this.selectTeam.bind(this);
	}

	logout = () => {
		this.setToken("");
		window.location.href = '/login'
	};

	onLoggedOut = () => {
		this.setToken("");
		window.location.href = '/login'
	};

	componentDidMount() {
		this.connector
			.server()
			.then(result => {
				if (typeof result.error !== "undefined") {
					throw new Error();
				}
				document.title = result.name;
				let icons = {};
				const head = document.querySelector("head");
				result.icons.forEach(item => {
					icons[item.size] = item.url;
					let link = document.createElement("link");
					link.rel = "icon";
					link.href = item.url;
					link.size = `${item.size}x${item.size}`;
					link.type = "image/png";
					head.appendChild(link);
					// <link rel="icon" href="/favicon.ico?v=2" type="image/x-icon" />
				});
				this.setState({
					name: result.name,
					icons: icons
				});
				if (this.state.token !== "") {
					this.connector
						.teams()
						.then(result => {
							console.log(result);
							this.setState({
								teams: result,
								team: result[0].id,
								teamName: result[0].name
							});
							document.title = this.state.name + " – " + this.state.teamName;
						})
						.catch(error => {
							console.error(error);
						});
				}
			})
			.catch(error => {
				console.error(error);
			});
	}

	changeRoute() {
		this.setState({
			route: window.location.pathname
		});
		console.log(this.state.route);
	}

	setToken(token) {
		localStorage.setItem("token", token);
		this.setState({
			token: token
		});
	}

	getChildContext() {
		return {
			config: this.config,
			connector: this.connector,
			token: this.state.token || "",
			setToken: this.setToken || function() {},
			name: this.state.name,
			icons: this.state.icons,
			team: this.state.team
		};
	}

	hideMenu() {
		if (this.state.menuIsVisible !== false) {
			this.setState({
				menuIsVisible: false
			});
		}
	}

	toggleMenu() {
		this.setState({
			menuIsVisible: !this.state.menuIsVisible
		});
	}

	toggleSwitch() {
		this.setState({
			switchIsVisible: !this.state.switchIsVisible
		});
	}

	toggleFiltering = () => {
		this.setState({
			filteringIsVisible: !this.state.filteringIsVisible
		});
	};

	selectTeam(id, name) {
		this.setState({
			team: id,
			teamName: name,
			switchIsVisible: false,
			menuIsVisible: false
		});
		document.title = this.state.name + " – " + this.state.teamName;
	}

	render() {
		return (
			<BrowserRouter onChange={this.changeRoute}>
				<div
					className={
						"outer" +
						(this.state.menuIsVisible ? " is-menu" : "") +
						(this.state.filteringIsVisible ? " has-filtering" : "")
					}
				>
					<div className="menu">
						<div className="menu-user">
							<div className="menu-user-icon">
								<img
									alt="Ondřej Rafaj"
									src="data:image/png;base64,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"
								/>
							</div>
							<div className="menu-user-name">Ondřej Rafaj</div>
						</div>
						<ul className="menu-links">
							<li className="menu-link" onClick={this.toggleMenu}>
								<NavLink
									exact
									activeClassName="is-active"
									className="menu-link-href"
									to={"/"}
								>
									Apps
								</NavLink>
							</li>
							<li className="menu-link" onClick={this.toggleMenu}>
								<NavLink
									exact
									activeClassName="is-active"
									className="menu-link-href"
									to={"/account"}
								>
									My account
								</NavLink>
							</li>
							<li className="menu-link" onClick={this.toggleMenu}>
								<NavLink
									exact
									activeClassName="is-active"
									className="menu-link-href"
									to={"/api-keys"}
								>
									API keys
								</NavLink>
							</li>
							<li className="menu-link" onClick={this.toggleMenu}>
								<NavLink
									exact
									activeClassName="is-active"
									className="menu-link-href"
									to={"/team"}
								>
									Team
								</NavLink>
							</li>
						</ul>
						<div className="menu-switch">
							<span onClick={this.toggleSwitch}>Switch team</span>
							<br />
							<span onClick={this.logout}>Logout</span>
						</div>
					</div>
					<div onClick={this.hideMenu} className="inner">
						<Switch>
							<Route path="/login" exact component={null} />
							<Route path="/register" exact component={null} />
							<Route
								path="/"
								render={props => (
									<Header
										{...props}
										icon={this.state.icons}
										isMoved={this.state.menuIsVisible}
										filteringIsVisible={this.state.filteringIsVisible}
										toggleFiltering={this.toggleFiltering}
										toggleMenu={this.toggleMenu}
									/>
								)}
							/>
						</Switch>
						<div className="app">
							<Route
								path="/login"
								render={props => <Login {...props} icon={this.state.icons} />}
								onEnter={this.changeRoute}
							/>
							<Route
								path="/register"
								render={props => (
									<Register {...props} icon={this.state.icons} />
								)}
								onEnter={this.changeRoute}
							/>
							<Route
								exact
								path="/team"
								component={Team}
								onEnter={this.changeRoute}
							/>
							<Route
								exact
								path="/account"
								component={Account}
								onEnter={this.changeRoute}
							/>
							<Route
								exact
								path="/api-keys"
								component={Api}
								onEnter={this.changeRoute}
							/>
							<Route
								exact
								path="/"
								component={Overview}
								onEnter={this.changeRoute}
							/>
							<Route
								exact
								path="/app/:appId/:platform/build/:buildId"
								component={AppDetail}
								onEnter={this.changeRoute}
							/>
							<Route
								exact
								path="/app/:appId/:platform"
								component={AppBuilds}
								onEnter={this.changeRoute}
							/>
						</div>
					</div>
					{this.state.switchIsVisible ? (
						<div className="switch">
							<div className="switch-close" onClick={this.toggleSwitch} />
							<div className="switch-inner">
								<div className="switch-header">
									<div
										className="switch-header-close"
										onClick={this.toggleSwitch}
									>
										<IconTimes />
									</div>
									<div className="switch-header-title">Switch team</div>
								</div>
								{this.state.teams.map(item => (
									<TeamItem
										key={item.id}
										id={item.id}
										active={this.state.team === item.id ? true : false}
										select={this.selectTeam}
										icon={IconRekola}
										name={item.name}
									/>
								))}
								<div className="switch-footer">
									<div className="switch-footer-button">+ Add new team</div>
								</div>
							</div>
						</div>
					) : null}
				</div>
			</BrowserRouter>
		);
	}
}

App.childContextTypes = {
	config: PropTypes.object,
	connector: PropTypes.object,
	token: PropTypes.string,
	setToken: PropTypes.func,
	name: PropTypes.string,
	icons: PropTypes.object,
	team: PropTypes.string
};

export default App;
