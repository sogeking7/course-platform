"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ToolBar } from "./toolbar";
import { Button } from "./ui/button";
import { useDebounce } from "@/hooks/useDebounce";

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
        class: "prose p-5 ",
      },
    },

    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  const debounceEditorState = useDebounce(editorState, 500);

  const saveNote = () => {
    console.log(editorState);
  };

  if (!editor) {
    return <div className="p-5 bg-white border rounded-sm">Жүктелуде...</div>;
  }

  return (
    <div className="p-5 bg-white border rounded-sm">
      <div className="flex justify-between mb-2">
        {editor && <ToolBar editor={editor} />}
        <Button onClick={saveNote}>Save</Button>
      </div>
      <EditorContent className="border rounded-sm" editor={editor} />
    </div>
  );
};
