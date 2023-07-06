const express =require ('express');
const { createBook, getBooks } =require('../controllers/book');
// import { authenticate, authorize } from '../middleware/auth';

const bookRouter = express.Router();

bookRouter.post('/',  createBook);
bookRouter.get('/',  getBooks);


module.exports=bookRouter;