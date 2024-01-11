import { type Request } from 'express';
import { type ISession } from '../types/session';

// Casting types doesn't work for declaring a req.session.user, this is a work around
export const getSession = (req: Request): ISession => {
	return req.session as ISession;
};
