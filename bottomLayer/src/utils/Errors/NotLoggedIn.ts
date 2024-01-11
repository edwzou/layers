export class NotLoggedIn extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'User Not Authenticated or Logged In';
	}
}
