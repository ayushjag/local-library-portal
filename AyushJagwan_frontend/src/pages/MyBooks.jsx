import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";  

const MyBooks = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const res = await axiosInstance.get('/my-borrowed-books');
        setBorrowedBooks(res.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load borrowed books");
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowedBooks();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading borrowed books...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  if (borrowedBooks.length === 0)
    return <p className="text-center mt-10">No borrowed books found.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Borrowed Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {borrowedBooks.map((book) => (
          <div key={book._id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold">{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Borrowed Until: {new Date(book.borrowedUntil).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooks;
