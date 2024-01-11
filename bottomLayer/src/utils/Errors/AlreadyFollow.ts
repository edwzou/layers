export class AlreadyFollowError extends Error {
	constructor(message: string) {
		super(message);
		this.name = 'AlreadyFollow';
	}
}
