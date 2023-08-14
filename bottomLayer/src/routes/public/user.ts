import express from "express";
import { sql } from "../../utils/sqlImport";
import {
  responseCallback,
  responseCallbackGet,
} from "../../utils/responseCallback";
const router = express.Router();

// Endpoint for retrieving a specific user
router.get("/:userId", (req, res): void => {
  const { userId } = req.params;

  const getUser = async (userId: string): Promise<void> => {
    try {
      const user = await sql`
        SELECT * FROM backend_schema.user
        WHERE uid = ${userId}
    `;

      responseCallbackGet(null, user, res, "User");
    } catch (error) {
      responseCallbackGet(error, null, res);
    }
  };

  void getUser(userId);
});

module.exports = router;
