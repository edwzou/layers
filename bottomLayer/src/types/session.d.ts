import { type Session } from 'express-session';

export interface ISession extends Session {
	user?: Record<string, any>;
}
