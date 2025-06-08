import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";  // use this if it adds token automatically
import { AuthContext } from "../context/AuthContext";
import formatDate from "../utils/formatDate";

const MyBooks = () => {
  const { user, token } = useContext(AuthContext); // get token from context (or get it from localStorage if needed)
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const res = await axiosInstance.get('/my-borrowed-books'); // baseURL should be set in axiosInstance
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
       {borrowedBooks.map((item) => (
  <div key={item.bookId._id} className="border p-4 rounded shadow">
    <h3 className="text-lg font-semibold">{item.bookId.title}</h3>
    <p>Author: {item.bookId.author}</p>
    <p>Genre: {item.bookId.genre}</p>
    <p>Borrowed Until: {formatDate(item.borrowedUntil)}</p>
  </div>
))}

      </div>
    </div>
  );
};

export default MyBooks;
