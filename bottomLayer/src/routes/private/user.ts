import express from 'express';
import { sql } from '../../utils/sqlImport';
const router = express.Router();
const { requiresAuth } = require('express-openid-connect');

// Endpoint for creating a specific user
router.post('/', requiresAuth(), (req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      email,
      password,
      profile_picture,
      following,
      followers,
      privateOption
    } = req.body;

    const insertUser = async (): Promise<void> => {
      await sql`
                INSERT INTO backend_schema.user (
                    first_name,
                    last_name,
                    email,
                    username,
                    password,
                    private,
                    followers,
                    following,
                    profile_picture
                ) VALUES (
                    ${first_name},
                    ${last_name},
                    ${email},
                    ${username},
                    ${password},
                    ${privateOption},
                    ${followers},
                    ${following},
                    ${profile_picture}
                )
            `;
    };
    void insertUser();

    res.status(200).json({ message: 'User created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error FU' });
  }
});

// Endpoint for deleting a specific user
router.delete('/:userId', requiresAuth(), (req, res): void => {
  try {
    const { userId } = req.params;

    const deleteUser = async (): Promise<void> => {
      await sql`DELETE FROM backend_schema.user WHERE uid = ${userId}`;
    };

    void deleteUser();

    res.status(200).json({ message: 'User deleted successfully', userId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoints for updating a specific user
router.put('/:userId', requiresAuth(), (req, res): void => {
  try {
    const { userId } = req.params;
    const {
      username,
      first_name,
      last_name,
      email,
      password,
      profile_picture,
      following,
      followers
    } = req.body;
    const updateUser = async (): Promise<void> => {
      await sql`UPDATE backend_schema.user
                           SET first_name = ${first_name},
                               last_name = ${last_name},
                               username = ${username},
                               email = ${email},
                               password = ${password},
                               followers = ${followers},
                               following = ${following},
                               profile_picture = ${profile_picture}
                           WHERE uid = ${userId}`;
    };

    void updateUser();
    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
