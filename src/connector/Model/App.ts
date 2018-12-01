import { Model } from "./Model";

export class App implements Model {
	public build?: string;
	public basic?: boolean;
	public id?: number;
	public platform?: number;
	public team_id?: number;
	public version?: string;
	public identifier?: string;
	public created?: number;
	public name?: string;
	public modified?: number;
}
