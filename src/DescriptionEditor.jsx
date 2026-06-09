// import React, { useEffect, useRef, useState } from "react";
// import { useEditor, EditorContent } from "@tiptap/react";

// // Extensions
// import StarterKit from "@tiptap/starter-kit";
// import Placeholder from "@tiptap/extension-placeholder";
// import Underline from "@tiptap/extension-underline";
// import Link from "@tiptap/extension-link";
// import Image from "@tiptap/extension-image";
// import TextAlign from "@tiptap/extension-text-align";
// import { TextStyle } from "@tiptap/extension-text-style";
// import Color from "@tiptap/extension-color";
// import Highlight from "@tiptap/extension-highlight";
// import FontFamily from "@tiptap/extension-font-family";

// // Lists
// import BulletList from "@tiptap/extension-bullet-list";
// import OrderedList from "@tiptap/extension-ordered-list";
// import ListItem from "@tiptap/extension-list-item";

// // Table
// import { Table } from "@tiptap/extension-table";
// import { TableRow } from "@tiptap/extension-table-row";
// import { TableHeader } from "@tiptap/extension-table-header";
// import { TableCell } from "@tiptap/extension-table-cell";

// // Icons
// import {
//   Bold,
//   Italic,
//   Underline as UnderlineIcon,
//   Strikethrough,
//   Undo,
//   Redo,
//   AlignLeft,
//   AlignCenter,
//   AlignRight,
//   AlignJustify,
//   List,
//   ListOrdered,
//   Link2,
//   ImagePlus,
//   Table2,
//   Highlighter,
//   Eye,
//   Edit3,
//   Save,
// } from "lucide-react";

// const fonts = [
//   "Arial",
//   "Calibri",
//   "Times New Roman",
//   "Verdana",
//   "Georgia",
//   "Courier New",
// ];

// const fontSizes = [
//   "12px",
//   "14px",
//   "16px",
//   "18px",
//   "20px",
//   "24px",
//   "28px",
//   "32px",
// ];

// const DescriptionEditor = ({
//   value = "",
//   onChange,
//   placeholder = "Write content...",
//   onSubmit,
// }) => {
//   const [fontSize, setFontSize] = useState("16px");
//   const [isPreviewMode, setIsPreviewMode] = useState(false);
//   const [submittedContent, setSubmittedContent] = useState("");
//   const fileInputRef = useRef(null);

//   const editor = useEditor({
//     extensions: [
//       StarterKit.configure({
//         bulletList: false,
//         orderedList: false,
//         listItem: false,
//       }),
//       Placeholder.configure({ placeholder }),
//       Underline,
//       Link.configure({
//         openOnClick: false,
//         HTMLAttributes: { class: "text-blue-600 underline" },
//       }),
//       Image.configure({ inline: true, allowBase64: true }),
//       TextStyle.configure({
//         HTMLAttributes: { style: "" }, // Important for font-size
//       }),
//       Color,
//       Highlight,
//       FontFamily,
//       TextAlign.configure({ types: ["heading", "paragraph"] }),

//       BulletList.configure({ HTMLAttributes: { class: "list-disc pl-6" } }),
//       OrderedList.configure({ HTMLAttributes: { class: "list-decimal pl-6" } }),
//       ListItem,

//       Table.configure({ resizable: true }),
//       TableRow,
//       TableHeader,
//       TableCell,
//     ],

//     content: value,

//     onUpdate: ({ editor }) => {
//       onChange?.(editor.getHTML());
//     },

//     editorProps: {
//       attributes: {
//         class: "prose max-w-none min-h-[350px] p-5 focus:outline-none",
//       },
//     },
//   });

//   // Sync external value
//   useEffect(() => {
//     if (editor && value !== editor.getHTML()) {
//       editor.commands.setContent(value);
//     }
//   }, [value, editor]);

//   // Update font size dropdown like CKEditor (on selection change)
//   useEffect(() => {
//     if (!editor) return;

//     const updateFontSize = () => {
//       const attrs = editor.getAttributes("textStyle") || {};
//       const style = attrs.style || "";
//       const match = style.match(/font-size:\s*([\d]+px)/i);

//       setFontSize(match ? match[1] : "16px");
//     };

//     editor.on("selectionUpdate", updateFontSize);
//     editor.on("update", updateFontSize);

//     return () => {
//       editor.off("selectionUpdate", updateFontSize);
//       editor.off("update", updateFontSize);
//     };
//   }, [editor]);

//   const handleSubmit = () => {
//     if (!editor) return;
//     const html = editor.getHTML();
//     setSubmittedContent(html);
//     onSubmit?.(html);
//     setIsPreviewMode(true);
//   };

//   if (!editor) return null;

//   const ToolbarButton = ({ onClick, active, children }) => (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`h-8 min-w-8 px-2 flex items-center justify-center border text-sm
//         ${active ? "bg-[#dbeafe] border-[#93c5fd] text-blue-700" : "bg-white hover:bg-gray-100 border-gray-300"}`}
//     >
//       {children}
//     </button>
//   );

//   // Fixed Font Size Function
//   const changeFontSize = (size) => {
//     setFontSize(size);
//     editor
//       .chain()
//       .focus()
//       .setMark("textStyle", { style: `font-size: ${size}` })
//       .run();
//   };

//   const addLink = () => {
//     if (!editor) return;
//     const previousUrl = editor.getAttributes("link").href;
//     const url = prompt(
//       previousUrl
//         ? `Current URL: ${previousUrl}\n\nEnter new URL (or leave empty to remove):`
//         : "Enter URL:",
//       previousUrl || "https://",
//     );

//     if (url === null) return;
//     if (!url || url === "https://") {
//       editor.chain().focus().unsetLink().run();
//     } else {
//       editor.chain().focus().setLink({ href: url }).run();
//     }
//   };

//   const openImageUpload = () => fileInputRef.current?.click();

//   const handleImageUpload = (event) => {
//     const file = event.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => {
//       if (typeof reader.result === "string") {
//         editor.chain().focus().setImage({ src: reader.result }).run();
//       }
//     };
//     reader.readAsDataURL(file);
//     event.target.value = "";
//   };

//   return (
//     <div className="border border-gray-300 bg-white overflow-hidden rounded-lg">
//       {/* Top Bar */}
//       <div className="border-b bg-[#f3f3f3] flex items-center justify-between px-3 py-2">
//         <div className="flex items-center gap-1">
//           <button
//             onClick={() => setIsPreviewMode(false)}
//             className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${!isPreviewMode ? "bg-white shadow-sm border border-gray-300" : "hover:bg-gray-100"}`}
//           >
//             <Edit3 size={18} /> Edit
//           </button>
//           <button
//             onClick={() => setIsPreviewMode(true)}
//             className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${isPreviewMode ? "bg-white shadow-sm border border-gray-300" : "hover:bg-gray-100"}`}
//           >
//             <Eye size={18} /> Preview
//           </button>
//         </div>

//         <button
//           onClick={handleSubmit}
//           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
//         >
//           <Save size={18} /> Submit
//         </button>
//       </div>

//       <div className="min-h-[400px]">
//         {!isPreviewMode ? (
//           <>
//             {/* Toolbar */}
//             <div className="border-b bg-[#f3f3f3] p-2 flex flex-wrap items-center gap-1">
//               {/* Font Family */}
//               <select
//                 className="h-8 border border-gray-400 px-2 text-sm bg-white rounded"
//                 onChange={(e) =>
//                   editor.chain().focus().setFontFamily(e.target.value).run()
//                 }
//               >
//                 {fonts.map((font) => (
//                   <option key={font} value={font}>
//                     {font}
//                   </option>
//                 ))}
//               </select>

//               {/* Font Size - FIXED LIKE CKEDITOR */}
//               <select
//                 value={fontSize}
//                 onChange={(e) => changeFontSize(e.target.value)}
//                 className="h-8 border border-gray-400 px-2 text-sm bg-white rounded"
//               >
//                 {fontSizes.map((size) => (
//                   <option key={size} value={size}>
//                     {size}
//                   </option>
//                 ))}
//               </select>

//               {/* Other Toolbar Buttons */}
//               <ToolbarButton
//                 active={editor.isActive("bold")}
//                 onClick={() => editor.chain().focus().toggleBold().run()}
//               >
//                 <Bold size={16} />
//               </ToolbarButton>

//               <ToolbarButton
//                 active={editor.isActive("italic")}
//                 onClick={() => editor.chain().focus().toggleItalic().run()}
//               >
//                 <Italic size={16} />
//               </ToolbarButton>

//               <ToolbarButton
//                 active={editor.isActive("underline")}
//                 onClick={() => editor.chain().focus().toggleUnderline().run()}
//               >
//                 <UnderlineIcon size={16} />
//               </ToolbarButton>

//               <ToolbarButton
//                 active={editor.isActive("strike")}
//                 onClick={() => editor.chain().focus().toggleStrike().run()}
//               >
//                 <Strikethrough size={16} />
//               </ToolbarButton>

//               <input
//                 type="color"
//                 onInput={(e) =>
//                   editor.chain().focus().setColor(e.target.value).run()
//                 }
//                 className="w-8 h-8 border cursor-pointer rounded"
//               />

//               <ToolbarButton
//                 active={editor.isActive("highlight")}
//                 onClick={() => editor.chain().focus().toggleHighlight().run()}
//               >
//                 <Highlighter size={16} />
//               </ToolbarButton>

//               {/* Alignment, Lists, Link, Image, Table, Undo/Redo... (same as before) */}
//               <ToolbarButton
//                 active={editor.isActive({ textAlign: "left" })}
//                 onClick={() =>
//                   editor.chain().focus().setTextAlign("left").run()
//                 }
//               >
//                 <AlignLeft size={16} />
//               </ToolbarButton>
//               <ToolbarButton
//                 active={editor.isActive({ textAlign: "center" })}
//                 onClick={() =>
//                   editor.chain().focus().setTextAlign("center").run()
//                 }
//               >
//                 <AlignCenter size={16} />
//               </ToolbarButton>
//               <ToolbarButton
//                 active={editor.isActive({ textAlign: "right" })}
//                 onClick={() =>
//                   editor.chain().focus().setTextAlign("right").run()
//                 }
//               >
//                 <AlignRight size={16} />
//               </ToolbarButton>
//               <ToolbarButton
//                 active={editor.isActive({ textAlign: "justify" })}
//                 onClick={() =>
//                   editor.chain().focus().setTextAlign("justify").run()
//                 }
//               >
//                 <AlignJustify size={16} />
//               </ToolbarButton>

//               <ToolbarButton
//                 active={editor.isActive("bulletList")}
//                 onClick={() => editor.chain().focus().toggleBulletList().run()}
//               >
//                 <List size={16} />
//               </ToolbarButton>
//               <ToolbarButton
//                 active={editor.isActive("orderedList")}
//                 onClick={() => editor.chain().focus().toggleOrderedList().run()}
//               >
//                 <ListOrdered size={16} />
//               </ToolbarButton>

//               <ToolbarButton active={editor.isActive("link")} onClick={addLink}>
//                 <Link2 size={16} />
//               </ToolbarButton>

//               <ToolbarButton onClick={openImageUpload}>
//                 <ImagePlus size={16} />
//               </ToolbarButton>
//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleImageUpload}
//               />

//               <ToolbarButton
//                 onClick={() =>
//                   editor
//                     .chain()
//                     .focus()
//                     .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
//                     .run()
//                 }
//               >
//                 <Table2 size={16} />
//               </ToolbarButton>

//               <ToolbarButton
//                 onClick={() => editor.chain().focus().undo().run()}
//               >
//                 <Undo size={16} />
//               </ToolbarButton>
//               <ToolbarButton
//                 onClick={() => editor.chain().focus().redo().run()}
//               >
//                 <Redo size={16} />
//               </ToolbarButton>
//             </div>

//             <EditorContent editor={editor} />
//           </>
//         ) : (
//           <div className="p-8 prose max-w-none bg-white min-h-[400px]">
//             <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
//           </div>
//         )}
//       </div>

//       {submittedContent && (
//         <div className="border-t bg-gray-50 p-6">
//           <h3 className="text-lg font-semibold mb-3 text-gray-700">
//             Submitted Content:
//           </h3>
//           <div
//             className="prose max-w-none bg-white p-6 border rounded-lg"
//             dangerouslySetInnerHTML={{ __html: submittedContent }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default DescriptionEditor;

import React, { useEffect, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { Extension } from "@tiptap/core";

// Extensions
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";

// Lists
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

// Table
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";

// Icons
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Link2,
  ImagePlus,
  Table2,
  Highlighter,
  Eye,
  Edit3,
  Save,
} from "lucide-react";

// ✅ Custom FontSize Extension — yahi asli fix hai
const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return { types: ["textStyle"] };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize: null }).run();
        },
    };
  },
});

const fonts = [
  "Arial",
  "Calibri",
  "Times New Roman",
  "Verdana",
  "Georgia",
  "Courier New",
];

const fontSizes = [
  "12px",
  "14px",
  "16px",
  "18px",
  "20px",
  "24px",
  "28px",
  "32px",
];

const DescriptionEditor = ({
  value = "",
  onChange,
  placeholder = "Write content...",
  onSubmit,
}) => {
  const [fontSize, setFontSize] = useState("16px");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [submittedContent, setSubmittedContent] = useState("");
  const fileInputRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      Placeholder.configure({ placeholder }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-blue-600 underline" },
      }),
      Image.configure({ inline: true, allowBase64: true }),
      TextStyle, // ✅ FontSize ke liye zaroori base
      FontSize,  // ✅ Custom extension
      Color,
      Highlight,
      FontFamily,
      TextAlign.configure({ types: ["heading", "paragraph"] }),

      BulletList.configure({ HTMLAttributes: { class: "list-disc pl-6" } }),
      OrderedList.configure({ HTMLAttributes: { class: "list-decimal pl-6" } }),
      ListItem,

      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],

    content: value,

    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },

    editorProps: {
      attributes: {
        class: "prose max-w-none min-h-[350px] p-5 focus:outline-none",
      },
    },
  });

  // Sync external value
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  // ✅ Selection change pe font size dropdown update karo
  useEffect(() => {
    if (!editor) return;

    const updateFontSize = () => {
      const attrs = editor.getAttributes("textStyle");
      setFontSize(attrs.fontSize || "16px");
    };

    editor.on("selectionUpdate", updateFontSize);
    editor.on("update", updateFontSize);

    return () => {
      editor.off("selectionUpdate", updateFontSize);
      editor.off("update", updateFontSize);
    };
  }, [editor]);

  const handleSubmit = () => {
    if (!editor) return;
    const html = editor.getHTML();
    setSubmittedContent(html);
    onSubmit?.(html);
    setIsPreviewMode(true);
  };

  if (!editor) return null;

  const ToolbarButton = ({ onClick, active, children }) => (
    <button
      type="button"
      onClick={onClick}
      className={`h-8 min-w-8 px-2 flex items-center justify-center border text-sm
        ${active ? "bg-[#dbeafe] border-[#93c5fd] text-blue-700" : "bg-white hover:bg-gray-100 border-gray-300"}`}
    >
      {children}
    </button>
  );

  // ✅ Font Size change — ab setFontSize command use hogi
  const changeFontSize = (size) => {
    setFontSize(size);
    editor.chain().focus().setFontSize(size).run();
  };

  const addLink = () => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = prompt(
      previousUrl
        ? `Current URL: ${previousUrl}\n\nEnter new URL (or leave empty to remove):`
        : "Enter URL:",
      previousUrl || "https://",
    );

    if (url === null) return;
    if (!url || url === "https://") {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const openImageUpload = () => fileInputRef.current?.click();

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        editor.chain().focus().setImage({ src: reader.result }).run();
      }
    };
    reader.readAsDataURL(file);
    event.target.value = "";
  };

  return (
    <div className="border border-gray-300 bg-white overflow-hidden rounded-lg">
      {/* Top Bar */}
      <div className="border-b bg-[#f3f3f3] flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsPreviewMode(false)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${!isPreviewMode ? "bg-white shadow-sm border border-gray-300" : "hover:bg-gray-100"}`}
          >
            <Edit3 size={18} /> Edit
          </button>
          <button
            onClick={() => setIsPreviewMode(true)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${isPreviewMode ? "bg-white shadow-sm border border-gray-300" : "hover:bg-gray-100"}`}
          >
            <Eye size={18} /> Preview
          </button>
        </div>

        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
        >
          <Save size={18} /> Submit
        </button>
      </div>

      <div className="min-h-[400px]">
        {!isPreviewMode ? (
          <>
            {/* Toolbar */}
            <div className="border-b bg-[#f3f3f3] p-2 flex flex-wrap items-center gap-1">
              {/* Font Family */}
              <select
                className="h-8 border border-gray-400 px-2 text-sm bg-white rounded"
                onChange={(e) =>
                  editor.chain().focus().setFontFamily(e.target.value).run()
                }
              >
                {fonts.map((font) => (
                  <option key={font} value={font}>
                    {font}
                  </option>
                ))}
              </select>

              {/* ✅ Font Size Dropdown — ab kaam karega */}
              <select
                value={fontSize}
                onChange={(e) => changeFontSize(e.target.value)}
                className="h-8 border border-gray-400 px-2 text-sm bg-white rounded"
              >
                {fontSizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>

              <ToolbarButton
                active={editor.isActive("bold")}
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <Bold size={16} />
              </ToolbarButton>

              <ToolbarButton
                active={editor.isActive("italic")}
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <Italic size={16} />
              </ToolbarButton>

              <ToolbarButton
                active={editor.isActive("underline")}
                onClick={() => editor.chain().focus().toggleUnderline().run()}
              >
                <UnderlineIcon size={16} />
              </ToolbarButton>

              <ToolbarButton
                active={editor.isActive("strike")}
                onClick={() => editor.chain().focus().toggleStrike().run()}
              >
                <Strikethrough size={16} />
              </ToolbarButton>

              <input
                type="color"
                onInput={(e) =>
                  editor.chain().focus().setColor(e.target.value).run()
                }
                className="w-8 h-8 border cursor-pointer rounded"
              />

              <ToolbarButton
                active={editor.isActive("highlight")}
                onClick={() => editor.chain().focus().toggleHighlight().run()}
              >
                <Highlighter size={16} />
              </ToolbarButton>

              <ToolbarButton
                active={editor.isActive({ textAlign: "left" })}
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
              >
                <AlignLeft size={16} />
              </ToolbarButton>
              <ToolbarButton
                active={editor.isActive({ textAlign: "center" })}
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
              >
                <AlignCenter size={16} />
              </ToolbarButton>
              <ToolbarButton
                active={editor.isActive({ textAlign: "right" })}
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
              >
                <AlignRight size={16} />
              </ToolbarButton>
              <ToolbarButton
                active={editor.isActive({ textAlign: "justify" })}
                onClick={() =>
                  editor.chain().focus().setTextAlign("justify").run()
                }
              >
                <AlignJustify size={16} />
              </ToolbarButton>

              <ToolbarButton
                active={editor.isActive("bulletList")}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <List size={16} />
              </ToolbarButton>
              <ToolbarButton
                active={editor.isActive("orderedList")}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <ListOrdered size={16} />
              </ToolbarButton>

              <ToolbarButton active={editor.isActive("link")} onClick={addLink}>
                <Link2 size={16} />
              </ToolbarButton>

              <ToolbarButton onClick={openImageUpload}>
                <ImagePlus size={16} />
              </ToolbarButton>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />

              <ToolbarButton
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                    .run()
                }
              >
                <Table2 size={16} />
              </ToolbarButton>

              <ToolbarButton
                onClick={() => editor.chain().focus().undo().run()}
              >
                <Undo size={16} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().redo().run()}
              >
                <Redo size={16} />
              </ToolbarButton>
            </div>

            <EditorContent editor={editor} />
          </>
        ) : (
          <div className="p-8 prose max-w-none bg-white min-h-[400px]">
            <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
          </div>
        )}
      </div>

      {submittedContent && (
        <div className="border-t bg-gray-50 p-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">
            Submitted Content:
          </h3>
          <div
            className="prose max-w-none bg-white p-6 border rounded-lg"
            dangerouslySetInnerHTML={{ __html: submittedContent }}
          />
        </div>
      )}
    </div>
  );
};


export default DescriptionEditor;