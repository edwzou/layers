import express from "express";
import { sql } from "../../utils/sqlImport";
import {
  getUserCore,
  responseCallback,
  responseCallbackGet,
  responseCallbackGetAll,
} from "../../utils/responseCallback";
const router = express.Router();

// Endpoint for retrieving a specific clothing item
router.get("/:itemId", (req: any, res: any): void => {
  const { itemId } = req.params;

  const getClothingById = async (itemId: string): Promise<any> => {
    try {
      const item = await sql`
        SELECT * FROM backend_schema.clothing_item
        WHERE ciid = ${itemId}   
        `;

      responseCallbackGet(null, item, res, "Clothing Item");
    } catch (error) {
      responseCallbackGet(error, null, res);
    }
  };

  void getClothingById(itemId);
});

// Endpoint for retrieving a all clothing items
router.get("/u/:userId", (req: any, res: any): void => {
  const { userId } = req.params;

  const getAllClothing = async (userId: string): Promise<any> => {
    try {
      const run = getUserCore(userId);
      const items = await sql`
        SELECT * FROM backend_schema.clothing_item
        WHERE uid = ${userId}
      `;
      await run;
      responseCallbackGetAll(items, res, "Clothing Items");
    } catch (error) {
      responseCallbackGet(error, null, res);
    }
  };

  void getAllClothing(userId);
});

module.exports = router;
