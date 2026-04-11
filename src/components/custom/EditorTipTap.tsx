import { SimpleEditor } from '@/components/tiptap-templates/simple/simple-editor'

interface EditorTipTapProps {
  value?: string;
  onChange?: (content: string) => void;
}

export default function EditorTipTap({ value, onChange }: EditorTipTapProps) {
  return <SimpleEditor initialContent={value} onContentChange={onChange} />
}