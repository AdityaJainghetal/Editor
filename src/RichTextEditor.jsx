import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  Maximize,
  Minimize,
  Code,
} from "lucide-react";
import { useState } from "react";

export default function TiptapEditor({ initialContent = "", onContentChange }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { target: "_blank" },
      }),
      Image.configure({ inline: true, allowBase64: true }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onContentChange?.(editor.getHTML());
    },
  });

  if (!editor) {
    return <div className="p-8 text-zinc-400">Loading Editor...</div>;
  }

  const addImage = () => {
    const url = prompt("Enter Image URL:");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setLink = () => {
    const url = prompt("Enter URL:");
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div
      className={`max-w-5xl mx-auto p-4 ${isFullscreen ? "fixed inset-0 bg-zinc-950 z-50 p-6" : ""}`}
    >
      <div className="bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-800 flex flex-col h-full">
        {/* Toolbar */}
        <div className="bg-zinc-950 p-3 flex flex-wrap gap-2 border-b border-zinc-800 items-center sticky top-0 z-10">
          {/* Font Size */}
          <select
            onChange={(e) =>
              editor.chain().focus().setFontSize?.(e.target.value).run()
            }
            className="bg-zinc-800 text-white px-3 py-1.5 rounded-lg border border-zinc-700"
          >
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
            <option value="24px">24px</option>
            <option value="28px">28px</option>
            <option value="32px">32px</option>
          </select>

          {/* Text Color */}
          <input
            type="color"
            onChange={(e) =>
              editor.chain().focus().setColor(e.target.value).run()
            }
            className="w-9 h-8 bg-transparent border border-zinc-700 rounded cursor-pointer"
          />

          {/* Highlight Color */}
          <input
            type="color"
            onChange={(e) =>
              editor
                .chain()
                .focus()
                .setHighlight({ color: e.target.value })
                .run()
            }
            className="w-9 h-8 bg-transparent border border-zinc-700 rounded cursor-pointer"
          />

          {/* Formatting */}
          <div className="flex gap-1">
            <ToolbarButton
              icon={<Bold size={18} />}
              onClick={() => editor.chain().focus().toggleBold().run()}
              active={editor.isActive("bold")}
            />
            <ToolbarButton
              icon={<Italic size={18} />}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              active={editor.isActive("italic")}
            />
            <ToolbarButton
              icon={<Underline size={18} />}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              active={editor.isActive("underline")}
            />
            <ToolbarButton
              icon={<Strikethrough size={18} />}
              onClick={() => editor.chain().focus().toggleStrike().run()}
              active={editor.isActive("strike")}
            />
          </div>

          {/* Headings */}
          <select
            onChange={(e) => {
              const level = parseInt(e.target.value);
              if (level === 0) editor.chain().focus().setParagraph().run();
              else editor.chain().focus().toggleHeading({ level }).run();
            }}
            className="bg-zinc-800 text-white px-3 py-1.5 rounded-lg border border-zinc-700"
          >
            <option value="0">Paragraph</option>
            <option value="1">H1</option>
            <option value="2">H2</option>
            <option value="3">H3</option>
          </select>

          {/* Lists */}
          <ToolbarButton
            icon={<List size={18} />}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
          />
          <ToolbarButton
            icon={<ListOrdered size={18} />}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
          />

          {/* Alignment */}
          <ToolbarButton
            icon={<AlignLeft size={18} />}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          />
          <ToolbarButton
            icon={<AlignCenter size={18} />}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          />
          <ToolbarButton
            icon={<AlignRight size={18} />}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          />
          <ToolbarButton
            icon={<AlignJustify size={18} />}
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          />

          {/* Extras */}
          <ToolbarButton icon={<LinkIcon size={18} />} onClick={setLink} />
          <ToolbarButton icon={<ImageIcon size={18} />} onClick={addImage} />
          <ToolbarButton
            icon={<Code size={18} />}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          />

          <div className="flex-1" />

          <ToolbarButton
            icon={<Undo size={18} />}
            onClick={() => editor.chain().focus().undo().run()}
          />
          <ToolbarButton
            icon={<Redo size={18} />}
            onClick={() => editor.chain().focus().redo().run()}
          />
          <ToolbarButton
            icon={
              isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />
            }
            onClick={() => setIsFullscreen(!isFullscreen)}
          />
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-auto bg-zinc-900 p-8">
          <EditorContent
            editor={editor}
            className="prose prose-invert max-w-none focus:outline-none min-h-[500px] text-white"
          />
        </div>
      </div>
    </div>
  );
}

function ToolbarButton({ icon, onClick, active = false }) {
  return (
    <button
      onClick={onClick}
      className={`p-2.5 rounded-xl transition-all ${
        active
          ? "bg-zinc-700 text-white"
          : "hover:bg-zinc-800 text-zinc-300 hover:text-white"
      }`}
    >
      {icon}
    </button>
  );
}
