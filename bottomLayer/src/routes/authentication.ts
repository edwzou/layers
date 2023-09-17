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

const router = express.Router();

const loginStrate = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  (
    email: string,
    password: string,
    done: (
      error: any,
      user?: Express.User | false,
      options?: IVerifyOptions
    ) => void
  ) => {
    const login = async (): Promise<void> => {
      try {
        const result = await pool.query(
          'SELECT * FROM backend_schema.user WHERE email = $1',
          [email]
        );

        if (result.rowCount === 0) {
          done(null, false, { message: 'Invalid Credential, Fault: Email' });
          return;
        }

        const hashedPassword = result.rows[0].password;
        const passwordMatches: boolean = await compare(
          password,
          hashedPassword
        );

        if (!passwordMatches) {
          done(null, false, { message: 'Invalid Credential, Fault: Password' });
          return;
        }

        done(null, result.rows[0]);
      } catch (err) {
        console.log(err);
        done(err);
      }
    };
    void login();
  }
);

const signupStrate = new LocalStrategy(
  { passReqToCallback: true },
  (
    req: Request,
    user: string,
    pass: string,
    done: (
      error: any,
      user?: Express.User | false,
      options?: IVerifyOptions
    ) => void
  ) => {
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
        const emailLower = email.toLowerCase();
        const result = await pool.query(
          `
        INSERT INTO backend_schema.user (
          first_name, last_name, email, username, password, private_option, followers, following, pp_url
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9)
          RETURNING uid`,
          [
            first_name,
            last_name,
            emailLower,
            username,
            hashedPass,
            private_option,
            followers,
            following,
            URL
          ]
        );
        if (
          result.rowCount === 0 ||
          result.rows[0].uid === undefined ||
          result.rows[0].uid === null ||
          result.rows[0].uid === ''
        ) {
          done(null, false, {
            message: 'Unknown Failure, No Return From Query'
          });
          return;
        }

        const uid = result.rows[0].uid;
        const user = {
          uid: uid,
          first_name: first_name,
          last_name: last_name,
          email: emailLower,
          username: username,
          password: hashedPass,
          private_option: private_option,
          followers: followers,
          following: following,
          profile_picture: URL
        };

        done(null, user);
      } catch (err) {
        console.log(err);
        done(err);
      }
    };
    void signup();
  }
);

const login = (req: Request, res: Response, next: NextFunction): any => {
  passport.authenticate('login', (err: any, user: any, info: any) => {
    if (err !== null && err !== undefined) {
      return responseCallbackLogin(err, '', res);
    }
    if (info !== null && info !== undefined) {
      return responseCallbackLogin(null, '', res, info.message);
    }
    if (user === null && user === undefined) {
      return responseCallbackLogin(
        null,
        '',
        res,
        'Unknown User Error, User Not Defined'
      );
    }
    req.logIn(user, { session: true }, (err) => {
      if (err !== null && err !== undefined) {
        return responseCallbackLogin(err, '', res);
      }
      const userFields = (({
        uid,
        first_name,
        last_name,
        email,
        username
      }) => ({ uid, first_name, last_name, email, username }))(user);
      responseCallbackLogin(null, userFields, res);
      next();
    });
  })(req, res, next);
};

passport.use('login', loginStrate);
router.post('/login', login);

passport.use('signup', signupStrate);
router.post(
  '/signup',
  passport.authenticate('signup', {
    failureMessage: true,
    successRedirect: '/api/private/users'
  })
);

// router.post(
//   '/signup',
//   (req: Request, res: Response, next: NextFunction) => {
//     const {
//       first_name,
//       last_name,
//       email,
//       username,
//       password,
//       private_option,
//       followers,
//       following,
//       profile_picture
//     } = req.body;
//
//     const signup = async (): Promise<void> => {
//       try {
//         // Can optimize the following awaits to call run them at the same time
//         const hashedPass = await hash(password, 10);
//         const URL = await convertImage(profile_picture, username, false);
//         await pool.query(
//           `
//         INSERT INTO backend_schema.user (
//           first_name, last_name, email, username, password, private_option, followers, following, pp_url
//           ) VALUES (
//             $1, $2, $3, $4, $5, $6, $7, $8, $9)`,
//           [
//             first_name,
//             last_name,
//             email.toLowerCase(),
//             username,
//             hashedPass,
//             private_option,
//             followers,
//             following,
//             URL
//           ]
//         );
//         responseCallbackSignUp(null, res);
//         next();
//       } catch (error) {
//         responseCallbackSignUp(error, res);
//       }
//     };
//     void signup();
//   },
//   // Can optimize this as it currently call 2 queries to complete
//   // Signup -> Login
//   passport.authenticate('login', {
//     failureMessage: true,
//     successRedirect: '/api/private/users'
//   })
// );

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
