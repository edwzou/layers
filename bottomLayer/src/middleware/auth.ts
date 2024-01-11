import { type Request, type Response } from 'express';
import { NotLoggedIn } from '../utils/Errors/NotLoggedIn';
import { responseCallbackLogin } from '../utils/responseCallback';

export function checkAuthenticated(
	req: Request,
	res: Response,
	next: any
): any {
	if (req.isAuthenticated()) {
		return next();
	}
	try {
		throw new NotLoggedIn('User Not Authenticated or Logged In');
	} catch (err) {
		responseCallbackLogin(err, null, res);
	}
}
