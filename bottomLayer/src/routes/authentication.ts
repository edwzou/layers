import express from 'express';
import { type Request, type Response, type NextFunction } from 'express';
import passport from 'passport';
import { pool } from '../utils/sqlImport';

import { convertImage } from '../s3/convert-image';
import {
  responseCallbackSignUp,
  responseCallbackLogin
} from '../utils/responseCallback';
import { hash, compare } from 'bcrypt';
import { type IVerifyOptions, Strategy as LocalStrategy } from 'passport-local';
import { NotFoundError } from '../utils/Errors/NotFoundError';
import { InvalidCredentialsError } from '../utils/Errors/InvalidCredentials';
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
  (req: Request, res: Response, next: NextFunction) => {
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
        next();
      } catch (error) {
        responseCallbackSignUp(error, res);
      }
    };
    void signup();
  },
  // Can optimize this as it currently call 2 queries to complete
  // Signup -> Login
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

export const login = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (
    req: Request,
    email: string,
    password: string,
    done: (
      error: any,
      user?: Express.User | false,
      options?: IVerifyOptions
    ) => void
  ) => {
    const res = req.res;
    const login = async (): Promise<void> => {
      try {
        const result = await pool.query(
          'SELECT * FROM backend_schema.user WHERE email = $1',
          [email]
        );

        if (result.rowCount === 0) {
          throw new NotFoundError('User Not Found, email: ' + email);
        }

        const hashedPassword = result.rows[0].password;
        const passwordMatches: boolean = await compare(
          password,
          hashedPassword
        );

        if (!passwordMatches) {
          throw new InvalidCredentialsError(
            'Invalid Credential, Fault: Password'
          );
        }

        if (res !== undefined) {
          responseCallbackLogin(null, email, res);
        } else {
          console.log('res is undefined');
          done(null, email);
        }
      } catch (err) {
        if (res !== undefined) {
          responseCallbackLogin(err, '', res);
        } else {
          console.log('res is undefined');
          done(err);
        }
      }
    };
    void login();
  }
);

export { router as default, router as authRoute };
