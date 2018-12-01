import { Model } from "./Model";

export class User implements Model {
	public id?: string;
	public firstname?: string;
	public lastname?: string;
	public email?: string;
	public registered?: Date;
	public disabled?: boolean;
	public su?: boolean;
}
