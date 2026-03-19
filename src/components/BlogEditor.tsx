import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect } from "react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import "../css/editor.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const BlogEditor = ({ value, onChange }: Props) => {

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your blog content here..."
      })
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  /* ✅ IMPORTANT FIX */
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="editor-wrapper">

      {/* Toolbar */}
      <div className="editor-toolbar">

        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()}>
          <b>B</b>
        </button>

        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()}>
          <i>I</i>
        </button>

        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </button>

        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • List
        </button>

      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="editor-content" />

    </div>
  );
};

export default BlogEditor;