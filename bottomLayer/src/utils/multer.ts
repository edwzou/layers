import multer from 'multer';

const storage = multer.memoryStorage();
const maxSize = 10 * 1024 * 1024; // 10MB
export const upload = multer({ storage, limits: { fileSize: maxSize } });
