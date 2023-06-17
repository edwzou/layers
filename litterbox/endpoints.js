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
        const query = `DELETE FROM users WHERE uid = '${userId}'`;
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
});

// Endpoint for creating a new comment
router.post('/comments', async (req, res) => {
    try {
        const { cid, uid, comment } = req.body;
        const query = `INSERT INTO comments (cid, uid, comment)
                       VALUES ('${cid}', '${uid}', '${comment}')`;
        await conn.query(query);
        res.json({ message: 'Comment created' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for deleting a specific comment
router.delete('/comments/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        const query = `DELETE FROM comments WHERE cid = '${commentId}'`;
        const result = await conn.query(query);
        const deleteRowCount = result.affectedRows;

        if (deleteRowCount > 0) {
            res.json({ message: 'Comment deleted' });
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for updating a specific comment
router.put('/comments/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        const { uid, comment } = req.body;
        const query = `UPDATE comments
                       SET uid = '${uid}',
                           comment = '${comment}'
                       WHERE cid = '${commentId}'`;
        const result = await conn.query(query);
        const updatedRowCount = result.affectedRows;

        if (updatedRowCount > 0) {
            res.json({ message: 'Comment updated' });
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for retrieving a specific comment
router.get('/comments/:commentId', async (req, res) => {
    try {
        const { commentId } = req.params;
        const query = `SELECT * FROM comments WHERE cid = '${commentId}'`;
        const result = await conn.query(query);
        const post = result[0];

        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for retrieving all comments
router.get('/comments/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const query = `SELECT * FROM comments WHERE uid = '${userId}'`;
        const result = await conn.query(query);
        const post = result[0];

        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: 'Comment not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for creating a new outfit
router.post('/outfits', async (req, res) => {
    try {
        const { oid, uid, image, clothing_item } = req.body;
        const query = `INSERT INTO outfits (oid, uid, image, clothing_item)
                       VALUES ('${oid}', '${uid}', '${image}', '${JSON.stringify(clothing_item)}')`;
        await conn.query(query);
        res.json({ message: 'Outfit created' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for deleting a specific outfit
router.delete('/outfits/:outfitId', async (req, res) => {
    try {
        const { outfitId } = req.params;
        const query = `DELETE FROM outfits WHERE oid = '${outfitId}'`;
        const result = await conn.query(query);
        const deleteRowCount = result.affectedRows;

        if (deleteRowCount > 0) {
            res.json({ message: 'Outfit deleted' });
        } else {
            res.status(404).json({ error: 'Outfit not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for updating a specific outfit
router.put('/outfits/:outfitId', async (req, res) => {
    try {
        const { outfitId } = req.params;
        const { uid, image, clothing_item } = req.body;
        const query = `UPDATE comments
                       SET uid = '${uid}',
                           image = '${image}',
                           clothing_item = '${JSON.stringify(clothing_item)}'
                       WHERE oid = '${outfitId}'`;
        const result = await conn.query(query);
        const updatedRowCount = result.affectedRows;

        if (updatedRowCount > 0) {
            res.json({ message: 'Outfit updated' });
        } else {
            res.status(404).json({ error: 'Outfit not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for retrieving a specific outfit
router.get('/outfits/:outfitId', async (req, res) => {
    try {
        const { outfitId } = req.params;
        const query = `SELECT * FROM outfits WHERE oid = '${outfitId}'`;
        const result = await conn.query(query);
        const post = result[0];

        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: 'Outfit not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for retrieving all outfits
router.get('/outfits/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const query = `SELECT * FROM outfits WHERE uid = '${userId}'`;
        const result = await conn.query(query);
        const post = result[0];

        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: 'Outfit not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for creating a new clothing item
router.post('/clothingItems', async (req, res) => {
    try {
        const { ciid, uid, image, color, category, personal } = req.body;
        const query = `INSERT INTO outfits (ciid, uid, image, color, category, personal)
                       VALUES ('${ciid}', '${uid}', '${image}', '${color}', '${category}', '${personal}')`;
        await conn.query(query);
        res.json({ message: 'Clothing item created' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for deleting a specific clothing item
router.delete('/clothingItems/:clothingItemId', async (req, res) => {
    try {
        const { clothingItemId } = req.params;
        const query = `DELETE FROM clothingItems WHERE ciid = '${clothingItemId}'`;
        const result = await conn.query(query);
        const deleteRowCount = result.affectedRows;

        if (deleteRowCount > 0) {
            res.json({ message: 'Clothing item deleted' });
        } else {
            res.status(404).json({ error: 'Clothing item not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for updating a specific clothing item
router.put('/clothingItems/:clothingItemId', async (req, res) => {
    try {
        const { clothingItemId } = req.params;
        const { uid, image, color, category, personal } = req.body;
        const query = `UPDATE clothingItems
                       SET uid = '${uid}',
                           image = '${image}',
                           color = '${color}',
                           category = '${category}',
                           personal = '${personal}'
                       WHERE ciid = '${clothingItemId}'`;
        const result = await conn.query(query);
        const updatedRowCount = result.affectedRows;

        if (updatedRowCount > 0) {
            res.json({ message: 'Clothing item updated' });
        } else {
            res.status(404).json({ error: 'Clothing item not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for retrieving a specific clothing item
router.get('/clothingItems/:clothingItemId', async (req, res) => {
    try {
        const { clothingItemId } = req.params;
        const query = `SELECT * FROM clothingItems WHERE oid = '${clothingItemId}'`;
        const result = await conn.query(query);
        const post = result[0];

        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: 'Clothing item not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for retrieving all clothing items
router.get('/clothingItems/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const query = `SELECT * FROM clothingItems WHERE uid = '${userId}'`;
        const result = await conn.query(query);
        const post = result[0];

        if (post) {
            res.json(post);
        } else {
            res.status(404).json({ error: 'Clothing item not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint for creating a new notification
router.post('/notifications', async (req, res) => {
  try {
    const { uid, viewed, description, recipients, event_time, category } = req.body;
    
    const query = `INSERT INTO notifications (uid, viewed, description, recipients, event_time, category)
                   VALUES ('${uid}', ${viewed}, '${description}', '${JSON.stringify(recipients)}', '${event_time}', '${category}')`;

    await conn.query(query);

    res.json({ message: 'Notification created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for deleting a specific notification
router.delete('/notifications/:notificationId', async (req, res) => {
  try {
    const { notificationId } = req.params;
    const query = `DELETE FROM notifications WHERE nid = '${notificationId}'`;

    const result = await conn.query(query);
    const deletedRowCount = result.affectedRows;

    if (deletedRowCount > 0) {
      res.json({ message: 'Notification deleted' });
    } else {
      res.status(404).json({ error: 'Notification not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for updating a specific notification
router.put('/notifications/:notificationId', async (req, res) => {
  try {
    const { notificationId } = req.params;
    const { viewed, description, recipients, event_time, category } = req.body;
    
    const query = `UPDATE notifications 
                   SET viewed = ${viewed},
                       description = '${description}',
                       recipients = '${JSON.stringify(recipients)}',
                       event_time = '${event_time}',
                       category = '${category}'
                   WHERE nid = '${notificationId}'`;

    const result = await conn.query(query);
    const updatedRowCount = result.affectedRows;

    if (updatedRowCount > 0) {
      res.json({ message: 'Notification updated' });
    } else {
      res.status(404).json({ error: 'Notification not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for triggering notifications
router.post('/notifications/trigger', async (req, res) => {
  try {
    // Logic to trigger notifications
    // ...

    res.json({ message: 'Notifications triggered' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for retrying all failed notifications
router.post('/notifications/retry', async (req, res) => {
  try {
    // Logic to retry failed notifications
    // ...

    res.json({ message: 'Retrying all failed notifications' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for retrieving all notifications by recipient (UID)
router.get('/notifications/recipient/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const query = `SELECT * FROM notifications WHERE uid = '${userId}'::uuid`;

    const result = await conn.query(query);
    const notifications = result;

    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for creating a new user post
router.post('/posts', async (req, res) => {
  try {
    const { uid, caption, likes, post_time, commentes, oid, ciid } = req.body;
    const query = `INSERT INTO posts (uid, caption, likes, post_time, commentes, oid, ciid)
                   VALUES ('${uid}', '${caption}', ${likes}, '${post_time}', '${JSON.stringify(commentes)}', '${oid}', '${ciid}')`;

    await conn.query(query);

    res.json({ message: 'Post created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for deleting a specific user post
router.delete('/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const query = `DELETE FROM posts WHERE pid = '${postId}'`;

    const result = await conn.query(query);
    const deletedRowCount = result.affectedRows;

    if (deletedRowCount > 0) {
      res.json({ message: 'Post deleted' });
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for updating a specific user post
router.put('/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const { caption, likes, post_time, commentes, oid, ciid } = req.body;
    const query = `UPDATE posts 
                   SET caption = '${caption}', 
                       likes = ${likes}, 
                       post_time = '${post_time}', 
                       commentes = '${JSON.stringify(commentes)}', 
                       oid = '${oid}', 
                       ciid = '${ciid}' 
                   WHERE pid = '${postId}'`;

    const result = await conn.query(query);
    const updatedRowCount = result.affectedRows;

    if (updatedRowCount > 0) {
      res.json({ message: 'Post updated' });
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for retrieving a specific user post
router.get('/posts/:postId', async (req, res) => {
  try {
    const { postId } = req.params;
    const query = `SELECT * FROM posts WHERE pid = '${postId}'`;

    const result = await conn.query(query);
    const post = result[0];

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Endpoint for retrieving all user(one user, like userA) posts
router.get('/posts/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const query = `SELECT * FROM posts WHERE uid = '${userId}'`;
    const result = await conn.query(query);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;