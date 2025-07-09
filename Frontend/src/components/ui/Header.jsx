// src/components/Header.jsx
import { Link } from "react-router-dom"; // Import Link to navigate without reloading
import { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";

export default function Header() {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <header className="bg-slate-800 p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-white">
        MyBlog
      </Link>{" "}
      {/* Logo/Brand name */}
      <nav className="flex gap-4">
        {!user ? (
          <>
            <Link to="/login" className="text-slate-300 hover:text-white">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-slate-800"
              >
                Login
              </Button>
            </Link>{" "}
            <Link to="/register" className="text-slate-300 hover:text-white">
              <Button
                variant="outline"
                className="text-white border-white hover:bg-slate-800"
              >
                Register
              </Button>
            </Link>{" "}
          </>
        ) : (
          <Button
            variant="outline"
            className="text-white border-white hover:bg-slate-800"
            onClick={() => {
              logout();
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </Button>
        )}
      </nav>
    </header>
  );
}
