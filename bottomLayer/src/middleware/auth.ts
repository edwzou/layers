import { type Request, type Response } from 'express';

export function checkAuthenticated (req: Request, res: Response, next: any): any {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}
