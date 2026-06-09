// // // // import React, { useEffect, useRef, useState } from "react";
// // // // import { useEditor, EditorContent } from "@tiptap/react";

// // // // // Extensions
// // // // import StarterKit from "@tiptap/starter-kit";
// // // // import Placeholder from "@tiptap/extension-placeholder";
// // // // import Underline from "@tiptap/extension-underline";
// // // // import Link from "@tiptap/extension-link";
// // // // import Image from "@tiptap/extension-image";
// // // // import TextAlign from "@tiptap/extension-text-align";
// // // // import { TextStyle } from "@tiptap/extension-text-style";
// // // // import Color from "@tiptap/extension-color";
// // // // import Highlight from "@tiptap/extension-highlight";
// // // // import FontFamily from "@tiptap/extension-font-family";

// // // // // Lists
// // // // import BulletList from "@tiptap/extension-bullet-list";
// // // // import OrderedList from "@tiptap/extension-ordered-list";
// // // // import ListItem from "@tiptap/extension-list-item";

// // // // // Table
// // // // import { Table } from "@tiptap/extension-table";
// // // // import { TableRow } from "@tiptap/extension-table-row";
// // // // import { TableHeader } from "@tiptap/extension-table-header";
// // // // import { TableCell } from "@tiptap/extension-table-cell";

// // // // // Icons
// // // // import {
// // // //   Bold,
// // // //   Italic,
// // // //   Underline as UnderlineIcon,
// // // //   Strikethrough,
// // // //   Undo,
// // // //   Redo,
// // // //   AlignLeft,
// // // //   AlignCenter,
// // // //   AlignRight,
// // // //   AlignJustify,
// // // //   List,
// // // //   ListOrdered,
// // // //   Link2,
// // // //   ImagePlus,
// // // //   Table2,
// // // //   Highlighter,
// // // //   Eye,
// // // //   Edit3,
// // // //   Save,
// // // // } from "lucide-react";

// // // // const fonts = [
// // // //   "Arial",
// // // //   "Calibri",
// // // //   "Times New Roman",
// // // //   "Verdana",
// // // //   "Georgia",
// // // //   "Courier New",
// // // // ];

// // // // const fontSizes = [
// // // //   "12px",
// // // //   "14px",
// // // //   "16px",
// // // //   "18px",
// // // //   "20px",
// // // //   "24px",
// // // //   "28px",
// // // //   "32px",
// // // // ];

// // // // const DescriptionEditor = ({
// // // //   value = "",
// // // //   onChange,
// // // //   placeholder = "Write content...",
// // // //   onSubmit,
// // // // }) => {
// // // //   const [fontSize, setFontSize] = useState("16px");
// // // //   const [isPreviewMode, setIsPreviewMode] = useState(false);
// // // //   const [submittedContent, setSubmittedContent] = useState("");
// // // //   const fileInputRef = useRef(null);

// // // //   const editor = useEditor({
// // // //     extensions: [
// // // //       StarterKit.configure({
// // // //         bulletList: false,
// // // //         orderedList: false,
// // // //         listItem: false,
// // // //       }),
// // // //       Placeholder.configure({ placeholder }),
// // // //       Underline,
// // // //       Link.configure({
// // // //         openOnClick: false,
// // // //         HTMLAttributes: { class: "text-blue-600 underline" },
// // // //       }),
// // // //       Image.configure({ inline: true, allowBase64: true }),
// // // //       TextStyle.configure({
// // // //         HTMLAttributes: { style: "" }, // Important for font-size
// // // //       }),
// // // //       Color,
// // // //       Highlight,
// // // //       FontFamily,
// // // //       TextAlign.configure({ types: ["heading", "paragraph"] }),

// // // //       BulletList.configure({ HTMLAttributes: { class: "list-disc pl-6" } }),
// // // //       OrderedList.configure({ HTMLAttributes: { class: "list-decimal pl-6" } }),
// // // //       ListItem,

// // // //       Table.configure({ resizable: true }),
// // // //       TableRow,
// // // //       TableHeader,
// // // //       TableCell,
// // // //     ],

// // // //     content: value,

// // // //     onUpdate: ({ editor }) => {
// // // //       onChange?.(editor.getHTML());
// // // //     },

// // // //     editorProps: {
// // // //       attributes: {
// // // //         class: "prose max-w-none min-h-[350px] p-5 focus:outline-none",
// // // //       },
// // // //     },
// // // //   });

// // // //   // Sync external value
// // // //   useEffect(() => {
// // // //     if (editor && value !== editor.getHTML()) {
// // // //       editor.commands.setContent(value);
// // // //     }
// // // //   }, [value, editor]);

// // // //   // Update font size dropdown like CKEditor (on selection change)
// // // //   useEffect(() => {
// // // //     if (!editor) return;

// // // //     const updateFontSize = () => {
// // // //       const attrs = editor.getAttributes("textStyle") || {};
// // // //       const style = attrs.style || "";
// // // //       const match = style.match(/font-size:\s*([\d]+px)/i);

// // // //       setFontSize(match ? match[1] : "16px");
// // // //     };

// // // //     editor.on("selectionUpdate", updateFontSize);
// // // //     editor.on("update", updateFontSize);

// // // //     return () => {
// // // //       editor.off("selectionUpdate", updateFontSize);
// // // //       editor.off("update", updateFontSize);
// // // //     };
// // // //   }, [editor]);

// // // //   const handleSubmit = () => {
// // // //     if (!editor) return;
// // // //     const html = editor.getHTML();
// // // //     setSubmittedContent(html);
// // // //     onSubmit?.(html);
// // // //     setIsPreviewMode(true);
// // // //   };

// // // //   if (!editor) return null;

// // // //   const ToolbarButton = ({ onClick, active, children }) => (
// // // //     <button
// // // //       type="button"
// // // //       onClick={onClick}
// // // //       className={`h-8 min-w-8 px-2 flex items-center justify-center border text-sm
// // // //         ${active ? "bg-[#dbeafe] border-[#93c5fd] text-blue-700" : "bg-white hover:bg-gray-100 border-gray-300"}`}
// // // //     >
// // // //       {children}
// // // //     </button>
// // // //   );

// // // //   // Fixed Font Size Function
// // // //   const changeFontSize = (size) => {
// // // //     setFontSize(size);
// // // //     editor
// // // //       .chain()
// // // //       .focus()
// // // //       .setMark("textStyle", { style: `font-size: ${size}` })
// // // //       .run();
// // // //   };

// // // //   const addLink = () => {
// // // //     if (!editor) return;
// // // //     const previousUrl = editor.getAttributes("link").href;
// // // //     const url = prompt(
// // // //       previousUrl
// // // //         ? `Current URL: ${previousUrl}\n\nEnter new URL (or leave empty to remove):`
// // // //         : "Enter URL:",
// // // //       previousUrl || "https://",
// // // //     );

// // // //     if (url === null) return;
// // // //     if (!url || url === "https://") {
// // // //       editor.chain().focus().unsetLink().run();
// // // //     } else {
// // // //       editor.chain().focus().setLink({ href: url }).run();
// // // //     }
// // // //   };

// // // //   const openImageUpload = () => fileInputRef.current?.click();

// // // //   const handleImageUpload = (event) => {
// // // //     const file = event.target.files?.[0];
// // // //     if (!file) return;
// // // //     const reader = new FileReader();
// // // //     reader.onload = () => {
// // // //       if (typeof reader.result === "string") {
// // // //         editor.chain().focus().setImage({ src: reader.result }).run();
// // // //       }
// // // //     };
// // // //     reader.readAsDataURL(file);
// // // //     event.target.value = "";
// // // //   };

// // // //   return (
// // // //     <div className="border border-gray-300 bg-white overflow-hidden rounded-lg">
// // // //       {/* Top Bar */}
// // // //       <div className="border-b bg-[#f3f3f3] flex items-center justify-between px-3 py-2">
// // // //         <div className="flex items-center gap-1">
// // // //           <button
// // // //             onClick={() => setIsPreviewMode(false)}
// // // //             className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${!isPreviewMode ? "bg-white shadow-sm border border-gray-300" : "hover:bg-gray-100"}`}
// // // //           >
// // // //             <Edit3 size={18} /> Edit
// // // //           </button>
// // // //           <button
// // // //             onClick={() => setIsPreviewMode(true)}
// // // //             className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${isPreviewMode ? "bg-white shadow-sm border border-gray-300" : "hover:bg-gray-100"}`}
// // // //           >
// // // //             <Eye size={18} /> Preview
// // // //           </button>
// // // //         </div>

// // // //         <button
// // // //           onClick={handleSubmit}
// // // //           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
// // // //         >
// // // //           <Save size={18} /> Submit
// // // //         </button>
// // // //       </div>

// // // //       <div className="min-h-[400px]">
// // // //         {!isPreviewMode ? (
// // // //           <>
// // // //             {/* Toolbar */}
// // // //             <div className="border-b bg-[#f3f3f3] p-2 flex flex-wrap items-center gap-1">
// // // //               {/* Font Family */}
// // // //               <select
// // // //                 className="h-8 border border-gray-400 px-2 text-sm bg-white rounded"
// // // //                 onChange={(e) =>
// // // //                   editor.chain().focus().setFontFamily(e.target.value).run()
// // // //                 }
// // // //               >
// // // //                 {fonts.map((font) => (
// // // //                   <option key={font} value={font}>
// // // //                     {font}
// // // //                   </option>
// // // //                 ))}
// // // //               </select>

// // // //               {/* Font Size - FIXED LIKE CKEDITOR */}
// // // //               <select
// // // //                 value={fontSize}
// // // //                 onChange={(e) => changeFontSize(e.target.value)}
// // // //                 className="h-8 border border-gray-400 px-2 text-sm bg-white rounded"
// // // //               >
// // // //                 {fontSizes.map((size) => (
// // // //                   <option key={size} value={size}>
// // // //                     {size}
// // // //                   </option>
// // // //                 ))}
// // // //               </select>

// // // //               {/* Other Toolbar Buttons */}
// // // //               <ToolbarButton
// // // //                 active={editor.isActive("bold")}
// // // //                 onClick={() => editor.chain().focus().toggleBold().run()}
// // // //               >
// // // //                 <Bold size={16} />
// // // //               </ToolbarButton>

// // // //               <ToolbarButton
// // // //                 active={editor.isActive("italic")}
// // // //                 onClick={() => editor.chain().focus().toggleItalic().run()}
// // // //               >
// // // //                 <Italic size={16} />
// // // //               </ToolbarButton>

// // // //               <ToolbarButton
// // // //                 active={editor.isActive("underline")}
// // // //                 onClick={() => editor.chain().focus().toggleUnderline().run()}
// // // //               >
// // // //                 <UnderlineIcon size={16} />
// // // //               </ToolbarButton>

// // // //               <ToolbarButton
// // // //                 active={editor.isActive("strike")}
// // // //                 onClick={() => editor.chain().focus().toggleStrike().run()}
// // // //               >
// // // //                 <Strikethrough size={16} />
// // // //               </ToolbarButton>

// // // //               <input
// // // //                 type="color"
// // // //                 onInput={(e) =>
// // // //                   editor.chain().focus().setColor(e.target.value).run()
// // // //                 }
// // // //                 className="w-8 h-8 border cursor-pointer rounded"
// // // //               />

// // // //               <ToolbarButton
// // // //                 active={editor.isActive("highlight")}
// // // //                 onClick={() => editor.chain().focus().toggleHighlight().run()}
// // // //               >
// // // //                 <Highlighter size={16} />
// // // //               </ToolbarButton>

// // // //               {/* Alignment, Lists, Link, Image, Table, Undo/Redo... (same as before) */}
// // // //               <ToolbarButton
// // // //                 active={editor.isActive({ textAlign: "left" })}
// // // //                 onClick={() =>
// // // //                   editor.chain().focus().setTextAlign("left").run()
// // // //                 }
// // // //               >
// // // //                 <AlignLeft size={16} />
// // // //               </ToolbarButton>
// // // //               <ToolbarButton
// // // //                 active={editor.isActive({ textAlign: "center" })}
// // // //                 onClick={() =>
// // // //                   editor.chain().focus().setTextAlign("center").run()
// // // //                 }
// // // //               >
// // // //                 <AlignCenter size={16} />
// // // //               </ToolbarButton>
// // // //               <ToolbarButton
// // // //                 active={editor.isActive({ textAlign: "right" })}
// // // //                 onClick={() =>
// // // //                   editor.chain().focus().setTextAlign("right").run()
// // // //                 }
// // // //               >
// // // //                 <AlignRight size={16} />
// // // //               </ToolbarButton>
// // // //               <ToolbarButton
// // // //                 active={editor.isActive({ textAlign: "justify" })}
// // // //                 onClick={() =>
// // // //                   editor.chain().focus().setTextAlign("justify").run()
// // // //                 }
// // // //               >
// // // //                 <AlignJustify size={16} />
// // // //               </ToolbarButton>

// // // //               <ToolbarButton
// // // //                 active={editor.isActive("bulletList")}
// // // //                 onClick={() => editor.chain().focus().toggleBulletList().run()}
// // // //               >
// // // //                 <List size={16} />
// // // //               </ToolbarButton>
// // // //               <ToolbarButton
// // // //                 active={editor.isActive("orderedList")}
// // // //                 onClick={() => editor.chain().focus().toggleOrderedList().run()}
// // // //               >
// // // //                 <ListOrdered size={16} />
// // // //               </ToolbarButton>

// // // //               <ToolbarButton active={editor.isActive("link")} onClick={addLink}>
// // // //                 <Link2 size={16} />
// // // //               </ToolbarButton>

// // // //               <ToolbarButton onClick={openImageUpload}>
// // // //                 <ImagePlus size={16} />
// // // //               </ToolbarButton>
// // // //               <input
// // // //                 ref={fileInputRef}
// // // //                 type="file"
// // // //                 accept="image/*"
// // // //                 className="hidden"
// // // //                 onChange={handleImageUpload}
// // // //               />

// // // //               <ToolbarButton
// // // //                 onClick={() =>
// // // //                   editor
// // // //                     .chain()
// // // //                     .focus()
// // // //                     .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
// // // //                     .run()
// // // //                 }
// // // //               >
// // // //                 <Table2 size={16} />
// // // //               </ToolbarButton>

// // // //               <ToolbarButton
// // // //                 onClick={() => editor.chain().focus().undo().run()}
// // // //               >
// // // //                 <Undo size={16} />
// // // //               </ToolbarButton>
// // // //               <ToolbarButton
// // // //                 onClick={() => editor.chain().focus().redo().run()}
// // // //               >
// // // //                 <Redo size={16} />
// // // //               </ToolbarButton>
// // // //             </div>

// // // //             <EditorContent editor={editor} />
// // // //           </>
// // // //         ) : (
// // // //           <div className="p-8 prose max-w-none bg-white min-h-[400px]">
// // // //             <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
// // // //           </div>
// // // //         )}
// // // //       </div>

// // // //       {submittedContent && (
// // // //         <div className="border-t bg-gray-50 p-6">
// // // //           <h3 className="text-lg font-semibold mb-3 text-gray-700">
// // // //             Submitted Content:
// // // //           </h3>
// // // //           <div
// // // //             className="prose max-w-none bg-white p-6 border rounded-lg"
// // // //             dangerouslySetInnerHTML={{ __html: submittedContent }}
// // // //           />
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default DescriptionEditor;

// // // import React, { useEffect, useRef, useState } from "react";
// // // import { useEditor, EditorContent } from "@tiptap/react";
// // // import { Extension } from "@tiptap/core";

// // // // Extensions
// // // import StarterKit from "@tiptap/starter-kit";
// // // import Placeholder from "@tiptap/extension-placeholder";
// // // import Underline from "@tiptap/extension-underline";
// // // import Link from "@tiptap/extension-link";
// // // import Image from "@tiptap/extension-image";
// // // import TextAlign from "@tiptap/extension-text-align";
// // // import { TextStyle } from "@tiptap/extension-text-style";
// // // import Color from "@tiptap/extension-color";
// // // import Highlight from "@tiptap/extension-highlight";
// // // import FontFamily from "@tiptap/extension-font-family";

// // // // Lists
// // // import BulletList from "@tiptap/extension-bullet-list";
// // // import OrderedList from "@tiptap/extension-ordered-list";
// // // import ListItem from "@tiptap/extension-list-item";

// // // // Table
// // // import { Table } from "@tiptap/extension-table";
// // // import { TableRow } from "@tiptap/extension-table-row";
// // // import { TableHeader } from "@tiptap/extension-table-header";
// // // import { TableCell } from "@tiptap/extension-table-cell";

// // // // Icons
// // // import {
// // //   Bold,
// // //   Italic,
// // //   Underline as UnderlineIcon,
// // //   Strikethrough,
// // //   Undo,
// // //   Redo,
// // //   AlignLeft,
// // //   AlignCenter,
// // //   AlignRight,
// // //   AlignJustify,
// // //   List,
// // //   ListOrdered,
// // //   Link2,
// // //   ImagePlus,
// // //   Table2,
// // //   Highlighter,
// // //   Eye,
// // //   Edit3,
// // //   Save,
// // // } from "lucide-react";

// // // // ✅ Custom FontSize Extension — yahi asli fix hai
// // // const FontSize = Extension.create({
// // //   name: "fontSize",
// // //   addOptions() {
// // //     return { types: ["textStyle"] };
// // //   },
// // //   addGlobalAttributes() {
// // //     return [
// // //       {
// // //         types: this.options.types,
// // //         attributes: {
// // //           fontSize: {
// // //             default: null,
// // //             parseHTML: (element) => element.style.fontSize || null,
// // //             renderHTML: (attributes) => {
// // //               if (!attributes.fontSize) return {};
// // //               return { style: `font-size: ${attributes.fontSize}` };
// // //             },
// // //           },
// // //         },
// // //       },
// // //     ];
// // //   },
// // //   addCommands() {
// // //     return {
// // //       setFontSize:
// // //         (fontSize) =>
// // //         ({ chain }) => {
// // //           return chain().setMark("textStyle", { fontSize }).run();
// // //         },
// // //       unsetFontSize:
// // //         () =>
// // //         ({ chain }) => {
// // //           return chain().setMark("textStyle", { fontSize: null }).run();
// // //         },
// // //     };
// // //   },
// // // });

// // // const fonts = [
// // //   "Arial",
// // //   "Calibri",
// // //   "Times New Roman",
// // //   "Verdana",
// // //   "Georgia",
// // //   "Courier New",
// // // ];

// // // const fontSizes = [
// // //   "12px",
// // //   "14px",
// // //   "16px",
// // //   "18px",
// // //   "20px",
// // //   "24px",
// // //   "28px",
// // //   "32px",
// // // ];

// // // const DescriptionEditor = ({
// // //   value = "",
// // //   onChange,
// // //   placeholder = "Write content...",
// // //   onSubmit,
// // // }) => {
// // //   const [fontSize, setFontSize] = useState("16px");
// // //   const [isPreviewMode, setIsPreviewMode] = useState(false);
// // //   const [submittedContent, setSubmittedContent] = useState("");
// // //   const fileInputRef = useRef(null);

// // //   const editor = useEditor({
// // //     extensions: [
// // //       StarterKit.configure({
// // //         bulletList: false,
// // //         orderedList: false,
// // //         listItem: false,
// // //       }),
// // //       Placeholder.configure({ placeholder }),
// // //       Underline,
// // //       Link.configure({
// // //         openOnClick: false,
// // //         HTMLAttributes: { class: "text-blue-600 underline" },
// // //       }),
// // //       Image.configure({ inline: true, allowBase64: true }),
// // //       TextStyle, // ✅ FontSize ke liye zaroori base
// // //       FontSize,  // ✅ Custom extension
// // //       Color,
// // //       Highlight,
// // //       FontFamily,
// // //       TextAlign.configure({ types: ["heading", "paragraph"] }),

// // //       BulletList.configure({ HTMLAttributes: { class: "list-disc pl-6" } }),
// // //       OrderedList.configure({ HTMLAttributes: { class: "list-decimal pl-6" } }),
// // //       ListItem,

// // //       Table.configure({ resizable: true }),
// // //       TableRow,
// // //       TableHeader,
// // //       TableCell,
// // //     ],

// // //     content: value,

// // //     onUpdate: ({ editor }) => {
// // //       onChange?.(editor.getHTML());
// // //     },

// // //     editorProps: {
// // //       attributes: {
// // //         class: "prose max-w-none min-h-[350px] p-5 focus:outline-none",
// // //       },
// // //     },
// // //   });

// // //   // Sync external value
// // //   useEffect(() => {
// // //     if (editor && value !== editor.getHTML()) {
// // //       editor.commands.setContent(value);
// // //     }
// // //   }, [value, editor]);

// // //   // ✅ Selection change pe font size dropdown update karo
// // //   useEffect(() => {
// // //     if (!editor) return;

// // //     const updateFontSize = () => {
// // //       const attrs = editor.getAttributes("textStyle");
// // //       setFontSize(attrs.fontSize || "16px");
// // //     };

// // //     editor.on("selectionUpdate", updateFontSize);
// // //     editor.on("update", updateFontSize);

// // //     return () => {
// // //       editor.off("selectionUpdate", updateFontSize);
// // //       editor.off("update", updateFontSize);
// // //     };
// // //   }, [editor]);

// // //   const handleSubmit = () => {
// // //     if (!editor) return;
// // //     const html = editor.getHTML();
// // //     setSubmittedContent(html);
// // //     onSubmit?.(html);
// // //     setIsPreviewMode(true);
// // //   };

// // //   if (!editor) return null;

// // //   const ToolbarButton = ({ onClick, active, children }) => (
// // //     <button
// // //       type="button"
// // //       onClick={onClick}
// // //       className={`h-8 min-w-8 px-2 flex items-center justify-center border text-sm
// // //         ${active ? "bg-[#dbeafe] border-[#93c5fd] text-blue-700" : "bg-white hover:bg-gray-100 border-gray-300"}`}
// // //     >
// // //       {children}
// // //     </button>
// // //   );

// // //   // ✅ Font Size change — ab setFontSize command use hogi
// // //   const changeFontSize = (size) => {
// // //     setFontSize(size);
// // //     editor.chain().focus().setFontSize(size).run();
// // //   };

// // //   const addLink = () => {
// // //     if (!editor) return;
// // //     const previousUrl = editor.getAttributes("link").href;
// // //     const url = prompt(
// // //       previousUrl
// // //         ? `Current URL: ${previousUrl}\n\nEnter new URL (or leave empty to remove):`
// // //         : "Enter URL:",
// // //       previousUrl || "https://",
// // //     );

// // //     if (url === null) return;
// // //     if (!url || url === "https://") {
// // //       editor.chain().focus().unsetLink().run();
// // //     } else {
// // //       editor.chain().focus().setLink({ href: url }).run();
// // //     }
// // //   };

// // //   const openImageUpload = () => fileInputRef.current?.click();

// // //   const handleImageUpload = (event) => {
// // //     const file = event.target.files?.[0];
// // //     if (!file) return;
// // //     const reader = new FileReader();
// // //     reader.onload = () => {
// // //       if (typeof reader.result === "string") {
// // //         editor.chain().focus().setImage({ src: reader.result }).run();
// // //       }
// // //     };
// // //     reader.readAsDataURL(file);
// // //     event.target.value = "";
// // //   };

// // //   return (
// // //     <div className="border border-gray-300 bg-white overflow-hidden rounded-lg">
// // //       {/* Top Bar */}
// // //       <div className="border-b bg-[#f3f3f3] flex items-center justify-between px-3 py-2">
// // //         <div className="flex items-center gap-1">
// // //           <button
// // //             onClick={() => setIsPreviewMode(false)}
// // //             className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${!isPreviewMode ? "bg-white shadow-sm border border-gray-300" : "hover:bg-gray-100"}`}
// // //           >
// // //             <Edit3 size={18} /> Edit
// // //           </button>
// // //           <button
// // //             onClick={() => setIsPreviewMode(true)}
// // //             className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${isPreviewMode ? "bg-white shadow-sm border border-gray-300" : "hover:bg-gray-100"}`}
// // //           >
// // //             <Eye size={18} /> Preview
// // //           </button>
// // //         </div>

// // //         <button
// // //           onClick={handleSubmit}
// // //           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
// // //         >
// // //           <Save size={18} /> Submit
// // //         </button>
// // //       </div>

// // //       <div className="min-h-[400px]">
// // //         {!isPreviewMode ? (
// // //           <>
// // //             {/* Toolbar */}
// // //             <div className="border-b bg-[#f3f3f3] p-2 flex flex-wrap items-center gap-1">
// // //               {/* Font Family */}
// // //               <select
// // //                 className="h-8 border border-gray-400 px-2 text-sm bg-white rounded"
// // //                 onChange={(e) =>
// // //                   editor.chain().focus().setFontFamily(e.target.value).run()
// // //                 }
// // //               >
// // //                 {fonts.map((font) => (
// // //                   <option key={font} value={font}>
// // //                     {font}
// // //                   </option>
// // //                 ))}
// // //               </select>

// // //               {/* ✅ Font Size Dropdown — ab kaam karega */}
// // //               <select
// // //                 value={fontSize}
// // //                 onChange={(e) => changeFontSize(e.target.value)}
// // //                 className="h-8 border border-gray-400 px-2 text-sm bg-white rounded"
// // //               >
// // //                 {fontSizes.map((size) => (
// // //                   <option key={size} value={size}>
// // //                     {size}
// // //                   </option>
// // //                 ))}
// // //               </select>

// // //               <ToolbarButton
// // //                 active={editor.isActive("bold")}
// // //                 onClick={() => editor.chain().focus().toggleBold().run()}
// // //               >
// // //                 <Bold size={16} />
// // //               </ToolbarButton>

// // //               <ToolbarButton
// // //                 active={editor.isActive("italic")}
// // //                 onClick={() => editor.chain().focus().toggleItalic().run()}
// // //               >
// // //                 <Italic size={16} />
// // //               </ToolbarButton>

// // //               <ToolbarButton
// // //                 active={editor.isActive("underline")}
// // //                 onClick={() => editor.chain().focus().toggleUnderline().run()}
// // //               >
// // //                 <UnderlineIcon size={16} />
// // //               </ToolbarButton>

// // //               <ToolbarButton
// // //                 active={editor.isActive("strike")}
// // //                 onClick={() => editor.chain().focus().toggleStrike().run()}
// // //               >
// // //                 <Strikethrough size={16} />
// // //               </ToolbarButton>

// // //               <input
// // //                 type="color"
// // //                 onInput={(e) =>
// // //                   editor.chain().focus().setColor(e.target.value).run()
// // //                 }
// // //                 className="w-8 h-8 border cursor-pointer rounded"
// // //               />

// // //               <ToolbarButton
// // //                 active={editor.isActive("highlight")}
// // //                 onClick={() => editor.chain().focus().toggleHighlight().run()}
// // //               >
// // //                 <Highlighter size={16} />
// // //               </ToolbarButton>

// // //               <ToolbarButton
// // //                 active={editor.isActive({ textAlign: "left" })}
// // //                 onClick={() =>
// // //                   editor.chain().focus().setTextAlign("left").run()
// // //                 }
// // //               >
// // //                 <AlignLeft size={16} />
// // //               </ToolbarButton>
// // //               <ToolbarButton
// // //                 active={editor.isActive({ textAlign: "center" })}
// // //                 onClick={() =>
// // //                   editor.chain().focus().setTextAlign("center").run()
// // //                 }
// // //               >
// // //                 <AlignCenter size={16} />
// // //               </ToolbarButton>
// // //               <ToolbarButton
// // //                 active={editor.isActive({ textAlign: "right" })}
// // //                 onClick={() =>
// // //                   editor.chain().focus().setTextAlign("right").run()
// // //                 }
// // //               >
// // //                 <AlignRight size={16} />
// // //               </ToolbarButton>
// // //               <ToolbarButton
// // //                 active={editor.isActive({ textAlign: "justify" })}
// // //                 onClick={() =>
// // //                   editor.chain().focus().setTextAlign("justify").run()
// // //                 }
// // //               >
// // //                 <AlignJustify size={16} />
// // //               </ToolbarButton>

// // //               <ToolbarButton
// // //                 active={editor.isActive("bulletList")}
// // //                 onClick={() => editor.chain().focus().toggleBulletList().run()}
// // //               >
// // //                 <List size={16} />
// // //               </ToolbarButton>
// // //               <ToolbarButton
// // //                 active={editor.isActive("orderedList")}
// // //                 onClick={() => editor.chain().focus().toggleOrderedList().run()}
// // //               >
// // //                 <ListOrdered size={16} />
// // //               </ToolbarButton>

// // //               <ToolbarButton active={editor.isActive("link")} onClick={addLink}>
// // //                 <Link2 size={16} />
// // //               </ToolbarButton>

// // //               <ToolbarButton onClick={openImageUpload}>
// // //                 <ImagePlus size={16} />
// // //               </ToolbarButton>
// // //               <input
// // //                 ref={fileInputRef}
// // //                 type="file"
// // //                 accept="image/*"
// // //                 className="hidden"
// // //                 onChange={handleImageUpload}
// // //               />

// // //               <ToolbarButton
// // //                 onClick={() =>
// // //                   editor
// // //                     .chain()
// // //                     .focus()
// // //                     .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
// // //                     .run()
// // //                 }
// // //               >
// // //                 <Table2 size={16} />
// // //               </ToolbarButton>

// // //               <ToolbarButton
// // //                 onClick={() => editor.chain().focus().undo().run()}
// // //               >
// // //                 <Undo size={16} />
// // //               </ToolbarButton>
// // //               <ToolbarButton
// // //                 onClick={() => editor.chain().focus().redo().run()}
// // //               >
// // //                 <Redo size={16} />
// // //               </ToolbarButton>
// // //             </div>

// // //             <EditorContent editor={editor} />
// // //           </>
// // //         ) : (
// // //           <div className="p-8 prose max-w-none bg-white min-h-[400px]">
// // //             <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
// // //           </div>
// // //         )}
// // //       </div>

// // //       {submittedContent && (
// // //         <div className="border-t bg-gray-50 p-6">
// // //           <h3 className="text-lg font-semibold mb-3 text-gray-700">
// // //             Submitted Content:
// // //           </h3>
// // //           <div
// // //             className="prose max-w-none bg-white p-6 border rounded-lg"
// // //             dangerouslySetInnerHTML={{ __html: submittedContent }}
// // //           />
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };


// // // export default DescriptionEditor;
// // import React, { useEffect, useRef, useState } from "react";
// // import { useEditor, EditorContent } from "@tiptap/react";
// // import { Extension } from "@tiptap/core";

// // // Extensions
// // import StarterKit from "@tiptap/starter-kit";
// // import Placeholder from "@tiptap/extension-placeholder";
// // import Underline from "@tiptap/extension-underline";
// // import Link from "@tiptap/extension-link";
// // import Image from "@tiptap/extension-image";
// // import TextAlign from "@tiptap/extension-text-align";
// // import { TextStyle } from "@tiptap/extension-text-style";
// // import Color from "@tiptap/extension-color";
// // import Highlight from "@tiptap/extension-highlight";
// // import FontFamily from "@tiptap/extension-font-family";

// // // Lists
// // import BulletList from "@tiptap/extension-bullet-list";
// // import OrderedList from "@tiptap/extension-ordered-list";
// // import ListItem from "@tiptap/extension-list-item";

// // // Table
// // import { Table } from "@tiptap/extension-table";
// // import { TableRow } from "@tiptap/extension-table-row";
// // import { TableHeader } from "@tiptap/extension-table-header";
// // import { TableCell } from "@tiptap/extension-table-cell";

// // // Icons
// // import {
// //   Bold,
// //   Italic,
// //   Underline as UnderlineIcon,
// //   Strikethrough,
// //   Undo,
// //   Redo,
// //   AlignLeft,
// //   AlignCenter,
// //   AlignRight,
// //   AlignJustify,
// //   List,
// //   ListOrdered,
// //   Link2,
// //   ImagePlus,
// //   Table2,
// //   Highlighter,
// //   Eye,
// //   Edit3,
// //   Save,
// // } from "lucide-react";

// // // ✅ Custom FontSize Extension — yahi asli fix hai
// // const FontSize = Extension.create({
// //   name: "fontSize",
// //   addOptions() {
// //     return { types: ["textStyle"] };
// //   },
// //   addGlobalAttributes() {
// //     return [
// //       {
// //         types: this.options.types,
// //         attributes: {
// //           fontSize: {
// //             default: null,
// //             parseHTML: (element) => element.style.fontSize || null,
// //             renderHTML: (attributes) => {
// //               if (!attributes.fontSize) return {};
// //               return { style: `font-size: ${attributes.fontSize}` };
// //             },
// //           },
// //         },
// //       },
// //     ];
// //   },
// //   addCommands() {
// //     return {
// //       setFontSize:
// //         (fontSize) =>
// //         ({ chain }) => {
// //           return chain().setMark("textStyle", { fontSize }).run();
// //         },
// //       unsetFontSize:
// //         () =>
// //         ({ chain }) => {
// //           return chain().setMark("textStyle", { fontSize: null }).run();
// //         },
// //     };
// //   },
// // });

// // const fonts = [
// //   "Arial",
// //   "Calibri",
// //   "Times New Roman",
// //   "Verdana",
// //   "Georgia",
// //   "Courier New",
// // ];

// // const fontSizes = [
// //   "12px",
// //   "14px",
// //   "16px",
// //   "18px",
// //   "20px",
// //   "24px",
// //   "28px",
// //   "32px",
// // ];

// // const DescriptionEditor = ({
// //   value = "",
// //   onChange,
// //   placeholder = "Write content...",
// //   onSubmit,
// // }) => {
// //   const [fontSize, setFontSize] = useState("16px");
// //   const [isPreviewMode, setIsPreviewMode] = useState(false);
// //   const [submittedContent, setSubmittedContent] = useState("");
// //   const fileInputRef = useRef(null);

// //   const editor = useEditor({
// //     extensions: [
// //       StarterKit.configure({
// //         bulletList: false,
// //         orderedList: false,
// //         listItem: false,
// //       }),
// //       Placeholder.configure({ placeholder }),
// //       Underline,
// //       Link.configure({
// //         openOnClick: false,
// //         HTMLAttributes: { class: "text-blue-600 underline" },
// //       }),
// //       Image.configure({ inline: true, allowBase64: true }),
// //       TextStyle, // ✅ FontSize ke liye zaroori base
// //       FontSize,  // ✅ Custom extension
// //       Color,
// //       Highlight,
// //       FontFamily,
// //       TextAlign.configure({ types: ["heading", "paragraph"] }),

// //       BulletList.configure({ HTMLAttributes: { class: "list-disc pl-6" } }),
// //       OrderedList.configure({ HTMLAttributes: { class: "list-decimal pl-6" } }),
// //       ListItem,

// //       Table.configure({ resizable: true }),
// //       TableRow,
// //       TableHeader,
// //       TableCell,
// //     ],

// //     content: value,

// //     onUpdate: ({ editor }) => {
// //       onChange?.(editor.getHTML());
// //     },

// //     editorProps: {
// //       attributes: {
// //         class: "prose max-w-none min-h-[350px] p-5 focus:outline-none",
// //       },
// //     },
// //   });

// //   // Sync external value
// //   useEffect(() => {
// //     if (editor && value !== editor.getHTML()) {
// //       editor.commands.setContent(value);
// //     }
// //   }, [value, editor]);

// //   // ✅ Selected text ka font size dropdown mein dikhao
// //   useEffect(() => {
// //     if (!editor) return;

// //     const updateFontSize = () => {
// //       const { from, to, empty } = editor.state.selection;

// //       if (empty) {
// //         // Koi selection nahi — cursor position ka font size lo
// //         const attrs = editor.getAttributes("textStyle");
// //         setFontSize(attrs.fontSize || "16px");
// //       } else {
// //         // Selection hai — selected range mein pehla fontSize dhundo
// //         let detectedSize = "16px";
// //         editor.state.doc.nodesBetween(from, to, (node) => {
// //           if (detectedSize !== "16px") return false; // mil gaya, band karo
// //           if (node.isText) {
// //             node.marks.forEach((mark) => {
// //               if (mark.type.name === "textStyle" && mark.attrs.fontSize) {
// //                 detectedSize = mark.attrs.fontSize;
// //               }
// //             });
// //           }
// //         });
// //         setFontSize(detectedSize);
// //       }
// //     };

// //     editor.on("selectionUpdate", updateFontSize);
// //     editor.on("update", updateFontSize);

// //     return () => {
// //       editor.off("selectionUpdate", updateFontSize);
// //       editor.off("update", updateFontSize);
// //     };
// //   }, [editor]);

// //   const handleSubmit = () => {
// //     if (!editor) return;
// //     const html = editor.getHTML();
// //     setSubmittedContent(html);
// //     onSubmit?.(html);
// //     setIsPreviewMode(true);
// //   };

// //   if (!editor) return null;

// //   const ToolbarButton = ({ onClick, active, children }) => (
// //     <button
// //       type="button"
// //       onClick={onClick}
// //       className={`h-8 min-w-8 px-2 flex items-center justify-center border text-sm
// //         ${active ? "bg-[#dbeafe] border-[#93c5fd] text-blue-700" : "bg-white hover:bg-gray-100 border-gray-300"}`}
// //     >
// //       {children}
// //     </button>
// //   );

// //   // ✅ Font Size change — ab setFontSize command use hogi
// //   const changeFontSize = (size) => {
// //     setFontSize(size);
// //     editor.chain().focus().setFontSize(size).run();
// //   };

// //   const addLink = () => {
// //     if (!editor) return;
// //     const previousUrl = editor.getAttributes("link").href;
// //     const url = prompt(
// //       previousUrl
// //         ? `Current URL: ${previousUrl}\n\nEnter new URL (or leave empty to remove):`
// //         : "Enter URL:",
// //       previousUrl || "https://",
// //     );

// //     if (url === null) return;
// //     if (!url || url === "https://") {
// //       editor.chain().focus().unsetLink().run();
// //     } else {
// //       editor.chain().focus().setLink({ href: url }).run();
// //     }
// //   };

// //   const openImageUpload = () => fileInputRef.current?.click();

// //   const handleImageUpload = (event) => {
// //     const file = event.target.files?.[0];
// //     if (!file) return;
// //     const reader = new FileReader();
// //     reader.onload = () => {
// //       if (typeof reader.result === "string") {
// //         editor.chain().focus().setImage({ src: reader.result }).run();
// //       }
// //     };
// //     reader.readAsDataURL(file);
// //     event.target.value = "";
// //   };

// //   return (
// //     <div className="border border-gray-300 bg-white overflow-hidden rounded-lg">
// //       {/* Top Bar */}
// //       <div className="border-b bg-[#f3f3f3] flex items-center justify-between px-3 py-2">
// //         <div className="flex items-center gap-1">
// //           <button
// //             onClick={() => setIsPreviewMode(false)}
// //             className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${!isPreviewMode ? "bg-white shadow-sm border border-gray-300" : "hover:bg-gray-100"}`}
// //           >
// //             <Edit3 size={18} /> Edit
// //           </button>
// //           <button
// //             onClick={() => setIsPreviewMode(true)}
// //             className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${isPreviewMode ? "bg-white shadow-sm border border-gray-300" : "hover:bg-gray-100"}`}
// //           >
// //             <Eye size={18} /> Preview
// //           </button>
// //         </div>

// //         <button
// //           onClick={handleSubmit}
// //           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
// //         >
// //           <Save size={18} /> Submit
// //         </button>
// //       </div>

// //       <div className="min-h-[400px]">
// //         {!isPreviewMode ? (
// //           <>
// //             {/* Toolbar */}
// //             <div className="border-b bg-[#f3f3f3] p-2 flex flex-wrap items-center gap-1">
// //               {/* Font Family */}
// //               <select
// //                 className="h-8 border border-gray-400 px-2 text-sm bg-white rounded"
// //                 onChange={(e) =>
// //                   editor.chain().focus().setFontFamily(e.target.value).run()
// //                 }
// //               >
// //                 {fonts.map((font) => (
// //                   <option key={font} value={font}>
// //                     {font}
// //                   </option>
// //                 ))}
// //               </select>

// //               {/* ✅ Font Size Dropdown — ab kaam karega */}
// //               <select
// //                 value={fontSize}
// //                 onChange={(e) => changeFontSize(e.target.value)}
// //                 className="h-8 border border-gray-400 px-2 text-sm bg-white rounded"
// //               >
// //                 {fontSizes.map((size) => (
// //                   <option key={size} value={size}>
// //                     {size}
// //                   </option>
// //                 ))}
// //               </select>

// //               <ToolbarButton
// //                 active={editor.isActive("bold")}
// //                 onClick={() => editor.chain().focus().toggleBold().run()}
// //               >
// //                 <Bold size={16} />
// //               </ToolbarButton>

// //               <ToolbarButton
// //                 active={editor.isActive("italic")}
// //                 onClick={() => editor.chain().focus().toggleItalic().run()}
// //               >
// //                 <Italic size={16} />
// //               </ToolbarButton>

// //               <ToolbarButton
// //                 active={editor.isActive("underline")}
// //                 onClick={() => editor.chain().focus().toggleUnderline().run()}
// //               >
// //                 <UnderlineIcon size={16} />
// //               </ToolbarButton>

// //               <ToolbarButton
// //                 active={editor.isActive("strike")}
// //                 onClick={() => editor.chain().focus().toggleStrike().run()}
// //               >
// //                 <Strikethrough size={16} />
// //               </ToolbarButton>

// //               <input
// //                 type="color"
// //                 onInput={(e) =>
// //                   editor.chain().focus().setColor(e.target.value).run()
// //                 }
// //                 className="w-8 h-8 border cursor-pointer rounded"
// //               />

// //               <ToolbarButton
// //                 active={editor.isActive("highlight")}
// //                 onClick={() => editor.chain().focus().toggleHighlight().run()}
// //               >
// //                 <Highlighter size={16} />
// //               </ToolbarButton>

// //               <ToolbarButton
// //                 active={editor.isActive({ textAlign: "left" })}
// //                 onClick={() =>
// //                   editor.chain().focus().setTextAlign("left").run()
// //                 }
// //               >
// //                 <AlignLeft size={16} />
// //               </ToolbarButton>
// //               <ToolbarButton
// //                 active={editor.isActive({ textAlign: "center" })}
// //                 onClick={() =>
// //                   editor.chain().focus().setTextAlign("center").run()
// //                 }
// //               >
// //                 <AlignCenter size={16} />
// //               </ToolbarButton>
// //               <ToolbarButton
// //                 active={editor.isActive({ textAlign: "right" })}
// //                 onClick={() =>
// //                   editor.chain().focus().setTextAlign("right").run()
// //                 }
// //               >
// //                 <AlignRight size={16} />
// //               </ToolbarButton>
// //               <ToolbarButton
// //                 active={editor.isActive({ textAlign: "justify" })}
// //                 onClick={() =>
// //                   editor.chain().focus().setTextAlign("justify").run()
// //                 }
// //               >
// //                 <AlignJustify size={16} />
// //               </ToolbarButton>

// //               <ToolbarButton
// //                 active={editor.isActive("bulletList")}
// //                 onClick={() => editor.chain().focus().toggleBulletList().run()}
// //               >
// //                 <List size={16} />
// //               </ToolbarButton>
// //               <ToolbarButton
// //                 active={editor.isActive("orderedList")}
// //                 onClick={() => editor.chain().focus().toggleOrderedList().run()}
// //               >
// //                 <ListOrdered size={16} />
// //               </ToolbarButton>

// //               <ToolbarButton active={editor.isActive("link")} onClick={addLink}>
// //                 <Link2 size={16} />
// //               </ToolbarButton>

// //               <ToolbarButton onClick={openImageUpload}>
// //                 <ImagePlus size={16} />
// //               </ToolbarButton>
// //               <input
// //                 ref={fileInputRef}
// //                 type="file"
// //                 accept="image/*"
// //                 className="hidden"
// //                 onChange={handleImageUpload}
// //               />

// //               <ToolbarButton
// //                 onClick={() =>
// //                   editor
// //                     .chain()
// //                     .focus()
// //                     .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
// //                     .run()
// //                 }
// //               >
// //                 <Table2 size={16} />
// //               </ToolbarButton>

// //               <ToolbarButton
// //                 onClick={() => editor.chain().focus().undo().run()}
// //               >
// //                 <Undo size={16} />
// //               </ToolbarButton>
// //               <ToolbarButton
// //                 onClick={() => editor.chain().focus().redo().run()}
// //               >
// //                 <Redo size={16} />
// //               </ToolbarButton>
// //             </div>

// //             <EditorContent editor={editor} />
// //           </>
// //         ) : (
// //           <div className="p-8 prose max-w-none bg-white min-h-[400px]">
// //             <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }} />
// //           </div>
// //         )}
// //       </div>

// //       {submittedContent && (
// //         <div className="border-t bg-gray-50 p-6">
// //           <h3 className="text-lg font-semibold mb-3 text-gray-700">
// //             Submitted Content:
// //           </h3>
// //           <div
// //             className="prose max-w-none bg-white p-6 border rounded-lg"
// //             dangerouslySetInnerHTML={{ __html: submittedContent }}
// //           />
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default DescriptionEditor;

// import React, { useEffect, useRef, useState, useCallback } from "react";
// import { useEditor, EditorContent, NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
// import { Extension, Node, mergeAttributes } from "@tiptap/core";

// // Extensions
// import StarterKit from "@tiptap/starter-kit";
// import Placeholder from "@tiptap/extension-placeholder";
// import Underline from "@tiptap/extension-underline";
// import Link from "@tiptap/extension-link";
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

// // ✅ Custom FontSize Extension
// const FontSize = Extension.create({
//   name: "fontSize",
//   addOptions() {
//     return { types: ["textStyle"] };
//   },
//   addGlobalAttributes() {
//     return [
//       {
//         types: this.options.types,
//         attributes: {
//           fontSize: {
//             default: null,
//             parseHTML: (element) => element.style.fontSize || null,
//             renderHTML: (attributes) => {
//               if (!attributes.fontSize) return {};
//               return { style: `font-size: ${attributes.fontSize}` };
//             },
//           },
//         },
//       },
//     ];
//   },
//   addCommands() {
//     return {
//       setFontSize:
//         (fontSize) =>
//         ({ chain }) => {
//           return chain().setMark("textStyle", { fontSize }).run();
//         },
//       unsetFontSize:
//         () =>
//         ({ chain }) => {
//           return chain().setMark("textStyle", { fontSize: null }).run();
//         },
//     };
//   },
// });

// // ✅ Image Resize Component
// const ImageResizeComponent = ({ node, updateAttributes, selected }) => {
//   const [isResizing, setIsResizing] = useState(false);
//   const [showToolbar, setShowToolbar] = useState(false);
//   const [widthInput, setWidthInput] = useState("");
//   const [heightInput, setHeightInput] = useState("");
//   const imgRef = useRef(null);
//   const startX = useRef(0);
//   const startY = useRef(0);
//   const startW = useRef(0);
//   const startH = useRef(0);
//   const aspectRatio = useRef(1);

//   const width = node.attrs.width || "auto";
//   const height = node.attrs.height || "auto";

//   useEffect(() => {
//     if (showToolbar) {
//       const w = imgRef.current?.naturalWidth || 300;
//       const h = imgRef.current?.naturalHeight || 200;
//       setWidthInput(typeof width === "number" ? width : w);
//       setHeightInput(typeof height === "number" ? height : h);
//     }
//   }, [showToolbar]);

//   const onMouseDown = useCallback((e, corner) => {
//     e.preventDefault();
//     e.stopPropagation();
//     const img = imgRef.current;
//     if (!img) return;

//     startX.current = e.clientX;
//     startY.current = e.clientY;
//     startW.current = img.offsetWidth;
//     startH.current = img.offsetHeight;
//     aspectRatio.current = img.offsetWidth / img.offsetHeight;
//     setIsResizing(true);

//     const onMouseMove = (e) => {
//       const dx = e.clientX - startX.current;
//       const dy = e.clientY - startY.current;
//       let newW, newH;

//       if (corner === "se") {
//         newW = Math.max(50, startW.current + dx);
//         newH = Math.round(newW / aspectRatio.current);
//       } else if (corner === "sw") {
//         newW = Math.max(50, startW.current - dx);
//         newH = Math.round(newW / aspectRatio.current);
//       } else if (corner === "ne") {
//         newW = Math.max(50, startW.current + dx);
//         newH = Math.round(newW / aspectRatio.current);
//       } else {
//         newW = Math.max(50, startW.current - dx);
//         newH = Math.round(newW / aspectRatio.current);
//       }

//       updateAttributes({ width: newW, height: newH });
//       setWidthInput(newW);
//       setHeightInput(newH);
//     };

//     const onMouseUp = () => {
//       setIsResizing(false);
//       document.removeEventListener("mousemove", onMouseMove);
//       document.removeEventListener("mouseup", onMouseUp);
//     };

//     document.addEventListener("mousemove", onMouseMove);
//     document.addEventListener("mouseup", onMouseUp);
//   }, [updateAttributes]);

//   const applyManualSize = () => {
//     const w = parseInt(widthInput);
//     const h = parseInt(heightInput);
//     if (!isNaN(w) && !isNaN(h) && w > 0 && h > 0) {
//       updateAttributes({ width: w, height: h });
//     }
//   };

//   const handleWidthChange = (val) => {
//     setWidthInput(val);
//     const w = parseInt(val);
//     if (!isNaN(w) && w > 0) {
//       const h = Math.round(w / aspectRatio.current);
//       setHeightInput(h);
//     }
//   };

//   const handleHeightChange = (val) => {
//     setHeightInput(val);
//     const h = parseInt(val);
//     if (!isNaN(h) && h > 0) {
//       const w = Math.round(h * aspectRatio.current);
//       setWidthInput(w);
//     }
//   };

//   const handleReset = () => {
//     updateAttributes({ width: null, height: null });
//     setShowToolbar(false);
//   };

//   const handleImgLoad = () => {
//     if (imgRef.current) {
//       aspectRatio.current = imgRef.current.naturalWidth / imgRef.current.naturalHeight;
//     }
//   };

//   const cornerStyle = {
//     position: "absolute",
//     width: 10,
//     height: 10,
//     background: "#2563eb",
//     border: "2px solid white",
//     borderRadius: 2,
//     zIndex: 10,
//   };

//   return (
//     <NodeViewWrapper
//       style={{ display: "inline-block", position: "relative", lineHeight: 0 }}
//       onClick={() => setShowToolbar((v) => !v)}
//     >
//       <img
//         ref={imgRef}
//         src={node.attrs.src}
//         alt={node.attrs.alt || ""}
//         onLoad={handleImgLoad}
//         style={{
//           width: width !== "auto" ? `${width}px` : "auto",
//           height: height !== "auto" ? `${height}px` : "auto",
//           maxWidth: "100%",
//           display: "block",
//           outline: (selected || showToolbar) ? "2px solid #2563eb" : "none",
//           cursor: "pointer",
//           userSelect: "none",
//         }}
//         draggable={false}
//       />

//       {/* Resize Handles — sirf jab selected ho */}
//       {(selected || showToolbar) && (
//         <>
//           {/* NW */}
//           <div onMouseDown={(e) => onMouseDown(e, "nw")}
//             style={{ ...cornerStyle, top: -5, left: -5, cursor: "nw-resize" }} />
//           {/* NE */}
//           <div onMouseDown={(e) => onMouseDown(e, "ne")}
//             style={{ ...cornerStyle, top: -5, right: -5, cursor: "ne-resize" }} />
//           {/* SW */}
//           <div onMouseDown={(e) => onMouseDown(e, "sw")}
//             style={{ ...cornerStyle, bottom: -5, left: -5, cursor: "sw-resize" }} />
//           {/* SE */}
//           <div onMouseDown={(e) => onMouseDown(e, "se")}
//             style={{ ...cornerStyle, bottom: -5, right: -5, cursor: "se-resize" }} />

//           {/* Size Toolbar */}
//           <div
//             onClick={(e) => e.stopPropagation()}
//             style={{
//               position: "absolute",
//               top: -48,
//               left: "50%",
//               transform: "translateX(-50%)",
//               background: "#1e293b",
//               borderRadius: 8,
//               padding: "5px 10px",
//               display: "flex",
//               alignItems: "center",
//               gap: 6,
//               zIndex: 20,
//               whiteSpace: "nowrap",
//               boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
//             }}
//           >
//             <span style={{ color: "#94a3b8", fontSize: 11 }}>W</span>
//             <input
//               type="number"
//               value={widthInput}
//               onChange={(e) => handleWidthChange(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && applyManualSize()}
//               style={{
//                 width: 58,
//                 background: "#334155",
//                 color: "white",
//                 border: "1px solid #475569",
//                 borderRadius: 4,
//                 padding: "2px 4px",
//                 fontSize: 12,
//               }}
//             />
//             <span style={{ color: "#94a3b8", fontSize: 11 }}>H</span>
//             <input
//               type="number"
//               value={heightInput}
//               onChange={(e) => handleHeightChange(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && applyManualSize()}
//               style={{
//                 width: 58,
//                 background: "#334155",
//                 color: "white",
//                 border: "1px solid #475569",
//                 borderRadius: 4,
//                 padding: "2px 4px",
//                 fontSize: 12,
//               }}
//             />
//             <button
//               onClick={applyManualSize}
//               style={{
//                 background: "#2563eb",
//                 color: "white",
//                 border: "none",
//                 borderRadius: 4,
//                 padding: "2px 8px",
//                 fontSize: 12,
//                 cursor: "pointer",
//               }}
//             >
//               Apply
//             </button>
//             <button
//               onClick={handleReset}
//               style={{
//                 background: "#475569",
//                 color: "white",
//                 border: "none",
//                 borderRadius: 4,
//                 padding: "2px 8px",
//                 fontSize: 12,
//                 cursor: "pointer",
//               }}
//             >
//               Reset
//             </button>
//           </div>
//         </>
//       )}
//     </NodeViewWrapper>
//   );
// };

// // ✅ Custom Resizable Image Node
// const ResizableImage = Node.create({
//   name: "resizableImage",
//   group: "inline",
//   inline: true,
//   draggable: true,
//   atom: true,

//   addAttributes() {
//     return {
//       src: { default: null },
//       alt: { default: null },
//       title: { default: null },
//       width: { default: null },
//       height: { default: null },
//     };
//   },

//   parseHTML() {
//     return [{ tag: "img[src]" }];
//   },

//   renderHTML({ HTMLAttributes }) {
//     const { width, height, ...rest } = HTMLAttributes;
//     const style = [
//       width ? `width:${width}px` : "",
//       height ? `height:${height}px` : "",
//     ]
//       .filter(Boolean)
//       .join(";");
//     return ["img", mergeAttributes(rest, style ? { style } : {})];
//   },

//   addNodeView() {
//     return ReactNodeViewRenderer(ImageResizeComponent);
//   },
// });

// const fonts = ["Arial", "Calibri", "Times New Roman", "Verdana", "Georgia", "Courier New"];
// const fontSizes = ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px"];

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
//       ResizableImage, // ✅ Custom image extension with resize
//       TextStyle,
//       FontSize,
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

//   // ✅ Selected text ka font size dropdown mein dikhao
//   useEffect(() => {
//     if (!editor) return;

//     const updateFontSize = () => {
//       const { from, to, empty } = editor.state.selection;
//       if (empty) {
//         const attrs = editor.getAttributes("textStyle");
//         setFontSize(attrs.fontSize || "16px");
//       } else {
//         let detectedSize = "16px";
//         editor.state.doc.nodesBetween(from, to, (node) => {
//           if (detectedSize !== "16px") return false;
//           if (node.isText) {
//             node.marks.forEach((mark) => {
//               if (mark.type.name === "textStyle" && mark.attrs.fontSize) {
//                 detectedSize = mark.attrs.fontSize;
//               }
//             });
//           }
//         });
//         setFontSize(detectedSize);
//       }
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

//   const changeFontSize = (size) => {
//     setFontSize(size);
//     editor.chain().focus().setFontSize(size).run();
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

//   // ✅ Image insert — ResizableImage node use karega
//   const handleImageUpload = (event) => {
//     const file = event.target.files?.[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onload = () => {
//       if (typeof reader.result === "string") {
//         editor
//           .chain()
//           .focus()
//           .insertContent({
//             type: "resizableImage",
//             attrs: { src: reader.result },
//           })
//           .run();
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
//               <select
//                 className="h-8 border border-gray-400 px-2 text-sm bg-white rounded"
//                 onChange={(e) =>
//                   editor.chain().focus().setFontFamily(e.target.value).run()
//                 }
//               >
//                 {fonts.map((font) => (
//                   <option key={font} value={font}>{font}</option>
//                 ))}
//               </select>

//               <select
//                 value={fontSize}
//                 onChange={(e) => changeFontSize(e.target.value)}
//                 className="h-8 border border-gray-400 px-2 text-sm bg-white rounded"
//               >
//                 {fontSizes.map((size) => (
//                   <option key={size} value={size}>{size}</option>
//                 ))}
//               </select>

//               <ToolbarButton active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
//                 <Bold size={16} />
//               </ToolbarButton>
//               <ToolbarButton active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
//                 <Italic size={16} />
//               </ToolbarButton>
//               <ToolbarButton active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
//                 <UnderlineIcon size={16} />
//               </ToolbarButton>
//               <ToolbarButton active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
//                 <Strikethrough size={16} />
//               </ToolbarButton>

//               <input
//                 type="color"
//                 onInput={(e) => editor.chain().focus().setColor(e.target.value).run()}
//                 className="w-8 h-8 border cursor-pointer rounded"
//               />

//               <ToolbarButton active={editor.isActive("highlight")} onClick={() => editor.chain().focus().toggleHighlight().run()}>
//                 <Highlighter size={16} />
//               </ToolbarButton>

//               <ToolbarButton active={editor.isActive({ textAlign: "left" })} onClick={() => editor.chain().focus().setTextAlign("left").run()}>
//                 <AlignLeft size={16} />
//               </ToolbarButton>
//               <ToolbarButton active={editor.isActive({ textAlign: "center" })} onClick={() => editor.chain().focus().setTextAlign("center").run()}>
//                 <AlignCenter size={16} />
//               </ToolbarButton>
//               <ToolbarButton active={editor.isActive({ textAlign: "right" })} onClick={() => editor.chain().focus().setTextAlign("right").run()}>
//                 <AlignRight size={16} />
//               </ToolbarButton>
//               <ToolbarButton active={editor.isActive({ textAlign: "justify" })} onClick={() => editor.chain().focus().setTextAlign("justify").run()}>
//                 <AlignJustify size={16} />
//               </ToolbarButton>

//               <ToolbarButton active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
//                 <List size={16} />
//               </ToolbarButton>
//               <ToolbarButton active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
//                 <ListOrdered size={16} />
//               </ToolbarButton>

//               <ToolbarButton active={editor.isActive("link")} onClick={addLink}>
//                 <Link2 size={16} />
//               </ToolbarButton>

//               <ToolbarButton onClick={openImageUpload}>
//                 <ImagePlus size={16} />
//               </ToolbarButton>
//               <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />

//               <ToolbarButton onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}>
//                 <Table2 size={16} />
//               </ToolbarButton>

//               <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
//                 <Undo size={16} />
//               </ToolbarButton>
//               <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
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
//           <h3 className="text-lg font-semibold mb-3 text-gray-700">Submitted Content:</h3>
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

import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  useEditor,
  EditorContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { Extension, Node, mergeAttributes } from "@tiptap/core";

// Extensions
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import FontFamily from "@tiptap/extension-font-family";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableCell } from "@tiptap/extension-table-cell";

import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Undo, Redo, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Link2, ImagePlus, Table2, Highlighter,
  Eye, Edit3, Save,
} from "lucide-react";

// ─── FontSize Extension ───────────────────────────────────────────────────────
const FontSize = Extension.create({
  name: "fontSize",
  addOptions() { return { types: ["textStyle"] }; },
  addGlobalAttributes() {
    return [{
      types: this.options.types,
      attributes: {
        fontSize: {
          default: null,
          parseHTML: (el) => el.style.fontSize || null,
          renderHTML: (attrs) => attrs.fontSize ? { style: `font-size: ${attrs.fontSize}` } : {},
        },
      },
    }];
  },
  addCommands() {
    return {
      setFontSize: (fontSize) => ({ chain }) => chain().setMark("textStyle", { fontSize }).run(),
      unsetFontSize: () => ({ chain }) => chain().setMark("textStyle", { fontSize: null }).run(),
    };
  },
});

// ─── Image Position/Align Toolbar Icons (inline SVG) ─────────────────────────
const IconFloatLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="6" height="6" rx="1"/>
    <rect x="9" y="2" width="6" height="1.5" rx="0.5"/>
    <rect x="9" y="5" width="4" height="1.5" rx="0.5"/>
    <rect x="1" y="9" width="14" height="1.5" rx="0.5"/>
    <rect x="1" y="12" width="12" height="1.5" rx="0.5"/>
  </svg>
);
const IconFloatRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <rect x="9" y="1" width="6" height="6" rx="1"/>
    <rect x="1" y="2" width="6" height="1.5" rx="0.5"/>
    <rect x="1" y="5" width="4" height="1.5" rx="0.5"/>
    <rect x="1" y="9" width="14" height="1.5" rx="0.5"/>
    <rect x="1" y="12" width="12" height="1.5" rx="0.5"/>
  </svg>
);
const IconNoFloat = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <rect x="4" y="1" width="8" height="6" rx="1"/>
    <rect x="1" y="9" width="14" height="1.5" rx="0.5"/>
    <rect x="1" y="12" width="11" height="1.5" rx="0.5"/>
  </svg>
);

// ─── ImageResizeComponent ─────────────────────────────────────────────────────
const ImageResizeComponent = ({ node, updateAttributes, selected }) => {
  const [showToolbar, setShowToolbar] = useState(false);
  const [widthInput, setWidthInput]   = useState("");
  const [heightInput, setHeightInput] = useState("");
  const imgRef      = useRef(null);
  const startX      = useRef(0);
  const startW      = useRef(0);
  const aspectRatio = useRef(1);

  const width       = node.attrs.width  || null;
  const height      = node.attrs.height || null;
  const float       = node.attrs.float  || "none";   // none | left | right
  const vAlign      = node.attrs.vAlign || "middle"; // top | middle | bottom

  // Keep inputs in sync when toolbar opens
  useEffect(() => {
    if (showToolbar && imgRef.current) {
      setWidthInput(width  ?? imgRef.current.offsetWidth);
      setHeightInput(height ?? imgRef.current.offsetHeight);
    }
  }, [showToolbar]);

  const onMouseDown = useCallback((e, corner) => {
    e.preventDefault();
    e.stopPropagation();
    const img = imgRef.current;
    if (!img) return;
    startX.current = e.clientX;
    startW.current = img.offsetWidth;
    aspectRatio.current = img.offsetWidth / img.offsetHeight;

    const onMove = (ev) => {
      const dx = ev.clientX - startX.current;
      const newW = Math.max(50, corner === "sw" || corner === "nw"
        ? startW.current - dx
        : startW.current + dx);
      const newH = Math.round(newW / aspectRatio.current);
      updateAttributes({ width: newW, height: newH });
      setWidthInput(newW);
      setHeightInput(newH);
    };
    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  }, [updateAttributes]);

  const applySize = () => {
    const w = parseInt(widthInput);
    const h = parseInt(heightInput);
    if (w > 0 && h > 0) updateAttributes({ width: w, height: h });
  };

  const handleWChange = (val) => {
    setWidthInput(val);
    const w = parseInt(val);
    if (w > 0) setHeightInput(Math.round(w / aspectRatio.current));
  };
  const handleHChange = (val) => {
    setHeightInput(val);
    const h = parseInt(val);
    if (h > 0) setWidthInput(Math.round(h * aspectRatio.current));
  };

  const handleImgLoad = () => {
    if (imgRef.current)
      aspectRatio.current = imgRef.current.naturalWidth / imgRef.current.naturalHeight;
  };

  // Wrapper style — float + margin
  const wrapperStyle = {
    display: "inline-block",
    position: "relative",
    lineHeight: 0,
    ...(float === "left"  && { float: "left",  marginRight: 12, marginBottom: 8 }),
    ...(float === "right" && { float: "right", marginLeft: 12,  marginBottom: 8 }),
    ...(float === "none"  && { display: "block", margin: "8px auto" }),
    verticalAlign: vAlign,
  };

  const corner = {
    position: "absolute", width: 10, height: 10,
    background: "#2563eb", border: "2px solid white",
    borderRadius: 2, zIndex: 10,
  };

  const active = selected || showToolbar;

  // Toolbar button style helper
  const tbBtn = (isActive) => ({
    background: isActive ? "#2563eb" : "#334155",
    color: "white", border: "none", borderRadius: 4,
    padding: "2px 7px", fontSize: 11, cursor: "pointer",
    display: "flex", alignItems: "center", gap: 3,
  });

  return (
    <NodeViewWrapper style={wrapperStyle} onClick={() => setShowToolbar(v => !v)}>
      <img
        ref={imgRef}
        src={node.attrs.src}
        alt={node.attrs.alt || ""}
        onLoad={handleImgLoad}
        draggable={false}
        style={{
          width:  width  ? `${width}px`  : "auto",
          height: height ? `${height}px` : "auto",
          maxWidth: "100%",
          display: "block",
          outline: active ? "2px solid #2563eb" : "none",
          cursor: "pointer",
          userSelect: "none",
          verticalAlign: vAlign,
        }}
      />

      {active && (
        <>
          {/* Corner handles */}
          <div onMouseDown={e => onMouseDown(e,"nw")} style={{...corner, top:-5,  left:-5,  cursor:"nw-resize"}}/>
          <div onMouseDown={e => onMouseDown(e,"ne")} style={{...corner, top:-5,  right:-5, cursor:"ne-resize"}}/>
          <div onMouseDown={e => onMouseDown(e,"sw")} style={{...corner, bottom:-5,left:-5, cursor:"sw-resize"}}/>
          <div onMouseDown={e => onMouseDown(e,"se")} style={{...corner, bottom:-5,right:-5,cursor:"se-resize"}}/>

          {/* ── Floating Toolbar ── */}
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: "absolute",
              top: -90,
              left: "50%",
              transform: "translateX(-50%)",
              background: "#1e293b",
              borderRadius: 8,
              padding: "6px 10px",
              display: "flex",
              flexDirection: "column",
              gap: 5,
              zIndex: 20,
              whiteSpace: "nowrap",
              boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
              minWidth: 320,
            }}
          >
            {/* Row 1: Size inputs */}
            <div style={{ display:"flex", alignItems:"center", gap:5 }}>
              <span style={{ color:"#94a3b8", fontSize:11 }}>W</span>
              <input type="number" value={widthInput}
                onChange={e => handleWChange(e.target.value)}
                onKeyDown={e => e.key==="Enter" && applySize()}
                style={{ width:55, background:"#334155", color:"white", border:"1px solid #475569", borderRadius:4, padding:"2px 4px", fontSize:12 }}
              />
              <span style={{ color:"#94a3b8", fontSize:11 }}>H</span>
              <input type="number" value={heightInput}
                onChange={e => handleHChange(e.target.value)}
                onKeyDown={e => e.key==="Enter" && applySize()}
                style={{ width:55, background:"#334155", color:"white", border:"1px solid #475569", borderRadius:4, padding:"2px 4px", fontSize:12 }}
              />
              <button onClick={applySize} style={tbBtn(false)}>Apply</button>
              <button onClick={() => { updateAttributes({ width:null, height:null }); setShowToolbar(false); }} style={tbBtn(false)}>Reset</button>
            </div>

            {/* Row 2: Float + Vertical Align */}
            <div style={{ display:"flex", alignItems:"center", gap:5, borderTop:"1px solid #334155", paddingTop:5 }}>

              {/* Float buttons */}
              <span style={{ color:"#94a3b8", fontSize:11 }}>Float:</span>
              <button onClick={() => updateAttributes({ float:"left" })}  style={tbBtn(float==="left")}  title="Float Left">
                <IconFloatLeft /> Left
              </button>
              <button onClick={() => updateAttributes({ float:"none" })}  style={tbBtn(float==="none")}  title="No Float">
                <IconNoFloat /> None
              </button>
              <button onClick={() => updateAttributes({ float:"right" })} style={tbBtn(float==="right")} title="Float Right">
                <IconFloatRight /> Right
              </button>

              {/* Vertical align — only useful when float is none/inline */}
              <span style={{ color:"#94a3b8", fontSize:11, marginLeft:6 }}>Align:</span>
              <button onClick={() => updateAttributes({ vAlign:"top" })}    style={tbBtn(vAlign==="top")}    title="Vertical Top">Top</button>
              <button onClick={() => updateAttributes({ vAlign:"middle" })} style={tbBtn(vAlign==="middle")} title="Vertical Middle">Mid</button>
              <button onClick={() => updateAttributes({ vAlign:"bottom" })} style={tbBtn(vAlign==="bottom")} title="Vertical Bottom">Bot</button>
            </div>
          </div>
        </>
      )}
    </NodeViewWrapper>
  );
};

// ─── ResizableImage TipTap Node ───────────────────────────────────────────────
const ResizableImage = Node.create({
  name: "resizableImage",
  group: "inline",
  inline: true,
  draggable: true,
  atom: true,

  addAttributes() {
    return {
      src:    { default: null },
      alt:    { default: null },
      title:  { default: null },
      width:  { default: null },
      height: { default: null },
      float:  { default: "none" },
      vAlign: { default: "middle" },
    };
  },

  parseHTML() { return [{ tag: "img[src]" }]; },

  renderHTML({ HTMLAttributes }) {
    const { width, height, float: f, vAlign, ...rest } = HTMLAttributes;
    const styles = [
      width  ? `width:${width}px`   : "",
      height ? `height:${height}px` : "",
      f && f !== "none" ? `float:${f}` : "",
      vAlign ? `vertical-align:${vAlign}` : "",
    ].filter(Boolean).join(";");
    return ["img", mergeAttributes(rest, styles ? { style: styles } : {})];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageResizeComponent);
  },
});

// ─── Constants ────────────────────────────────────────────────────────────────
const fonts = ["Arial","Calibri","Times New Roman","Verdana","Georgia","Courier New"];
const fontSizes = ["12px","14px","16px","18px","20px","24px","28px","32px"];

// ─── Main Editor ──────────────────────────────────────────────────────────────
const DescriptionEditor = ({ value = "", onChange, placeholder = "Write content...", onSubmit }) => {
  const [fontSize, setFontSize]               = useState("16px");
  const [isPreviewMode, setIsPreviewMode]     = useState(false);
  const [submittedContent, setSubmittedContent] = useState("");
  const fileInputRef = useRef(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ bulletList:false, orderedList:false, listItem:false }),
      Placeholder.configure({ placeholder }),
      Underline,
      Link.configure({ openOnClick:false, HTMLAttributes:{ class:"text-blue-600 underline" } }),
      ResizableImage,
      TextStyle,
      FontSize,
      Color,
      Highlight,
      FontFamily,
      TextAlign.configure({ types:["heading","paragraph"] }),
      BulletList.configure({ HTMLAttributes:{ class:"list-disc pl-6" } }),
      OrderedList.configure({ HTMLAttributes:{ class:"list-decimal pl-6" } }),
      ListItem,
      Table.configure({ resizable:true }),
      TableRow, TableHeader, TableCell,
    ],
    content: value,
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    editorProps: {
      attributes: { class:"prose max-w-none min-h-[350px] p-5 focus:outline-none" },
    },
  });

  // Sync external value
  useEffect(() => {
    if (editor && value !== editor.getHTML()) editor.commands.setContent(value);
  }, [value, editor]);

  // Font size detect on selection
  useEffect(() => {
    if (!editor) return;
    const update = () => {
      const { from, to, empty } = editor.state.selection;
      if (empty) {
        setFontSize(editor.getAttributes("textStyle").fontSize || "16px");
      } else {
        let size = "16px";
        editor.state.doc.nodesBetween(from, to, (node) => {
          if (size !== "16px") return false;
          if (node.isText)
            node.marks.forEach(m => { if (m.type.name==="textStyle" && m.attrs.fontSize) size = m.attrs.fontSize; });
        });
        setFontSize(size);
      }
    };
    editor.on("selectionUpdate", update);
    editor.on("update", update);
    return () => { editor.off("selectionUpdate", update); editor.off("update", update); };
  }, [editor]);

  const handleSubmit = () => {
    if (!editor) return;
    const html = editor.getHTML();
    setSubmittedContent(html);
    onSubmit?.(html);
    setIsPreviewMode(true);
  };

  if (!editor) return null;

  const TB = ({ onClick, active, children }) => (
    <button type="button" onClick={onClick}
      className={`h-8 min-w-8 px-2 flex items-center justify-center border text-sm
        ${active ? "bg-[#dbeafe] border-[#93c5fd] text-blue-700" : "bg-white hover:bg-gray-100 border-gray-300"}`}>
      {children}
    </button>
  );

  const changeFontSize = (size) => {
    setFontSize(size);
    editor.chain().focus().setFontSize(size).run();
  };

  const addLink = () => {
    const prev = editor.getAttributes("link").href;
    const url = prompt(prev ? `Current: ${prev}\nNew URL:` : "Enter URL:", prev || "https://");
    if (url === null) return;
    if (!url || url === "https://") editor.chain().focus().unsetLink().run();
    else editor.chain().focus().setLink({ href: url }).run();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string")
        editor.chain().focus().insertContent({ type:"resizableImage", attrs:{ src:reader.result } }).run();
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <div className="border border-gray-300 bg-white overflow-hidden rounded-lg">

      {/* Top bar */}
      <div className="border-b bg-[#f3f3f3] flex items-center justify-between px-3 py-2">
        <div className="flex items-center gap-1">
          <button onClick={() => setIsPreviewMode(false)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${!isPreviewMode ? "bg-white shadow-sm border border-gray-300" : "hover:bg-gray-100"}`}>
            <Edit3 size={18}/> Edit
          </button>
          <button onClick={() => setIsPreviewMode(true)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md ${isPreviewMode ? "bg-white shadow-sm border border-gray-300" : "hover:bg-gray-100"}`}>
            <Eye size={18}/> Preview
          </button>
        </div>
        <button onClick={handleSubmit}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium">
          <Save size={18}/> Submit
        </button>
      </div>

      <div className="min-h-[400px]">
        {!isPreviewMode ? (
          <>
            {/* Toolbar */}
            <div className="border-b bg-[#f3f3f3] p-2 flex flex-wrap items-center gap-1">
              <select className="h-8 border border-gray-400 px-2 text-sm bg-white rounded"
                onChange={e => editor.chain().focus().setFontFamily(e.target.value).run()}>
                {fonts.map(f => <option key={f} value={f}>{f}</option>)}
              </select>

              <select value={fontSize} onChange={e => changeFontSize(e.target.value)}
                className="h-8 border border-gray-400 px-2 text-sm bg-white rounded">
                {fontSizes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>

              <TB active={editor.isActive("bold")}      onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={16}/></TB>
              <TB active={editor.isActive("italic")}    onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={16}/></TB>
              <TB active={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}><UnderlineIcon size={16}/></TB>
              <TB active={editor.isActive("strike")}    onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough size={16}/></TB>

              <input type="color" onInput={e => editor.chain().focus().setColor(e.target.value).run()}
                className="w-8 h-8 border cursor-pointer rounded"/>

              <TB active={editor.isActive("highlight")} onClick={() => editor.chain().focus().toggleHighlight().run()}><Highlighter size={16}/></TB>

              <TB active={editor.isActive({textAlign:"left"})}    onClick={() => editor.chain().focus().setTextAlign("left").run()}><AlignLeft size={16}/></TB>
              <TB active={editor.isActive({textAlign:"center"})}  onClick={() => editor.chain().focus().setTextAlign("center").run()}><AlignCenter size={16}/></TB>
              <TB active={editor.isActive({textAlign:"right"})}   onClick={() => editor.chain().focus().setTextAlign("right").run()}><AlignRight size={16}/></TB>
              <TB active={editor.isActive({textAlign:"justify"})} onClick={() => editor.chain().focus().setTextAlign("justify").run()}><AlignJustify size={16}/></TB>

              <TB active={editor.isActive("bulletList")}  onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={16}/></TB>
              <TB active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={16}/></TB>

              <TB active={editor.isActive("link")} onClick={addLink}><Link2 size={16}/></TB>

              <TB onClick={() => fileInputRef.current?.click()}><ImagePlus size={16}/></TB>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload}/>

              <TB onClick={() => editor.chain().focus().insertTable({ rows:3, cols:3, withHeaderRow:true }).run()}>
                <Table2 size={16}/>
              </TB>

              <TB onClick={() => editor.chain().focus().undo().run()}><Undo size={16}/></TB>
              <TB onClick={() => editor.chain().focus().redo().run()}><Redo size={16}/></TB>
            </div>

            <EditorContent editor={editor}/>
          </>
        ) : (
          <div className="p-8 prose max-w-none bg-white min-h-[400px]">
            <div dangerouslySetInnerHTML={{ __html: editor.getHTML() }}/>
          </div>
        )}
      </div>

      {submittedContent && (
        <div className="border-t bg-gray-50 p-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-700">Submitted Content:</h3>
          <div className="prose max-w-none bg-white p-6 border rounded-lg"
            dangerouslySetInnerHTML={{ __html: submittedContent }}/>
        </div>
      )}
    </div>
  );
};

export default DescriptionEditor;