import {
  routerBase,
  routerPublic,
  routerPrivate
} from './src/routes/endpoints';
import { pool } from './src/utils/sqlImport';
import session from 'express-session';
import passport from 'passport';
import express from 'express';
import { compare } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Strategy } from 'passport-local';
import ConnectFileStore from 'session-file-store';

const app = express();

const LocalStrategy = Strategy;
const FileStore = ConnectFileStore(session);
const timeout = require('connect-timeout');
require('dotenv').config();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb' }));
app.use(timeout(300000));

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
    { usernameField: 'email', passwordField: 'password' },
    async (email: string, password: string, done: any) => {
      try {
        const result = await pool.query(
          'SELECT * FROM backend_schema.user WHERE email = $1',
          [email]
        );

        if (result.rowCount === 0) {
          return done(null, false, { message: 'user not found' });
        }

        const hashedPassword = result.rows[0].password;
        console.log(hashedPassword, password);
        const passwordMatches: boolean = await compare(
          password,
          hashedPassword
        );
        console.log('match' + passwordMatches);
        if (!passwordMatches) {
          console.log('Invalid Credentials');
          return done(null, false, { message: 'invalid credentials' });
        }
        console.log('before user');
        const user = result.rows[0].uid;
        console.log('after user: ' + user);
        return done(null, user);
      } catch (err) {
        return done(err);
      }
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
