// src/components/Header.jsx
import { Link } from "react-router-dom"; // Import Link to navigate without reloading

export default function Header() {
  return (
    <header className="bg-slate-800 p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-white">
        MyBlog
      </Link>{" "}
      {/* Logo/Brand name */}
      <nav className="flex gap-4">
        <Link to="/login" className="text-slate-300 hover:text-white">
          Login
        </Link>{" "}
        {/* Link to login */}
        <Link to="/register" className="text-slate-300 hover:text-white">
          Register
        </Link>{" "}
        {/* Link to register */}
      </nav>
    </header>
  );
}
