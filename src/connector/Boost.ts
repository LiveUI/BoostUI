import { Config } from "./Config";
import { Networking } from "./Libs/Networking";
import { Auth } from "./Model/Auth";
import { Team } from "./Model/Team";
import { Token } from "./Model/Token";
import { User } from "./Model/User";

export class Boost {
	private networking: Networking;

	private credentials?: { email: string; password: string } = undefined;

	// Initialization

	public constructor(public config: Config, public jwt: string = "") {
		this.networking = new Networking(config);
		if (jwt !== "") {
			this.networking.jwt = jwt;
		}

		setInterval(this.refreshAuth, 60000);
	}

	// Requests

	public auth = (email: string, password: string): Promise<Auth> => {
		const object = {
			email,
			password
		};
		const promise = this.networking.postJson("/auth", object);
		return promise
			.then(res => {
				const jwt = res.headers.get("authorization");
				if (jwt) {
					this.networking.jwt = jwt;
					return res.json().then(json => {
						this.credentials = {
							email,
							password
						};
						return {
							json,
							jwt
						};
					});
				} else {
					throw TypeError("Missing JWT token");
				}
			})
			.then(data => {
				const obj = Object.assign(new Auth(), data.json);
				obj.jwt = data.jwt;
				return obj;
			});
	};

	public refreshAuth = () => {
		if (this.credentials) {
			this.auth(this.credentials.email, this.credentials.password);
		}
	};

	public token = (token: string): Promise<Token> => {
		const object = {
			token
		};
		const promise = this.networking.postJson("/token", object);
		return promise
			.then(res => {
				const jwt = res.headers.get("authorization");
				if (jwt) {
					this.networking.jwt = jwt;
					return res.json().then(json => {
						return {
							json,
							jwt
						};
					});
				} else {
					throw TypeError("Missing JWT token");
				}
			})
			.then(data => {
				const obj = Object.assign(new Token(), data.json);
				obj.jwt = data.jwt;
				return obj;
			});
	};

	public teams = (): Promise<[Team]> => {
		const promise = this.networking.get("/teams");
		return promise
			.then(res => res.json())
			.then(json => {
				return json.map((x: JSON) => Object.assign(new Team(), x));
			});
	};

	public createTeam = (data: object): Promise<Response> => {
		const promise = this.networking.postJson("/teams", data);
		return promise
			.then(res => res.json())
			.then(json => {
				return json;
			});
	};

	public ping = (): Promise<Response> => {
		return this.networking.get("/ping");
	};

	public overview = (
		limit: number = 10,
		from: number = 1
	): Promise<Response> => {
		const promise = this.networking.get(
			"/apps/overview?limit=" + limit + "&from=" + from
		);
		return promise
			.then(res => res.json())
			.then(json => {
				return json;
			});
	};

	public server = (): Promise<Response> => {
		const promise = this.networking.get("/info");
		return promise
			.then(res => res.json())
			.then(json => {
				return json;
			});
	};

	public apps = (
		platform: string,
		identifier: string,
		limit: number = 20
	): Promise<Response> => {
		const promise = this.networking.get(
			`/apps?platform=${encodeURIComponent(
				platform
			)}&identifier=${encodeURIComponent(identifier)}&limit=${limit}`
		);
		return promise
			.then(res => res.json())
			.then(json => {
				return json;
			});
	};

	public deleteApps = (id: string): Promise<Response> => {
		const promise = this.networking.delete("/apps/" + id);
		return promise
			.then(res => res.json())
			.then(json => {
				return json;
			});
	};

	public build = (id: string): Promise<Response> => {
		const promise = this.networking.get(`/apps/${encodeURIComponent(id)}`);
		return promise
			.then(res => res.json())
			.then(json => {
				return json;
			});
	};

	public upload = (data: any): Promise<Response> => {
		const promise = this.networking.postData(
			"/teams/6F0052B1-6A9D-46BB-80A7-077A976C4640/apps",
			data
		);
		return promise
			.then(res => res.json())
			.then(json => {
				return json;
			});
	};

	public users = (query: string): Promise<Response> => {
		const promise = this.networking.get(
			`/users/global?search=${encodeURIComponent(query)}`
		);
		return promise
			.then(res => res.json())
			.then(json => {
				return json.map((x: JSON) => Object.assign(new User(), x));
			});
	};

	public teamUsers = (team: string): Promise<Response> => {
		const promise = this.networking.get(
			`/teams/${encodeURIComponent(team)}/users`
		);
		return promise
			.then(res => res.json())
			.then(json => {
				return json.map((x: JSON) => Object.assign(new User(), x));
			});
	};

	public download = (id: string): Promise<Response> => {
		const promise = this.networking.get("/apps/" + id + "/auth");
		return promise
			.then(res => res.json())
			.then(json => {
				return json;
			});
	};

	public apiKeys = (): Promise<Response> => {
		const promise = this.networking.get("/keys");
		return promise
			.then(res => res.json())
			.then(json => {
				return json;
			});
	};

	public deleteApiKey = (id: string): Promise<Response> => {
		return this.networking.delete(`/keys/${id}`);
	};

	public register = (data: any): Promise<Response> => {
		const promise = this.networking.postJson("/users", data);
		return promise
			.then(res => res.json())
			.then(json => {
				return json;
			});
	};

	/*public start = () => {
		this.auth('admin@liveui.io', 'admin')
			.then((auth) => {
				return this.token(auth.token)
			})
			.then((token) => {
				return this.users()
					.then((users) => {
						return this.teams().then((teams) => {
							console.log(teams)
						})
					})
					.catch((err) => console.error(err))
			})
			.catch((err) => console.error(err))

		// this.ping().then(res => alert(res)).catch(err => alert(err));
	}*/
}
