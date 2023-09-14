import express from 'express';
import authRoute from '../routes/authentication';
import userRoute from '../routes/public/user';
import outfitRoute from '../routes/public/outfit';
import clothingRoute from '../routes/public/clothingItem';
import privateUserRoute from '../routes/private/user';
import privateOutfitRoute from '../routes/private/outfit';
import privateClothingRoute from '../routes/private/clothingItem';
import privateFollowUserRoute from '../routes/private/followUser';
import privateSearchRoute from '../routes/private/search';
const routerBase = express.Router();
const routerPublic = express.Router();
const routerPrivate = express.Router();

routerBase.use('/', authRoute);

routerPublic.use('/users', userRoute);
routerPublic.use('/outfits', outfitRoute);
routerPublic.use('/clothing_items', clothingRoute);

routerPrivate.use('/users', privateUserRoute, privateFollowUserRoute);
routerPrivate.use('/outfits', privateOutfitRoute);
routerPrivate.use('/clothing_items', privateClothingRoute);
routerPrivate.use('/search', privateSearchRoute);

export { routerBase, routerPublic, routerPrivate };
