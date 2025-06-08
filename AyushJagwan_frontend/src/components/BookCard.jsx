import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <Link
      to={`/books/${book._id}`}
      className="block rounded-lg shadow-md   p-5 hover:shadow-xl transition-shadow duration-300 ease-in-out "
    >
      <h3 className="text-xl font-bold mb-2">{book.title}</h3>
      <p className="text-sm mb-1 opacity-90">Author: {book.author}</p>
      <p className="text-sm mb-1 opacity-90">Genre: {book.genre}</p>
      <p className="text-sm mt-3 font-semibold">
        Rating: <span className="text-yellow-300">{book.rating ?? "N/A"}</span>
      </p>
    </Link>
  );
};

export default BookCard;
