import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosInstance";
import { BASE_URL } from "../api/api";
import BlogContactForm from "../components/BlogContactForm";

interface Blog {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  created_at: string;
}

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
        try {
            const res = await api.get("/blogs");

            const foundBlog = res.data.find(
            (blog: Blog) => blog.slug === slug
            );

            setBlog(foundBlog || null);
        } catch (error) {
            console.error("Error fetching blog:", error);
        } finally {
            setLoading(false);
        }
    };

    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  if (loading) {
    return <p className="text-center mt-5">Loading blog...</p>;
  }

  if (!blog) {
    return <p className="text-center mt-5">Blog not found.</p>;
  }

  return (
        <div className="container py-5">
            <div className="row">

            {/* Blog Content */}
            <div className="col-lg-8 mb-4">
            <h1 className="mb-3">{blog.title}</h1>

            <p className="text-muted">
                {blog.author} |{" "}
                {new Date(blog.created_at).toLocaleDateString()}
            </p>

            {blog.featured_image && (
                <img
                src={`${BASE_URL}/uploads/blogs/${blog.featured_image}`}
                alt={blog.title}
                className="img-fluid w-100 mb-4"
                />
            )}

            <div
                className="blog-content"
                dangerouslySetInnerHTML={{
                __html: blog.content,
                }}
            />
            </div>

            {/* Blog Form */}
            <div className="col-lg-4">
            <BlogContactForm
                blogSlug={blog.slug}
                blogTitle={blog.title}
            />
            </div>

        </div>
        </div>
    );
};

export default BlogDetail;