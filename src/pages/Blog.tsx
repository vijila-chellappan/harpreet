// src/pages/BlogPage.tsx
import React from "react";
import BlogList from "../components/BlogList";

const BlogPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4 mt-4">
      <h1 className="text-3xl font-bold mb-6">All Blogs</h1>
      <BlogList />
    </div>
  );
};

export default BlogPage;