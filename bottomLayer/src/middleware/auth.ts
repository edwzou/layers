const { auth } = require('express-openid-connect');
require('dotenv').config();

const config: any = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_CLIENT_SECRET,
  baseURL: 'http://localhost:1234',
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

module.exports = { auth: auth(config) };
