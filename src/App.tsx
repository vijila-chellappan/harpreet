import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import Home from "./pages/Home";
import BlogPage from "./pages/Blog";
import AdminRoutes from "./admin/AdminRoutes";
import Login from "./admin/pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC WEBSITE */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogPage />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;