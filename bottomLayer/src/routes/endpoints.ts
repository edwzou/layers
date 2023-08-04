const express = require('express');
const routerBase = express.Router();
const routerPublic = express.Router();
const routerPrivate = express.Router();

// const getPgVersion = async (): Promise<any> => {
//   const result = await sql`select version()`;
//   console.log(result);
//   return result;
// };

// void getPgVersion();
const jwtCheck = require('../middleware/auth.ts');

const userRoute = require('../routes/public/user.ts');
const followUserRoute = require('../routes/public/followUser.ts');
const outfitRoute = require('../routes/public/outfit.ts');
const clothingRoute = require('../routes/public/clothingItem.ts');
const searchRoute = require('../routes/public/search.ts');

const privateUserRoute = require('../routes/private/user.ts');
const privateFollowUserRoute = require('../routes/private/followUser.ts');
const privateOutfitRoute = require('../routes/private/outfit.ts');
const privateClothingRoute = require('../routes/private/clothingItem.ts');
const privateSearchRoute = require('../routes/private/search.ts');

routerPublic.use('/users', userRoute, followUserRoute);
routerPublic.use('/outfits', outfitRoute);
routerPublic.use('/clothing_items', clothingRoute);
routerPublic.use('/search', searchRoute);

routerPrivate.use('/users', privateUserRoute, privateFollowUserRoute);
routerPrivate.use('/outfits', privateOutfitRoute);
routerPrivate.use('/clothing_items', privateClothingRoute);
routerPrivate.use('/search', privateSearchRoute);
routerPrivate.use(jwtCheck);

// Endpoint for authenticating and logging in a user
routerBase.post('/auth/login', async (req: any, res: any) => {
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
routerPrivate.post('/auth/logout', async (req: any, res: any) => {
  try {
    // Perform logout logic

    res.json({ message: 'User logged out' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { routerBase, routerPublic, routerPrivate };
