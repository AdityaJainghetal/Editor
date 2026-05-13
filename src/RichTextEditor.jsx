// import { useState, useRef, useEffect } from 'react';
// import { Bold, Italic, Underline, Strikethrough, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, AlignJustify, Link, Image, Undo, Redo, Maximize, Minimize, Code } from 'lucide-react';

// export default function RichTextEditor() {
//   const editorRef = useRef(null);
//   const [isFullscreen, setIsFullscreen] = useState(false);

//   const execCommand = (command, value = null) => {
//     document.execCommand(command, false, value);
//     editorRef.current?.focus();
//   };

//   const insertLink = () => {
//     const url = prompt('Enter URL:');
//     if (url) execCommand('createLink', url);
//   };

//   const insertImage = () => {
//     const input = document.createElement('input');
//     input.type = 'file';
//     input.accept = 'image/*';
//     input.onchange = (e) => {
//       const file = e.target.files[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onload = (event) => {
//           execCommand('insertImage', event.target.result);
//         };
//         reader.readAsDataURL(file);
//       }
//     };
//     input.click();
//   };

//   const toggleFullscreen = () => {
//     setIsFullscreen(!isFullscreen);
//   };

//   return (
//     <div className={`max-w-4xl mx-auto p-4 ${isFullscreen ? 'fixed inset-0 bg-zinc-950 z-50' : ''}`}>
//       <div className="bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-800">
//         {/* Toolbar */}
//         <div className="bg-zinc-950 p-3 flex flex-wrap gap-2 border-b border-zinc-800">
//           {/* Text Formatting */}
//           <div className="flex gap-1">
//             <ToolbarButton icon={<Bold size={18} />} onClick={() => execCommand('bold')} title="Bold" />
//             <ToolbarButton icon={<Italic size={18} />} onClick={() => execCommand('italic')} title="Italic" />
//             <ToolbarButton icon={<Underline size={18} />} onClick={() => execCommand('underline')} title="Underline" />
//             <ToolbarButton icon={<Strikethrough size={18} />} onClick={() => execCommand('strikeThrough')} title="Strikethrough" />
//           </div>

//           {/* Headings */}
//           <select 
//             onChange={(e) => execCommand('formatBlock', e.target.value)}
//             className="bg-zinc-800 text-white px-3 py-1 rounded-lg border border-zinc-700 focus:outline-none"
//           >
//             <option value="p">Paragraph</option>
//             <option value="h1">Heading 1</option>
//             <option value="h2">Heading 2</option>
//             <option value="h3">Heading 3</option>
//           </select>

//           {/* Lists */}
//           <ToolbarButton icon={<List size={18} />} onClick={() => execCommand('insertUnorderedList')} title="Bullet List" />
//           <ToolbarButton icon={<ListOrdered size={18} />} onClick={() => execCommand('insertOrderedList')} title="Numbered List" />

//           {/* Alignment */}
//           <ToolbarButton icon={<AlignLeft size={18} />} onClick={() => execCommand('justifyLeft')} />
//           <ToolbarButton icon={<AlignCenter size={18} />} onClick={() => execCommand('justifyCenter')} />
//           <ToolbarButton icon={<AlignRight size={18} />} onClick={() => execCommand('justifyRight')} />
//           <ToolbarButton icon={<AlignJustify size={18} />} onClick={() => execCommand('justifyFull')} />

//           {/* Extras */}
//           <ToolbarButton icon={<Link size={18} />} onClick={insertLink} title="Insert Link" />
//           <ToolbarButton icon={<Image size={18} />} onClick={insertImage} title="Insert Image" />
//           <ToolbarButton icon={<Code size={18} />} onClick={() => execCommand('formatBlock', 'pre')} title="Code Block" />

//           <div className="flex-1" />

//           {/* Undo/Redo & Fullscreen */}
//           <ToolbarButton icon={<Undo size={18} />} onClick={() => execCommand('undo')} />
//           <ToolbarButton icon={<Redo size={18} />} onClick={() => execCommand('redo')} />
//           <ToolbarButton 
//             icon={isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />} 
//             onClick={toggleFullscreen} 
//           />
//         </div>

//         {/* Editor Area */}
//         <div 
//           ref={editorRef}
//           contentEditable
//           className="min-h-[500px] p-6 bg-zinc-900 text-white focus:outline-none prose prose-invert max-w-none"
//           style={{ 
//             fontSize: '16px',
//             lineHeight: '1.7'
//           }}
//           onInput={() => {}}
//         />
//       </div>

//       <p className="text-center text-zinc-500 text-sm mt-3">
//         Content is saved automatically in real-time (you can add localStorage if needed)
//       </p>
//     </div>
//   );
// }

// function ToolbarButton({ icon, onClick, title = "" }) {
//   return (
//     <button
//       onClick={onClick}
//       className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-300 hover:text-white transition-all active:scale-95"
//       title={title}
//     >
//       {icon}
//     </button>
//   );
// }

import { useState, useRef } from 'react';
import { 
  Bold, Italic, Underline, Strikethrough, List, ListOrdered, 
  AlignLeft, AlignCenter, AlignRight, AlignJustify, Link, Image, 
  Undo, Redo, Maximize, Minimize, Code 
} from 'lucide-react';

export default function RichTextEditor() {
  const editorRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const changeFontSize = (size) => {
    setFontSize(size);
    document.execCommand('fontSize', false, 3); // fallback
    // Better modern approach
    const selection = window.getSelection();
    if (selection.rangeCount) {
      const range = selection.getRangeAt(0);
      const span = document.createElement('span');
      span.style.fontSize = `${size}px`;
      range.surroundContents(span);
    }
  };

  const changeTextColor = (color) => {
    execCommand('foreColor', color);
  };

  const changeBgColor = (color) => {
    execCommand('hiliteColor', color);
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) execCommand('createLink', url);
  };

  const insertImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => execCommand('insertImage', event.target.result);
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen);

  return (
    <div className={`max-w-5xl mx-auto p-4 ${isFullscreen ? 'fixed inset-0 bg-zinc-950 z-50' : ''}`}>
      <div className="bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-800">
        
        {/* Toolbar */}
        <div className="bg-zinc-950 p-3 flex flex-wrap gap-2 border-b border-zinc-800 items-center">
          
          {/* Font Size */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-zinc-400 px-2">Size:</span>
            <select
              value={fontSize}
              onChange={(e) => changeFontSize(Number(e.target.value))}
              className="bg-zinc-800 text-white px-3 py-1 rounded-lg border border-zinc-700 focus:outline-none w-20"
            >
              {[12, 14, 16, 18, 20, 24, 28, 32, 36, 48].map(size => (
                <option key={size} value={size}>{size}px</option>
              ))}
            </select>
            <input
              type="number"
              value={fontSize}
              onChange={(e) => changeFontSize(Number(e.target.value))}
              className="bg-zinc-800 text-white w-16 px-2 py-1 rounded-lg border border-zinc-700 text-center"
              min="8"
              max="72"
            />
          </div>

          {/* Text Color */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-zinc-400 px-1">Color:</span>
            <input
              type="color"
              onChange={(e) => changeTextColor(e.target.value)}
              className="w-9 h-8 bg-transparent border border-zinc-700 rounded cursor-pointer"
              title="Text Color"
            />
          </div>

          {/* Background Color */}
          <div className="flex items-center gap-1">
            <span className="text-xs text-zinc-400 px-1">Highlight:</span>
            <input
              type="color"
              onChange={(e) => changeBgColor(e.target.value)}
              className="w-9 h-8 bg-transparent border border-zinc-700 rounded cursor-pointer"
              title="Highlight Color"
            />
          </div>

          {/* Formatting */}
          <div className="flex gap-1">
            <ToolbarButton icon={<Bold size={18} />} onClick={() => execCommand('bold')} title="Bold" />
            <ToolbarButton icon={<Italic size={18} />} onClick={() => execCommand('italic')} title="Italic" />
            <ToolbarButton icon={<Underline size={18} />} onClick={() => execCommand('underline')} title="Underline" />
            <ToolbarButton icon={<Strikethrough size={18} />} onClick={() => execCommand('strikeThrough')} title="Strikethrough" />
          </div>

          {/* Headings */}
          <select 
            onChange={(e) => execCommand('formatBlock', e.target.value)}
            className="bg-zinc-800 text-white px-3 py-1 rounded-lg border border-zinc-700"
          >
            <option value="p">Paragraph</option>
            <option value="h1">H1</option>
            <option value="h2">H2</option>
            <option value="h3">H3</option>
          </select>

          {/* Lists & Alignment */}
          <ToolbarButton icon={<List size={18} />} onClick={() => execCommand('insertUnorderedList')} title="Bullet List" />
          <ToolbarButton icon={<ListOrdered size={18} />} onClick={() => execCommand('insertOrderedList')} title="Numbered List" />

          <ToolbarButton icon={<AlignLeft size={18} />} onClick={() => execCommand('justifyLeft')} />
          <ToolbarButton icon={<AlignCenter size={18} />} onClick={() => execCommand('justifyCenter')} />
          <ToolbarButton icon={<AlignRight size={18} />} onClick={() => execCommand('justifyRight')} />
          <ToolbarButton icon={<AlignJustify size={18} />} onClick={() => execCommand('justifyFull')} />

          {/* Extras */}
          <ToolbarButton icon={<Link size={18} />} onClick={insertLink} title="Insert Link" />
          <ToolbarButton icon={<Image size={18} />} onClick={insertImage} title="Insert Image" />
          <ToolbarButton icon={<Code size={18} />} onClick={() => execCommand('formatBlock', 'pre')} title="Code Block" />

          <div className="flex-1" />

          {/* Undo, Redo, Fullscreen */}
          <ToolbarButton icon={<Undo size={18} />} onClick={() => execCommand('undo')} />
          <ToolbarButton icon={<Redo size={18} />} onClick={() => execCommand('redo')} />
          <ToolbarButton 
            icon={isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />} 
            onClick={toggleFullscreen} 
          />
        </div>

        {/* Editor Area */}
        <div 
          ref={editorRef}
          contentEditable
          className="min-h-[520px] p-8 bg-zinc-900 text-white focus:outline-none prose prose-invert max-w-none"
          style={{ fontSize: '16px', lineHeight: '1.8' }}
        />
      </div>
    </div>
  );
}

// Toolbar Button Component
function ToolbarButton({ icon, onClick, title = "" }) {
  return (
    <button
      onClick={onClick}
      className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-300 hover:text-white transition-all active:scale-95"
      title={title}
    >
      {icon}
    </button>
  );
}