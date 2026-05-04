'use client';

import { useRef, useEffect, useCallback } from 'react';

interface RichTextEditorProps {
  value:    string;
  onChange: (value: string) => void;
}

const COMMANDS: { label: string; cmd: string; value?: string }[] = [
  { label: 'B',   cmd: 'bold' },
  { label: 'I',   cmd: 'italic' },
  { label: 'U',   cmd: 'underline' },
  { label: 'H2',  cmd: 'formatBlock', value: 'h2' },
  { label: 'H3',  cmd: 'formatBlock', value: 'h3' },
  { label: '• List', cmd: 'insertUnorderedList' },
  { label: '1. List', cmd: 'insertOrderedList' },
  { label: 'Link', cmd: 'createLink', value: '__prompt__' },
  { label: 'Clear', cmd: 'removeFormat' },
];

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const isInternalChange = useRef(false);

  useEffect(() => {
    const el = editorRef.current;
    if (!el || isInternalChange.current) return;
    if (el.innerHTML !== value) el.innerHTML = value;
  }, [value]);

  const handleInput = useCallback(() => {
    isInternalChange.current = true;
    onChange(editorRef.current?.innerHTML ?? '');
    setTimeout(() => { isInternalChange.current = false; }, 0);
  }, [onChange]);

  const exec = (cmd: string, val?: string) => {
    let finalVal: string | undefined = val;
    if (val === '__prompt__') {
      const url = window.prompt('Enter URL:');
      if (!url) return;
      finalVal = url;
    }
    document.execCommand(cmd, false, finalVal);
    editorRef.current?.focus();
    handleInput();
  };

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-slate-50 border-b border-slate-200">
        {COMMANDS.map(({ label, cmd, value: val }) => (
          <button
            key={label}
            type="button"
            onMouseDown={(e) => { e.preventDefault(); exec(cmd, val); }}
            className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-white rounded border border-transparent hover:border-slate-200 transition-all"
          >
            {label}
          </button>
        ))}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        className="min-h-48 p-4 text-sm text-slate-700 focus:outline-none prose-content"
        style={{ lineHeight: 1.7 }}
      />
    </div>
  );
}
