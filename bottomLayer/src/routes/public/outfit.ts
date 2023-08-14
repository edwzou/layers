import express from "express";
import { sql } from "../../utils/sqlImport";
import {
  getUserCore,
  responseCallback,
  responseCallbackGet,
  responseCallbackGetAll,
} from "../../utils/responseCallback";
// import {
//   getUserCore,
//   getUserCore2,
// } from "../../routes/public/user";
const router = express.Router();

// Endpoint for retrieving a specific outfit
router.get('/:outfitId', (req: any, res: any): void => {
  const { outfitId } = req.params;

  const getOutfitById = async (outfitId: string): Promise<any> => {
    try {
      const outfit = await sql`
        SELECT * FROM backend_schema.outfit
        WHERE oid = ${outfitId}
    `;

      responseCallbackGet(null, outfit, res, "Outfits");
    } catch (error) {
      responseCallbackGet(error, null, res);
    }
  };

  void getOutfitById(outfitId);
});

// Endpoint for retrieving all outfits
router.get('/u/:userId', (req: any, res: any): void => {
  const { userId } = req.params;

  // Query outfits for the specified user
  const getAllOutfits = async (userId: string): Promise<any> => {
    try {
      const user = await getUserCore(userId);
      const outfits = await sql`
        SELECT * FROM backend_schema.outfit
        WHERE uid = ${userId}
      `;

      responseCallbackGetAll(user, outfits, res, "Outfits");
    } catch (error) {
      responseCallbackGet(error, null, res);
    }
  };

  void getAllOutfits(userId);
});

module.exports = router;
