import { Model } from "./Model";
import { User } from "./User";

export class Auth implements Model {
	public id?: string;
	public expires?: number;
	public token?: string;
	public user?: User;
	public jwt?: string;
}
