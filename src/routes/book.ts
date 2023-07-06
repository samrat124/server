import express from 'express';
import { createBook, getBooks } from '../controllers/book';
// import { authenticate, authorize } from '../middleware/auth';

export const bookRouter = express.Router();

bookRouter.post('/',  createBook);
bookRouter.get('/',  getBooks);
