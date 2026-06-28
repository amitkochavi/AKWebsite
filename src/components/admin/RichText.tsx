"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import type { Localized } from "@/types/content";

const EMPTY: Localized = { en: "", he: "" };

function ToolbarButton({
  onClick,
  active,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`h-7 min-w-7 rounded px-2 text-xs font-semibold ${
        active ? "bg-navy text-white" : "bg-white text-ink hover:bg-sand"
      }`}
    >
      {children}
    </button>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  return (
    <div className="flex flex-wrap gap-1 rounded-t border border-line bg-sand p-1">
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
      >
        B
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
      >
        I
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive("heading", { level: 2 })}
      >
        H2
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
      >
        • List
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
      >
        ❝
      </ToolbarButton>
    </div>
  );
}

function SingleEditor({
  value,
  onChange,
  dir,
}: {
  value: string;
  onChange: (html: string) => void;
  dir: "ltr" | "rtl";
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value || "",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        dir,
        class:
          "prose-content min-h-[140px] rounded-b border border-t-0 border-line bg-white px-3 py-2 text-sm focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  if (!editor) {
    return <div className="h-44 rounded border border-line bg-white" />;
  }

  return (
    <div>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

export function BilingualRichText({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: Localized;
  onChange: (next: Localized) => void;
}) {
  const v = value ?? EMPTY;
  return (
    <div>
      <label className="mb-1 block text-sm font-semibold text-navy">
        {label}
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <SingleEditor
          dir="ltr"
          value={v.en}
          onChange={(en) => onChange({ ...v, en })}
        />
        <SingleEditor
          dir="rtl"
          value={v.he}
          onChange={(he) => onChange({ ...v, he })}
        />
      </div>
    </div>
  );
}
