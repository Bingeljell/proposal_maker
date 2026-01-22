import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import { Bold, Italic, List, ListOrdered, Indent, Outdent, AlignJustify } from 'lucide-react';
import clsx from 'clsx';

// Custom extension to allow font-size and line-height
import { Extension } from '@tiptap/core';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const MenuButton = ({ 
  onClick, 
  isActive, 
  disabled = false,
  icon: Icon,
  label
}: { 
  onClick: () => void; 
  isActive: boolean; 
  disabled?: boolean;
  icon?: React.ElementType; 
  label?: string;
}) => (
  <button
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
    disabled={disabled}
    className={clsx(
      "p-1.5 rounded transition-colors flex items-center gap-1",
      disabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-200 text-gray-600",
      isActive && !disabled ? "bg-gray-200 text-blue-600" : ""
    )}
    title={label}
  >
    {Icon && <Icon size={16} />}
    {label && <span className="text-xs font-medium">{label}</span>}
  </button>
);

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  value, 
  onChange, 
  className = "" 
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
      }),
      TextStyle.configure({
        HTMLAttributes: {
          style: '',
        },
      }).extend({
        addAttributes() {
          return {
            ...this.parent?.(),
            fontSize: {
              default: null,
              parseHTML: element => element.style.fontSize,
              renderHTML: attributes => {
                if (!attributes.fontSize) {
                  return {};
                }
                return {
                  style: `font-size: ${attributes.fontSize}`,
                };
              },
            },
            lineHeight: {
              default: null,
              parseHTML: element => element.style.lineHeight,
              renderHTML: attributes => {
                if (!attributes.lineHeight) {
                  return {};
                }
                return {
                  style: `line-height: ${attributes.lineHeight} !important; display: inline-block;`,
                };
              },
            },
          };
        },
      }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none focus:outline-none min-h-[150px] p-3',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync editor content when value prop changes (e.g. on load or reset)
  React.useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return null;
  }

  const setFontSize = (size: string) => {
    // @ts-ignore
    editor.chain().focus().setMark('textStyle', { fontSize: size }).run();
  };

  const setLineHeight = (height: string) => {
     // @ts-ignore
     editor.chain().focus().setMark('textStyle', { lineHeight: height }).run();
  };

  return (
    <div className={clsx("border border-gray-300 rounded-md overflow-hidden bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500", className)}>
      {/* Toolbar */}
      <div className="flex items-center gap-1 border-b border-gray-200 bg-gray-50 p-2 flex-wrap">
        <MenuButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          icon={Bold}
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          icon={Italic}
        />
        <div className="w-px h-4 bg-gray-300 mx-1" />
        
        {/* Font Size Controls */}
        <div className="flex items-center bg-white rounded border border-gray-200 mr-1">
           <MenuButton
            onClick={() => setFontSize('11px')}
            isActive={editor.getAttributes('textStyle').fontSize === '11px'}
            label="XS"
          />
           <MenuButton
            onClick={() => setFontSize('13px')}
            isActive={editor.getAttributes('textStyle').fontSize === '13px'}
            label="S"
          />
           <MenuButton
            onClick={() => editor.chain().focus().unsetMark('textStyle').run()}
            isActive={!editor.getAttributes('textStyle').fontSize}
            label="M"
          />
        </div>

        {/* Line Height Controls (Fake implementation via TextStyle for now as inline style) */}
         <div className="flex items-center bg-white rounded border border-gray-200 mr-1">
           <MenuButton
            onClick={() => setLineHeight('1.2')}
            isActive={editor.getAttributes('textStyle').lineHeight === '1.2'}
            icon={AlignJustify}
            label="Tight"
          />
           <MenuButton
            onClick={() => editor.chain().focus().unsetMark('textStyle').run()}
            isActive={!editor.getAttributes('textStyle').lineHeight}
            icon={AlignJustify}
            label="Normal"
          />
        </div>

        <div className="w-px h-4 bg-gray-300 mx-1" />
        <MenuButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          icon={List}
        />
        <MenuButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          icon={ListOrdered}
        />
        <div className="w-px h-4 bg-gray-300 mx-1" />
        <MenuButton
          onClick={() => editor.chain().focus().liftListItem('listItem').run()}
          isActive={false}
          disabled={!editor.can().liftListItem('listItem')}
          icon={Outdent}
        />
        <MenuButton
          onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
          isActive={false}
          disabled={!editor.can().sinkListItem('listItem')}
          icon={Indent}
        />
      </div>
      
      {/* Editor Content */}
      <EditorContent editor={editor} />
    </div>
  );
};