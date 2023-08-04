import express from 'express';
import { type Request, type Response } from 'express';
import { type RequestContext } from 'express-openid-connect';
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

router.get('/login', (req: Request, res: Response) => {
  res.send((req.oidc).isAuthenticated() ? 'Logged in' : 'Logged out');
});

// !!! This is just here for testing, would probs be logout
router.get('/profile', requiresAuth(), (req: Request, res: Response) => {
  res.send(JSON.stringify(req.oidc.user));
});

module.exports = router;
