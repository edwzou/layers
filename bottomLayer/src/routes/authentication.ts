import express from 'express';
import { type Request, type Response } from 'express';
import passport from 'passport';
import { pool } from '../utils/sqlImport';
import { upload } from '../utils/multer';
import { convertImage } from '../s3/convert-image';
const bcrypt = require('bcrypt');

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('login', {
    failureMessage: true,
    successRedirect: '/api/private/users'
  })
);

router.post(
  '/signup',
  upload.single('profile_picture'),
  (req: Request, res: Response, next: any) => {
    const {
      first_name,
      last_name,
      email,
      username,
      password,
      private_option,
      followers,
      following,
      profile_picture
    } = req.body;

    const createUser = async (): Promise<void> => {
      const hashedPass = await bcrypt.hash(password, 10);
      const URL = await convertImage(profile_picture, username, false);
      const user = await pool.query(
        `
  INSERT INTO backend_schema.user (
    first_name, last_name, email, username, password, private_option, followers, following, pp_url
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          first_name,
          last_name,
          email.toLowerCase(),
          username,
          hashedPass,
          private_option,
          JSON.parse(followers),
          JSON.parse(following),
          URL
        ]
      );

      if (user.rowCount > 0) {
        next();
      } else {
        res.status(500).send('User not created');
      }
    };

    void createUser();
  },
  passport.authenticate('login', {
    failureMessage: true,
    successRedirect: '/api/private/users'
  })
);

router.get('/logout', (req: Request, res: Response, next: any) => {
  req.logOut((err) => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (err) {
      return next(err);
    }
    res.send('Logged Out');
  });
});

export { router as default, router as authRoute };
