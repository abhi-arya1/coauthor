import { useEffect, useState } from "react";
import { BlockNoteEditor } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import * as Y from "yjs";
import LiveblocksProvider from "@liveblocks/yjs";
import { useRoom } from "../liveblocks.config";
import { useUser } from "@clerk/clerk-react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useTheme } from "next-themes";

type EditorProps = {
  doc: Y.Doc,
  provider: any;
  workspaceId: string; 
}

export function Editor({ workspaceId } : { workspaceId: string }) {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();

  // Set up Liveblocks Yjs provider
  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return <BlockNote doc={doc} provider={provider} workspaceId={workspaceId}  />;
}

function getRandomPrimaryColorHex() {
    const primaryColorsHex = ['#FF0000', '#0000FF', '#FFFF00'];
    const randomIndex = Math.floor(Math.random() * primaryColorsHex.length);
    return primaryColorsHex[randomIndex];
  }

function BlockNote({ doc, provider, workspaceId }: EditorProps) {
  const { resolvedTheme } = useTheme();
  const { user } = useUser(); 
  const updateNoteblock = useMutation(api.workspace.updateNoteblock);
  const editor: BlockNoteEditor = useCreateBlockNote({
    collaboration: {
      provider,

      // Where to store BlockNote data in the Y.Doc:
      fragment: doc.getXmlFragment(`document-store-${workspaceId}`),

      // Information for this user:
      user: {
        name: user?.fullName || "Anonymous",
        color: getRandomPrimaryColorHex(),
      },
    },
  });

  return <BlockNoteView 
    theme={resolvedTheme === "dark" ? "dark" : "light"}
    editor={editor} 
    onChange={() => {
    updateNoteblock({
        workspaceId,
        noteblock: JSON.stringify(editor.document, null, 2)
    })
  }} />;
}