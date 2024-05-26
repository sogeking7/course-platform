"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ToolBar } from "./toolbar";
// import { useDebounce } from "@/hooks/useDebounce";

type Props = {
  editorState: string;
  setEditorState: (richText: string) => void;
};
export const Tiptap = ({ editorState, setEditorState }: Props) => {
  const editor = useEditor({
    autofocus: false,
    extensions: [StarterKit],
    content: editorState,
    editorProps: {
      attributes: {
        class: "prose p-5 !max-w-full",
      },
    },

    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  // const debounceEditorState = useDebounce(editorState, 500);

  if (!editor) {
    return (
      <div className="p-5 !w-full bg-white border border-neutral-400 rounded-sm">
        Жүктелуде...
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between p-1 border-neutral-400 border rounded-t-sm">
        {editor && <ToolBar editor={editor} />}
      </div>
      <EditorContent
        className="border-x border-b border-neutral-400 rounded-b-sm"
        editor={editor}
      />
    </div>
  );
};
