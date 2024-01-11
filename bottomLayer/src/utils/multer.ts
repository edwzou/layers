import multer from 'multer';

const storage = multer.memoryStorage();
const maxFileSize = 10 * 1024 * 1024; // 10MB
const maxFieldSize = 25 * 1024 * 1024;

export const upload = multer({
	storage,
	limits: { fileSize: maxFileSize, fieldSize: maxFieldSize },
});
