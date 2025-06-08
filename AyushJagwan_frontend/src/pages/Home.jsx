import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from '../components/BookCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState("");
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState("");

  const baseURL = import.meta.env.VITE_API_BASE_URL; 

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`${baseURL}/books`);
        setBooks(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [baseURL]);

  useEffect(() => {
    let filteredBooks = books;

    if (genre) {
      filteredBooks = filteredBooks.filter((b) => b.genre === genre);
    }
    if (author) {
      filteredBooks = filteredBooks.filter((b) =>
        b.author.toLowerCase().includes(author.toLowerCase())
      );
    }
    if (rating) {
      filteredBooks = filteredBooks.filter((b) => b.rating >= Number(rating));
    }

    setFiltered(filteredBooks);
  }, [genre, author, rating, books]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Books</h2>

      {/* Filter Inputs */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Genres</option>
          {[...new Set(books.map((b) => b.genre))].map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search by author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="border p-2 rounded"
        />

        <select
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Ratings</option>
          {[5, 4, 3, 2, 1].map((r) => (
            <option key={r} value={r}>{r} & up</option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>No books match your filters.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
