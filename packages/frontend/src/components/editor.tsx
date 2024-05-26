"use client";

import { useState } from "react";
import { Tiptap } from "./tip-tap";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export const Editor = () => {
  const [note, setNote] = useState<string>("<h1>Hello World!</h1>");
  return (
    <div>
      <Tiptap editorState={note} setEditorState={setNote} />
      {/* <article className="prose mt-4">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{note}</ReactMarkdown>
      </article> */}
    </div>
  );
};
