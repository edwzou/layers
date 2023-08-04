const { auth } = require('express-oauth2-jwt-bearer');
require('dotenv').config();

const jwtCheck = auth({
  audience: process.env.AUTH0_API_BASE_URL,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256'
});

module.exports = jwtCheck;
