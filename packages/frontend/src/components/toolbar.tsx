"use client";

import React from "react";
import { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  CodepenIcon,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export const ToolBar = ({ editor }: { editor: Editor }) => {
  return (
    <ToggleGroup size={"sm"} type="single" className="flex space-x-1">
      <ToggleGroupItem
        value="bold"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "is-active" : ""}
      >
        <Bold size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="italic"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "is-active" : ""}
      >
        <Italic size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="strike"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={editor.isActive("strike") ? "is-active" : ""}
      >
        <Strikethrough size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="code"
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "is-active" : ""}
      >
        <Code size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="heading1"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive("heading", { level: 1 }) ? "is-active" : ""}
      >
        <Heading1 size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="heading2"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive("heading", { level: 2 }) ? "is-active" : ""}
      >
        <Heading2 size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="heading3"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={editor.isActive("heading", { level: 3 }) ? "is-active" : ""}
      >
        <Heading3 size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="heading4"
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={editor.isActive("heading", { level: 4 }) ? "is-active" : ""}
      >
        <Heading4 size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="heading5"
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={editor.isActive("heading", { level: 5 }) ? "is-active" : ""}
      >
        <Heading5 size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="heading6"
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={editor.isActive("heading", { level: 6 }) ? "is-active" : ""}
      >
        <Heading6 size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="bulletList"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "is-active" : ""}
      >
        <List size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="orderedList"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "is-active" : ""}
      >
        <ListOrdered size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="codeBlock"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "is-active" : ""}
      >
        <CodepenIcon size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="blockquote"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        <Quote size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="undo"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="redo"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo size={16} />
      </ToggleGroupItem>
    </ToggleGroup>
  );
};
