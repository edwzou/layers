import express from 'express';
import { type Request, type Response, type NextFunction } from 'express';
import passport from 'passport';
import { pool } from '../utils/sqlImport';
import { hash } from 'bcrypt';

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
  (req: Request, res: Response) => {
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

    const signup = async (): Promise<void> => {
      try {
        // Can optimize the following awaits to call run them at the same time
        const hashedPass = await hash(password, 10);
        const URL = await convertImage(profile_picture, username, false);
        await pool.query(
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
            followers,
            following,
            URL
          ]
        );
        responseCallbackSignUp(null, res);
      } catch (error) {
        responseCallbackSignUp(error, res);
      }
    };
    void signup();
  },
  passport.authenticate('login', {
    failureMessage: true,
    successRedirect: '/api/private/users'
  })
);

router.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  req.logOut((err: Error) => {
    if (err !== null && err !== undefined) {
      next(err);
    } else {
      res.send('Logged Out');
    }
  });
});

export { router as default, router as authRoute };
