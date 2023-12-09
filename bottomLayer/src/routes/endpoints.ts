import express from 'express';
import authRoute from '../routes/authentication';
import outfitRoute from '../routes/public/outfit';
import clothingRoute from '../routes/public/clothingItem';
import searchRoute from '../routes/public/search';
import usersRoute from '../routes/public/user';
import privateUserRoute from '../routes/private/user';
import privateOutfitRoute from '../routes/private/outfit';
import privateClothingRoute from '../routes/private/clothingItem';
import privateFollowUserRoute from '../routes/private/followUser';
import privateSearchRoute from '../routes/private/search';
import { devUserRoute } from './dev/user';
import { checkAuthenticated } from '../middleware/auth';
const routerBase = express.Router();
const routerPublic = express.Router();
const routerPrivate = express.Router();

const routerDev = express.Router();

routerBase.use('/', authRoute);

routerPublic.use('/outfits', outfitRoute);
routerPublic.use('/clothing_items', clothingRoute);
routerPublic.use('/search', searchRoute);
routerPublic.use('/users', usersRoute);

routerPrivate.use(checkAuthenticated);
routerPrivate.use('/users', privateUserRoute, privateFollowUserRoute);
routerPrivate.use('/outfits', privateOutfitRoute);
routerPrivate.use('/clothing_items', privateClothingRoute);
routerPrivate.use('/search', privateSearchRoute);

routerDev.use('/users', devUserRoute);

export { routerBase, routerPublic, routerPrivate, routerDev };
