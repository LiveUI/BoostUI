import { Model } from "./Model";
import { User } from "./User";

export class Token implements Model {
	public id?: string;
	public expires?: number;
	public user?: User;
	public jwt?: string;
}
