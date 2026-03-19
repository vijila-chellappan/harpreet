import { Routes, Route } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";
import Blogs from "./pages/blogs/BlogList";
import AddBlog from "./pages/blogs/AddBlog";
import EditBlog from "./pages/blogs/EditBlog";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="contacts" element={<Contacts />} />
        <Route path="blogs" element={<Blogs />} />

        {/* ADD THIS */}
        <Route path="blogs/add" element={<AddBlog />} />
        <Route path="blogs/edit/:id" element={<EditBlog />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;