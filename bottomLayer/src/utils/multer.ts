const multer = require('multer');

const storage = multer.diskStorage({});
export const upload = multer({ storage });
