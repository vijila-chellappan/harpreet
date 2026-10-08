import { BrowserRouter, Routes, Route} from "react-router-dom";
import PublicLayout from "./components/PublicLayout";
import Home from "./pages/Home";
import AdminRoutes from "./admin/AdminRoutes";
import Login from "./admin/pages/Login";
import BlogPage from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC WEBSITE */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
        </Route>

        {/* ADMIN ROUTES */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;