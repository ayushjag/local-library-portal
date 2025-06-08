import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  userId: String,
  content: String,
  learningReflection: String,
  rating: Number
});

const bookSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  author:      { type: String, required: true },
  genre:       { type: String, required: true },
  genreCode:   { type: String, required: true },
  readerLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  description: { type: String },
  rating:      { type: Number, min: 0, max: 5 },
  reviews:     [reviewSchema],
  borrowedBy:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  borrowedUntil: { type: Date, default: null }
});


const Book = mongoose.model('Book', bookSchema);
export default Book;
