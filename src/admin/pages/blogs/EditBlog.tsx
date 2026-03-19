import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../api/axiosInstance";
import BlogEditor from "../../../components/BlogEditor";
import { BASE_URL } from "../../../api/api";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<any>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: null,
    author: "",
    status: "draft",
    meta_title: "",
    meta_description: "",
  });

  const [previewImage, setPreviewImage] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  /* ==========================
     LOAD BLOG DATA
  ==========================*/
  useEffect(() => {
  const fetchBlog = async () => {
    try {
      const res = await api.get(`/admin/blogs/${id}`);
      const blog = res.data;

      setFormData({
        title: blog.title || "",
        slug: blog.slug || "",
        excerpt: blog.excerpt || "",
        content: blog.content || "",
        featured_image: blog.featured_image || null, // store filename here
        author: blog.author || "",
        status: blog.status || "draft",
        meta_title: blog.meta_title || "",
        meta_description: blog.meta_description || "",
      });

      if (blog.featured_image) {
        setPreviewImage(`${BASE_URL}/uploads/blogs/${blog.featured_image}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchBlog();
}, [id]);

  /* ==========================
     GENERATE SLUG
  ==========================*/
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  /* ==========================
     HANDLE INPUT CHANGE
  ==========================*/
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    let updated = { ...formData, [name]: value };

    if (name === "title") {
      updated.slug = generateSlug(value);
    }

    setFormData(updated);
  };

  /* ==========================
     IMAGE CHANGE
  ==========================*/
  const handleImageChange = (e: any) => {
    if (e.target.files[0]) {

      setFormData({
        ...formData,
        featured_image: e.target.files[0],
      });

      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  /* ==========================
     UPDATE BLOG
  ==========================*/
  const handleSubmit = async (e: any) => {

    e.preventDefault();
    setLoading(true);

    try {

      const data = new FormData();

      data.append("title", formData.title);
      data.append("slug", formData.slug);
      data.append("excerpt", formData.excerpt);
      data.append("content", formData.content);
      data.append("author", formData.author);
      data.append("status", formData.status);
      data.append("meta_title", formData.meta_title);
      data.append("meta_description", formData.meta_description);

      if (formData.featured_image) {
        data.append("featured_image", formData.featured_image);
      }

      await api.put(`/admin/blogs/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Blog updated successfully");
      navigate("/admin/blogs");

    } catch (error) {

      console.error(error);
      alert("Error updating blog");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      <h2>Edit Blog</h2>

      <form onSubmit={handleSubmit}>

        {/* TITLE */}
        <div className="mb-3">
          <label>Title</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* SLUG */}
        <div className="mb-3">
          <label>Slug</label>
          <input
            type="text"
            name="slug"
            className="form-control"
            value={formData.slug}
            onChange={handleChange}
          />
        </div>

        {/* EXCERPT */}
        <div className="mb-3">
          <label>Excerpt</label>
          <textarea
            name="excerpt"
            className="form-control"
            rows={2}
            value={formData.excerpt}
            onChange={handleChange}
          />
        </div>

        {/* CONTENT */}
        <div className="mb-3">
          <label>Content</label>

          <BlogEditor
            value={formData.content}
            onChange={(value: string) =>
              setFormData({ ...formData, content: value })
            }
          />
        </div>

        {/* FEATURED IMAGE */}
        <div className="mb-3">
          <label>Featured Image</label>

          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
          />

          {previewImage && (
            <div className="mt-2">
              <img
                src={previewImage}
                style={{ width: "150px", borderRadius: "6px" }}
              />
            </div>
          )}
        </div>

        {/* AUTHOR */}
        <div className="mb-3">
          <label>Author</label>
          <input
            type="text"
            name="author"
            className="form-control"
            value={formData.author}
            onChange={handleChange}
          />
        </div>

        {/* STATUS */}
        <div className="mb-3">
          <label>Status</label>
          <select
            name="status"
            className="form-control"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* META TITLE */}
        <div className="mb-3">
          <label>Meta Title</label>
          <input
            type="text"
            name="meta_title"
            className="form-control"
            value={formData.meta_title}
            onChange={handleChange}
          />
        </div>

        {/* META DESCRIPTION */}
        <div className="mb-3">
          <label>Meta Description</label>
          <textarea
            name="meta_description"
            className="form-control"
            rows={2}
            value={formData.meta_description}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update Blog"}
        </button>

      </form>

    </div>
  );
};

export default EditBlog;