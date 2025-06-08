import Book from "../models/book.js";
import User from "../models/user.js";
import { formatDate } from '../utils/dateFormatter.js';


export const addBook = async (req, res) => {
  try {
    const {
      title,
      author,
      genre,
      genreCode,
      readerLevel
    } = req.body;

    const newBook = new Book({
      title,
      author,
      genre,
      genreCode,
      readerLevel
    });

    await newBook.save();
    res.status(201).json({ message: 'Book added successfully', book: newBook });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Failed to add book' });
  }
};


export const getBooks = async (req, res) => {
  try {
    const { genre, author, rating } = req.query;
    const filter = {};

    if (genre) filter.genre = genre;
    if (author) filter.author = author;
    if (rating) filter.rating = { $gte: Number(rating) };

    const books = await Book.find(filter);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
};


export const borrowBook = async (req, res) => {
  const userId = req.user.id; 
  const bookId = req.params.id;

  try {
    const user = await User.findById(userId).populate('borrowedBooks.bookId');
    const book = await Book.findById(bookId);

    if (!book) return res.status(404).json({ error: 'Book not found' });
    if (book.borrowedBy) return res.status(400).json({ error: 'Book already borrowed' });

 
    if (user.borrowedBooks.length >= 3) {
      return res.status(400).json({ error: 'Borrow limit reached (3 books max)' });
    }

 
    const hasSameGenre = user.borrowedBooks.some(b => b.bookId.genreCode === book.genreCode);
    if (hasSameGenre) {
      return res.status(400).json({ error: 'Cannot borrow two books from the same genre' });
    }

    const borrowedUntil = new Date();
    borrowedUntil.setDate(borrowedUntil.getDate() + 14); // 2 weeks from now

 
    book.borrowedBy = user._id;
    book.borrowedUntil = borrowedUntil;
    await book.save();

   
    user.borrowedBooks.push({ bookId: book._id, borrowedUntil });
    await user.save();

    res.json({ message: 'Book borrowed successfully', borrowedUntil:formatDate(borrowedUntil) });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
export const addReview = async (req, res) => {
  const userId = req.user.id;
  const bookId = req.params.id;
  const { content, learningReflection, rating } = req.body;

  if (!content || !learningReflection || !rating) {
    return res.status(400).json({ error: 'All review fields are required' });
  }

  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!book) return res.status(404).json({ error: 'Book not found' });

 
    const hasBorrowed = user.borrowedBooks.some(b => b.bookId.toString() === bookId);
    if (!hasBorrowed) {
      return res.status(403).json({ error: 'You must borrow the book to review it' });
    }

    book.reviews.push({ userId, content, learningReflection, rating });
    await book.save();

    res.json({ message: 'Review added' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
export const getBorrowedBooks = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).populate('borrowedBooks.bookId');
    res.json(user.borrowedBooks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
