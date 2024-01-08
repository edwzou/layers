import express, { type Request, type Response } from 'express';
import { pool } from '../../utils/sqlImport';
import { responseCallbackPost } from '../../utils/responseCallback';
import { checkAuthenticated } from '../../middleware/auth';
import { convertImage } from '../../s3/convert-image';
import { upload } from '../../utils/multer';
const router = express.Router();

// Endpoint for creating a specific user
router.post(
	'/',
	checkAuthenticated,
	upload.single('profile_picture'),
	(req: Request, res: Response) => {
		const {
			first_name,
			last_name,
			email,
			username,
			password,
			private_option,
			profile_picture,
			followers,
			following,
		} = req.body;
		const insertUser = async (): Promise<void> => {
			try {
				const imgRef = await convertImage(profile_picture, username, false);
				await pool.query(
					`
      INSERT INTO backend_schema.user (
        first_name, last_name, email, username, password, private_option, followers, following, profile_picture
        ) VALUES ( 
          $1, $2, $3, $4, $5, $6, $7, $8, $9)`,
					[
						first_name,
						last_name,
						email.toLowerCase(),
						username,
						password,
						private_option,
						JSON.parse(followers),
						JSON.parse(following),
						imgRef,
					]
				);

				responseCallbackPost(null, res, 'User');
			} catch (error) {
				responseCallbackPost(error, res);
			}
		};
		void insertUser();
	}
);

export { router as default, router as devUserRoute };
