"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { ToolBar } from "./toolbar";
// import { useDebounce } from "@/hooks/useDebounce";

type Props = {
  editorState: string;
  placeholder?: string;
  setEditorState: (richText: string) => void;
};
export const Tiptap = ({
  editorState,
  setEditorState,
  placeholder = "Толтырыңыз",
}: Props) => {
  const editor = useEditor({
    autofocus: false,
    extensions: [
      StarterKit,
      Placeholder.configure({
        // Use a placeholder:
        placeholder: `${placeholder}…`,
        // Use different placeholders depending on the node type:
        // placeholder: ({ node }) => {
        //   if (node.type.name === 'heading') {
        //     return 'What’s the title?'
        //   }

        //   return 'Can you add some further context?'
        // },
      }),
    ],
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
      <div className="p-5 !w-full bg-white border border-neutral-300 rounded-xl">
        Жүктелуде...
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between p-1 border-neutral-300 border rounded-t-xl">
        {editor && <ToolBar editor={editor} />}
      </div>
      <EditorContent
        placeholder={placeholder}
        className="border-x border-b border-neutral-300 rounded-b-xl"
        editor={editor}
      />
    </div>
  );
};
