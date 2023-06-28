const express = require("express");
const router = express.Router();

const { v4: uuidv4 } = require("uuid");

// Generate a new UUID
const uid = uuidv4();

const postgres = require("postgres");
require("dotenv").config();
// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
PGHOST = "ep-delicate-salad-519724.us-west-2.aws.neon.tech";
PGDATABASE = "neondb";
PGUSER = "JoeDaBu";
PGPASSWORD = "vyh1QoCtL5jT";
ENDPOINT_ID = "ep-delicate-salad-519724";
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?options=project%3D${ENDPOINT_ID}`;

const sql = postgres(URL, { ssl: "require" });

async function getPgVersion() {
  const result = await sql`select version()`;
  console.log(result);
}

getPgVersion();

//Endpoint for creating a new user
router.post("/users", async (req, res) => {
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
      private,
    } = req.body;
    console.log(`INSERT INTO backend_schema.user (
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
                ${private},
                ${followers},
                ${following},
                ${profile_picture}
            )
        `);
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
                ${private},
                ${followers},
                ${following},
                ${profile_picture}
            )
        `;
    res.json({ message: "User created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error FU" });
  }
});

// Endpoint for deleting a specific user
router.delete("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const query = `DELETE FROM users WHERE uid = '${userId}'`;
    const result = await conn.query(query);
    const deleteRowCount = result.affectedRows;

    if (deleteRowCount > 0) {
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoints for updating a specific user
router.put("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const {
      uid,
      first_name,
      last_name,
      user_name,
      email,
      password,
      profile_picture,
      followings,
      followers,
    } = req.body;
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
      res.json({ message: "User updated" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for retrieving a specific user
router.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const query = `SELECT * FROM users WHERE uid = '${userId}'`;
    const result = await conn.query(query);
    const post = result[0];

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for creating a new outfit
router.post("/outfits", async (req, res) => {
  try {
    const { oid, uid, image, clothing_item } = req.body;
    const query = `INSERT INTO outfits (oid, uid, image, clothing_item)
                       VALUES ('${oid}', '${uid}', '${image}', '${JSON.stringify(
      clothing_item
    )}')`;
    await conn.query(query);
    res.json({ message: "Outfit created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for deleting a specific outfit
router.delete("/outfits/:outfitId", async (req, res) => {
  try {
    const { outfitId } = req.params;
    const query = `DELETE FROM outfits WHERE oid = '${outfitId}'`;
    const result = await conn.query(query);
    const deleteRowCount = result.affectedRows;

    if (deleteRowCount > 0) {
      res.json({ message: "Outfit deleted" });
    } else {
      res.status(404).json({ error: "Outfit not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for updating a specific outfit
router.put("/outfits/:outfitId", async (req, res) => {
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
      res.json({ message: "Outfit updated" });
    } else {
      res.status(404).json({ error: "Outfit not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for retrieving a specific outfit
router.get("/outfits/:outfitId", async (req, res) => {
  try {
    const { outfitId } = req.params;
    const query = `SELECT * FROM outfits WHERE oid = '${outfitId}'`;
    const result = await conn.query(query);
    const post = result[0];

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Outfit not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for retrieving all outfits
router.get("/outfits/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const query = `SELECT * FROM outfits WHERE uid = '${userId}'`;
    const result = await conn.query(query);
    const post = result[0];

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Outfit not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for creating a new clothing item
router.post("/clothingItems", async (req, res) => {
  try {
    const { ciid, uid, image, color, category, personal } = req.body;
    const query = `INSERT INTO outfits (ciid, uid, image, color, category, personal)
                       VALUES ('${ciid}', '${uid}', '${image}', '${color}', '${category}', '${personal}')`;
    await conn.query(query);
    res.json({ message: "Clothing item created" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for deleting a specific clothing item
router.delete("/clothingItems/:clothingItemId", async (req, res) => {
  try {
    const { clothingItemId } = req.params;
    const query = `DELETE FROM clothingItems WHERE ciid = '${clothingItemId}'`;
    const result = await conn.query(query);
    const deleteRowCount = result.affectedRows;

    if (deleteRowCount > 0) {
      res.json({ message: "Clothing item deleted" });
    } else {
      res.status(404).json({ error: "Clothing item not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for updating a specific clothing item
router.put("/clothingItems/:clothingItemId", async (req, res) => {
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
      res.json({ message: "Clothing item updated" });
    } else {
      res.status(404).json({ error: "Clothing item not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for retrieving a specific clothing item
router.get("/clothingItems/:clothingItemId", async (req, res) => {
  try {
    const { clothingItemId } = req.params;
    const query = `SELECT * FROM clothingItems WHERE oid = '${clothingItemId}'`;
    const result = await conn.query(query);
    const post = result[0];

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Clothing item not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for retrieving all clothing items
router.get("/clothingItems/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const query = `SELECT * FROM clothingItems WHERE uid = '${userId}'`;
    const result = await conn.query(query);
    const post = result[0];

    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: "Clothing item not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for authenticating and logging in a user
router.post("/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    // Perform authentication logic

    res.json({ message: "User authenticated and logged in" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for logging out the currently authenticated user
router.post("/auth/logout", async (req, res) => {
  try {
    // Perform logout logic

    res.json({ message: "User logged out" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for following a user
router.post("/users/:id/follow", async (req, res) => {
  try {
    const { uid } = req.params;
    // Perform follow user logic

    res.json({ message: "User followed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for unfollowing a user
router.post("/users/:id/unfollow", async (req, res) => {
  try {
    const { uid } = req.params;
    // Perform unfollow user logic

    res.json({ message: "User unfollowed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for searching users by username or name
router.get("/search/users", async (req, res) => {
  try {
    const { query } = req.query;
    // Perform user search logic

    res.json({ message: "User search results" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
