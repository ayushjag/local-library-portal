import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const baseURL = import.meta.env.VITE_API_BASE_URL; 

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [borrowMsg, setBorrowMsg] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`${baseURL}/books/${id}`);
        setBook(res.data);
      } catch (err) {
        setError("Failed to load book details.");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleBorrow = async () => {
    try {
      const res = await axios.post(
        `${baseURL}/books/${id}/borrow`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBorrowMsg(res.data.message || "Book borrowed successfully");
      navigate("/my-borrowed-books");
    } catch (err) {
      setBorrowMsg(err.response?.data?.error || "Failed to borrow book");
    }
  };

  if (loading) return <p>Loading book details...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Reader Level:</strong> {book.readerLevel || "N/A"}</p>
      <p><strong>Description:</strong> {book.description || "No description"}</p>
      <p><strong>Rating:</strong> {book.rating || "N/A"}</p>

      {user ? (
        <button
          onClick={handleBorrow}
          disabled={book.borrowedBy !== null}
          className="mt-4 px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded disabled:bg-gray-400"
        >
          {book.borrowedBy ? "Already Borrowed" : "Borrow Book"}
        </button>
      ) : (
        <p className="mt-4 text-red-600">Login to borrow this book.</p>
      )}

      {borrowMsg && <p className="mt-2 text-green-600">{borrowMsg}</p>}
    </div>
  );
};

export default BookDetail;
