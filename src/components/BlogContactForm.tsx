import React, { useState } from "react";
import "../css/BlogContactForm.css";
import api from "../api/axiosInstance";
import { API_ENDPOINTS } from "../api/api";

interface BlogContactFormProps {
  blogSlug?: string;
  blogTitle?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const BlogContactForm: React.FC<BlogContactFormProps> = ({
  blogSlug,
  blogTitle,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSuccess("");
  };

  const validate = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^[0-9+\-\s()]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please enter your message.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSuccess("");

    if (!validate()) {
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),

        // Current blog page URL
        blog_url: window.location.href,

        // Optional blog information
        blog_slug: blogSlug || "",
        blog_title: blogTitle || "",
      };

      const response = await api.post(
        API_ENDPOINTS.BLOG_ENQUIRIES,
        payload
      );

      console.log("Blog enquiry submitted:", response.data);

      setSuccess("Thank you! We will contact you shortly.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);

      setSuccess("");

      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="blog-contact-form">
      <h3 className="blog-contact-form-title">
        Get a Quote
      </h3>

      <p className="blog-contact-form-description">
        Have questions about insurance? Get in touch with us.
      </p>

      <form onSubmit={handleSubmit} noValidate>

        {/* Name */}
        <div className="blog-form-group">
          <label htmlFor="blog-name">
            Name <span>*</span>
          </label>

          <input
            id="blog-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />

          {errors.name && (
            <small className="blog-form-error">
              {errors.name}
            </small>
          )}
        </div>

        {/* Email */}
        <div className="blog-form-group">
          <label htmlFor="blog-email">
            Email <span>*</span>
          </label>

          <input
            id="blog-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          {errors.email && (
            <small className="blog-form-error">
              {errors.email}
            </small>
          )}
        </div>

        {/* Phone */}
        <div className="blog-form-group">
          <label htmlFor="blog-phone">
            Phone Number <span>*</span>
          </label>

          <input
            id="blog-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />

          {errors.phone && (
            <small className="blog-form-error">
              {errors.phone}
            </small>
          )}
        </div>

        {/* Message */}
        <div className="blog-form-group">
          <label htmlFor="blog-message">
            Message <span>*</span>
          </label>

          <textarea
            id="blog-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your message"
            rows={5}
          />

          {errors.message && (
            <small className="blog-form-error">
              {errors.message}
            </small>
          )}
        </div>

        {/* Success Message */}
        {success && (
          <div className="blog-form-success">
            {success}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="blog-form-submit"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Get a Quote"}
        </button>

      </form>
    </div>
  );
};

export default BlogContactForm;