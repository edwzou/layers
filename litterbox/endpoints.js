const express = require('express');
const router = express.Router();
const neon = require('@cityofzion/neon-js');

//Create a Neon database connection
const config = {
    name: 'your_database_name',
    user: 'your_username',
    password: 'your_password',
    address: 'your_neon_database_address',
    port: 'your_neon_database_port',
};
const conn = new neon.database.Connection(config);

//Endpoint for creating a new user
router.post('/users', async (req, res) => {
    try {
        const { uid, first_name, last_name, user_name, email, password, profile_picture, followings, followers } = req.body;
        const query = `INSERT INTO users (uid, first_name, last_name, user_name, email, password, profile_picture, followings, followers)
                       VALUES ('${uid}', '${first_name}', '${last_name}', '${user_name}', '${email}', '${password}', 
                               '${profile_picture}', '${JSON.stringify(followings)}', '${JSON.stringify(followers)}')`;
        await conn.query(query);
        res.json({ message: 'User created' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for deleting a specific user
router.delete('/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const query = `DELETE FROM user WHERE uid = '${userId}'`;
        const result = await conn.query(query);
        const deleteRowCount = result.affectedRows;

        if (deleteRowCount > 0) {
            res.json({ message: 'User deleted' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoints for updating a specific user
router.put('/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { uid, first_name, last_name, user_name, email, password, profile_picture, followings, followers } = req.body;
        const query = `UPDATE users
                       SET uid = '${uid}',
                           first_name = '${first_name}',
                           last_name = '${last_name}',
                           user_name = '${user_name}',
                           email = '${email}',
                           password = '${password}',
                           profile_picture = '${profile_picture}',
                           followings = '${JSON.stringify(followings)}',
                           followers = '${JSON.stringify(followers)}'
                       WHERE uid = '${userId}'`;
        const result = await conn.query(query);
        const updatedRowCount = result.affectedRows;

        if (updatedRowCount > 0) {
            res.json({ message: 'User updated' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for retrieving a specific user
router.get('/users/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const query = `SELECT * FROM users WHERE uid = '${userId}'`;
        const result = await conn.query(query);
        const post = result[0];

        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;