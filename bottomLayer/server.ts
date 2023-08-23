import { routerBase, routerPublic, routerPrivate } from './src/routes/endpoints';
import { pool } from './src/utils/sqlImport';
import session from 'express-session';
import passport from 'passport';

const express = require('express');
const app = express();

const bcrypt = require('bcrypt');

const { v4: uuidv4 } = require('uuid'); ;
const LocalStrategy = require('passport-local').Strategy;
const FileStore = require('session-file-store')(session);
require('dotenv').config();

app.use(express.json());
app.use(session({
  genid: (req: any) => {
    return uuidv4();
  },
  store: new FileStore(), // !!! send this to database for production
  secret: 'layers private secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.use('login', new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
  async (email: string, password: string, done: any) => {
    try {
      const result = await pool.query('SELECT * FROM backend_schema.user WHERE email = $1', [email]);

      if (result.rowCount === 0) {
        return done(null, false, { message: 'user not found' });
      }

      const hashedPassword = result.rows[0].password;
      const passwordMatches: boolean = await bcrypt.compare(password, hashedPassword);

      if (!passwordMatches) {
        console.log('Invalid Credentials');
        return done(null, false, { message: 'invalid credentials' });
      }

      const user = result.rows[0].uid;
      console.log(user);
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

app.use('/', routerBase);
app.use('/api', routerPublic);
app.use('/api/private', routerPrivate);

app.listen(process.env.PORT, () => {
  if (process.env.PORT == null) {
    return null;
  }

  console.log(`Server is running on port ${process.env.PORT}`);
});
