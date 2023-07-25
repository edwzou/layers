const express = require("express");
const router = express.Router();



const postgres = require("postgres");
require("dotenv").config();
// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;
PGHOST='ep-empty-pond-300198-pooler.us-west-2.aws.neon.tech'
PGDATABASE='neondb'
PGUSER='catwalkcommunal'
PGPASSWORD='RP85mWGNZJVe'
ENDPOINT_ID='ep-empty-pond-300198-pooler'
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
    res.status(200).json({ message: "User created"});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error FU" });
  }
});

// Endpoint for deleting a specific user
router.delete("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    await sql`DELETE FROM backend_schema.user WHERE uid = ${userId}`;

    res.status(200).json({ message: 'User deleted successfully', userId });
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
      username,
      first_name,
      last_name,
      email,
      password,
      profile_picture,
      following,
      followers,
    } = req.body; 
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
    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for retrieving a specific user
router.get("/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await sql`
      SELECT * FROM backend_schema.user
      WHERE uid = ${userId}
        AND EXISTS (
          SELECT 1 FROM backend_schema.user WHERE uid = ${userId}
        )
    `;
    // Select 1 ensures that the backend_schema.user has at least 1 column

    // Return the user information
    res.status(200).json(user[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for creating a new outfit
router.post("/outfits", async (req, res) => {
  try {
    const { title, clothing_items, uid } = req.body;
    await sql`INSERT INTO backend_schema.outfit (title, clothing_items, uid)
      VALUES (${title}, ${clothing_items}, ${uid})
      `;
    // Return the created outfit
    res.status(200).json({ message: 'Outfit created successfully'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for deleting a specific outfit
router.delete("/outfits/:outfitId", async (req, res) => {
  try {
    const { outfitId } = req.params;
    await sql`DELETE FROM backend_schema.outfit WHERE oid = ${outfitId}`;

    res.status(200).json({ message: 'Outfit deleted successfully', outfitId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for updating a specific outfit
router.put('/outfits/:oid', async (req, res) => {
  try {
    // Extract outfit data from the request body
    const { title, clothing_items } = req.body;
    const { oid } = req.params;

    // Update the outfit in the database
    await sql`
      UPDATE backend_schema.outfit
      SET title = ${title}, clothing_items = ${clothing_items}
      WHERE oid = ${oid}
    `;

    // Return the updated outfit
    res.status(200).json({ message: 'Outfit updated successfully', oid });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the outfit.' });
  }
});

// Endpoint for retrieving a specific outfit
router.get("/outfits/:outfitId", async (req, res) => {
  try {
    const { outfitId } = req.params;
    const outfit = await sql`
        SELECT * FROM backend_schema.outfit
        WHERE oid = ${outfitId}
          AND EXISTS (
            SELECT 1 FROM backend_schema.user WHERE oid = ${outfitId}
        )
    `;
   // Return the user information
    res.status(200).json(outfit[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for retrieving all outfits
router.get("/outfits/u/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
     // Query outfits for the specified user
    const outfits = await sql`
      SELECT * FROM backend_schema.outfit
      WHERE uid = ${userId}
    `;
    res.status(200).json(outfits); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for creating a new clothing item
router.post("/clothing_items", async (req, res) => {
  try {
    // Extract clothing item details from the request body
    const { image, category, title, uid, brands, size, color } = req.body;
    // Insert the clothing item into the database
    await sql`
      INSERT INTO backend_schema.clothing_item (image, category, title, uid, brands, size, color)
      VALUES ( ${image}, ${category}, ${title}, ${uid}, ${brands}, ${size}, ${color})
    `;

    res.status(200).json({ message: 'Clothing item created successfully'});
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint for updating a specific outfit
router.put("/clothing_items/:itemId", async (req, res) => {
  try {
    // Extract outfit data from the request body
    const { image, category, title, brands, size, color } = req.body;
    const { itemId } = req.params;

    // Update the outfit in the database
    await sql`
      UPDATE backend_schema.clothing_item
      SET title = ${title}, image = ${image}, category = ${category}, brands = ${brands}, size = ${size}, color = ${color}
      WHERE ciid = ${itemId}
    `;

    // Return the updated outfit
    res.status(200).json({ message: 'Clothing Item updated successfully', itemId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the clothing item.' });
  }
});

// Endpoint for deleting a specific clothing item
router.delete("/clothing_items/:itemId", async (req, res) => {
  try {
    const { itemId } = req.params;
    await sql`DELETE FROM backend_schema.clothing_item WHERE ciid = ${itemId}`;

    res.status(200).json({ message: 'Clothing item deleted successfully', itemId });
 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});



// Endpoint for retrieving a specific clothing item
router.get('/clothing_items/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    
    // Query the database to retrieve the clothing item
    const item = await sql`
      SELECT * FROM backend_schema.clothing_item
      WHERE ciid = ${itemId}   
        AND EXISTS (
            SELECT 1 FROM backend_schema.user WHERE ciid = ${itemId}
    )
    `;
    
    // Return the item
    res.status(200).json(item[0]);
  } catch (error) {
    console.error('Error retrieving clothing item:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the clothing item' });
  }
});

// Endpoint for retrieving a all clothing items
router.get("/clothing_items/u/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const items = await sql`
      SELECT * FROM backend_schema.clothing_item
      WHERE uid = ${user_id}
    `;
    
    // Return the items
    res.status(200).json(items);
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
