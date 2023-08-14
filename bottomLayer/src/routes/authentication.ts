import express from 'express';
import { type Request, type Response } from 'express';
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/login', (req: Request, res: Response) => {
  // @ts-expect-error need to find type for this
  res.send(req.oidc.isAuthenticated() as boolean ? req.oidc.accessToken : 'Logged out');
});

router.post('/logout', requiresAuth(), (req: Request, res: Response) => {

});

module.exports = router;
