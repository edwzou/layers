import { sql } from '../utils/sql-import';

const express = require('express');
const router = express.Router();
// const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');

const getPgVersion = async (): Promise<any> => {
  const result = await sql`select version()`;
  console.log(result);
  return result;
};

void getPgVersion();

const userRoute = require('../routes/user.ts');
const followUserRoute = require('../routes/followUser.ts');
const outfitRoute = require('../routes/outfit.ts');
const clothingRoute = require('../routes/clothingItem.ts');
const searchRoute = require('../routes/search.ts');

router.use('/users', userRoute, followUserRoute);
router.use('/outfits', outfitRoute);
router.use('/clothing_items', clothingRoute);
router.use('/search', searchRoute);

// Endpoint for authenticating and logging in a user
router.post('/auth/login', async (req: any, res: any) => {
  try {
    const { username, password } = req.body;
    // Perform authentication logic
    // Call Auth0
    // Send request to Auth0 with the username and password
    res.json({ message: 'User authenticated and logged in' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for logging out the currently authenticated user
router.post('/auth/logout', async (req: any, res: any) => {
  try {
    // Perform logout logic

    res.json({ message: 'User logged out' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
