import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { BASE_URL } from "../api/api";
import { API_ENDPOINTS } from "../api/api";
import { Link } from "react-router-dom";

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  author: string;
  created_at: string;
}

const BlogList: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get(API_ENDPOINTS.BLOGS);
        setBlogs(res.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p className="text-center mt-5">Loading blogs...</p>;

  return (
    <div className="container py-5">

      <div className="row">

        {blogs.map((blog) => (
          <div className="col-md-4 mb-4" key={blog.id}>

            <div className="card h-100 shadow-sm border-0">

              {/* Blog Image */}
              {blog.featured_image && (
                <img
                  src={`${BASE_URL}/uploads/blogs/${blog.featured_image}`}
                  className="card-img-top"
                  alt={blog.title}
                  style={{ height: "220px", objectFit: "cover" }}
                />
              )}

              <div className="card-body d-flex flex-column">

                {/* Title */}
                <h4 className="card-title">
                  {blog.title}
                </h4>

                {/* Author + Date */}
                <p className="text-uppercase small fw-bold text-primary mb-2">
                  {blog.author}
                  <span className="text-muted ms-2">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </span>
                </p>

                {/* Excerpt */}
                <p className="card-text text-muted">
                  {blog.excerpt.substring(0, 140)}...
                </p>

                {/* Button */}
                <Link
                  to={`/blog/${blog.slug}`}
                  className="btn btn-danger mt-auto"
                >
                  READ MORE
                </Link>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default BlogList;