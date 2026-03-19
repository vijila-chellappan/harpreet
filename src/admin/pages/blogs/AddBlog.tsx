import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axiosInstance";
import BlogEditor from "../../../components/BlogEditor";

const AddBlog = () => {
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

  const [loading, setLoading] = useState(false);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {

    const { name, value } = e.target;

    let updatedData = { ...formData, [name]: value };

    if (name === "title") {
      updatedData.slug = generateSlug(value);
    }

    setFormData(updatedData);
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        featured_image: e.target.files[0],
      });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {

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

      await api.post("/admin/blogs", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Blog added successfully");
      navigate("/admin/blogs");

    } catch (error) {

      console.error(error);
      alert("Error adding blog");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      <h2>Add Blog</h2>

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
            name="featured_image"
            className="form-control"
            accept="image/*"
            onChange={handleImageChange}
          />

          {formData.featured_image && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(formData.featured_image)}
                alt="preview"
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

        <button className="btn btn-danger" disabled={loading}>
          {loading ? "Saving..." : "Save Blog"}
        </button>

      </form>
    </div>
  );
};

export default AddBlog;