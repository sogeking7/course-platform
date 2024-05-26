"use client";

import { useState } from "react";
import { Tiptap } from "./tip-tap";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export const Editor = () => {
  const [note, setNote] = useState<string>("<h1>Hello World!</h1>");
  return (
    <div className="p-5 bg-white border rounded-sm">
      <Tiptap editorState={note} setEditorState={setNote} />
      {/* <article className="prose mt-4">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{note}</ReactMarkdown>
      </article> */}
    </div>
  );
};
