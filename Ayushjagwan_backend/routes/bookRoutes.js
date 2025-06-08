import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addBook, addReview, borrowBook, getBookById, getBooks, getBorrowedBooks } from '../controllers/bookcontroller.js';

const router = express.Router();

router.post('/books/add', addBook); 
router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.post('/books/:id/borrow', authMiddleware, borrowBook);
router.post('/books/:id/review', authMiddleware, addReview);
router.get('/my-borrowed-books', authMiddleware, getBorrowedBooks);



export default router;
