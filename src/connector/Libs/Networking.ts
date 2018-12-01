import { Config } from "../Config";

export interface Networkable {}

export class Networking implements Networkable {
	public config: Config;

	public jwt: string | null = null;

	// Initialization

	public constructor(public conf: Config) {
		this.config = conf;
	}

	// Requests

	public get = (
		path: string,
		headers: Headers = new Headers()
	): Promise<Response> => {
		console.log(path);
		path = this.config.url + path;
		const promise = window.fetch(path, {
			headers: this.headers(headers),
			method: "GET",
			redirect: "follow"
		});
		promise.then(response => {
			if (response.status === 401) {
				this.config.onLoggedOut();
			}
		});
		return promise;
	};

	public postJson = (
		path: string,
		json: object,
		headers: Headers = new Headers()
	): Promise<Response> => {
		console.log(path);
		path = this.config.url + path;
		const promise = window.fetch(path, {
			body: JSON.stringify(json),
			headers: this.headers(headers),
			method: "POST"
		});
		/*promise.then((response) => {
			if (response.status === 401) {
				this.config.onLoggedOut()
			}
		})*/
		return promise;
	};

	public postData = (
		path: string,
		data: string,
		headers: Headers = new Headers()
	): Promise<Response> => {
		console.log(path);
		path = this.config.url + path;
		const promise = window.fetch(path, {
			body: data,
			headers: this.headers(headers),
			method: "POST"
		});
		promise.then(response => {
			if (response.status === 401) {
				this.config.onLoggedOut();
			}
		});
		return promise;
	};

	public put = (
		path: string,
		json: JSON,
		headers: Headers = new Headers()
	): Promise<Response> => {
		console.log(path);
		path = this.config.url + path;
		const promise = window.fetch(path, {
			body: JSON.stringify(json),
			headers: this.headers(headers),
			method: "PUT"
		});
		promise.then(response => {
			if (response.status === 401) {
				this.config.onLoggedOut();
			}
		});
		return promise;
	};

	public patch = (
		path: string,
		json: JSON,
		headers: Headers = new Headers()
	): Promise<Response> => {
		console.log(path);
		path = this.config.url + path;
		const promise = window.fetch(path, {
			body: JSON.stringify(json),
			headers: this.headers(headers),
			method: "PATCH"
		});
		promise.then(response => {
			if (response.status === 401) {
				this.config.onLoggedOut();
			}
		});
		return promise;
	};

	public delete = (
		path: string,
		headers: Headers = new Headers()
	): Promise<Response> => {
		path = this.config.url + path;
		const promise = new Promise<Response>((resolve, reject) => {
			return window.fetch(path, {
				headers: this.headers(headers),
				method: "DELETE",
				mode: "cors"
			});
		});
		promise.then(response => {
			if (response.status === 401) {
				this.config.onLoggedOut();
			}
		});
		return promise;
	};

	// Private interface

	private headers = (headers: Headers): Headers => {
		headers = this.appendHeader(headers, "Content-Type", "application/json");
		if (this.jwt) {
			headers = this.appendHeader(headers, "Authorization", this.jwt);
		}
		headers = this.appendHeader(headers, "User-Agent", "BoostSDK/1.0-JS");
		return headers;
	};

	private appendHeader = (
		headers: Headers,
		header: string,
		value: string
	): Headers => {
		if (!headers.has(header)) {
			headers.append(header, value);
		}
		return headers;
	};
}
