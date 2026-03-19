import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axiosInstance";
import DataTable from "react-data-table-component";

const BlogList = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/admin/blogs").then((res) => setBlogs(res.data));
  }, []);

  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      name: "ID",
      selector: (row: any) => row.id,
      sortable: true,
      width: "80px",
    },
    {
      name: "Title",
      selector: (row: any) => row.title,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => row.status,
      sortable: true,
    },
    {
      name: "Created",
      selector: (row: any) => row.created_at,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row: any) => (
        <>
          <button
            className="btn btn-sm btn-primary me-2"
            onClick={() => navigate(`/admin/blogs/edit/${row.id}`)}
          >
            Edit
          </button>

          <button className="btn btn-sm btn-danger">
            Delete
          </button>
        </>
      ),
    },
  ];

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Blog List</h2>

        <button
          className="btn btn-danger"
          onClick={() => navigate("/admin/blogs/add")}
        >
          + Add Blog
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search blog..."
        className="form-control mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <DataTable
        columns={columns}
        data={filteredBlogs}
        pagination
        highlightOnHover
        striped
        responsive
      />
    </div>
  );
};

export default BlogList;