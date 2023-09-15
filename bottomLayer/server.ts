import {
  routerBase,
  routerPublic,
  routerPrivate
} from './src/routes/endpoints';
import { pool } from './src/utils/sqlImport';
import session from 'express-session';
import passport from 'passport';
import express from 'express';
import { type Request } from 'express';
import { compare } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { type IVerifyOptions, Strategy } from 'passport-local';
import ConnectFileStore from 'session-file-store';
import { responseCallbackLogin } from './src/utils/responseCallback';
import { NotFoundError } from './src/utils/Errors/NotFoundError';
import { InvalidCredentialsError } from './src/utils/Errors/InvalidCredentials';

const app = express();

const LocalStrategy = Strategy;
const FileStore = ConnectFileStore(session);
require('dotenv').config();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));

app.use(
  session({
    genid: () => {
      return uuidv4();
    },
    store: new FileStore(), // !!! send this to database for production
    secret: process.env.SESSION_SECRET ?? 'layersSession',
    resave: false,
    cookie: {
      maxAge: Date.now() + 30 * 86400 * 1000, // Sessions last a month from login
      secure: false // !!! Make this true by once we add HTTPS
    },
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.use(
  'login',
  new LocalStrategy(
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
  )
);

app.use('/', routerBase);
app.use('/api', routerPublic);
app.use('/api/private', routerPrivate);

app.listen(process.env.PORT, () => {
  if (process.env.PORT == null) {
    return null;
  }

  console.log(`Server is running on port ${process.env.PORT}`);
});
