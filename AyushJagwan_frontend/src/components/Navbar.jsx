import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="p-4 shadow-lg bg-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-black tracking-wide hover:opacity-90 transition duration-200"
        >
          📚 Library Portal
        </Link>

        <div className="space-x-4 text-base">
          {user ? (
            <>
              <Link
                to="/my-borrowed-books"
                className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition duration-200"
              >
                Borrowed Books
              </Link>
              <button
                onClick={handleLogout}
                className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-400 hover:bg-blue-500 text-white font-semibold px-4 py-2 rounded-md shadow-sm transition duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
