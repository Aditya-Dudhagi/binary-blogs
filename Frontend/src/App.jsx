import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import BlogDetail from "./pages/BlogDetail"
import NewBlog from './pages/NewBlog'
import EditBlog from './pages/EditBlog'
import ProtectedRoute from "./components/ui/ProtectedRoute";



export default function App() {
  return (
    <Router>
      {" "}
      {/*Wrap everything in Router to enable routing*/}
      <Routes>
        {/* Main layout that holds the header, sidebar, etc. */}
        <Route path="/" element={<MainLayout />}>
          {/* Define different routes inside the MainLayout */}
          <Route index element={<home />} /> {/* Home route */}
          <Route path="login" element={<Login />} /> {/* Login route */}
          <Route path="register" element={<Register />} />{" "}
          {/* Register route */}
          <Route path="blog/:id" element={<BlogDetail />} />{" "}
          {/* Blog detail route */}

          <Route
            path="new"
            element={
              <ProtectedRoute>
                <NewBlog />
              </ProtectedRoute>
            }
          />{" "}
          {/* new blog route */}

          <Route
            path="edit/:id"
            element={
              <ProtectedRoute>
                <EditBlog />
              </ProtectedRoute>
            }
          />{" "}
          {/* edit blog route */}
        </Route>
      </Routes>
    </Router>
  );
};
