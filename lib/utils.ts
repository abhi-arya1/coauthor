import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function sendChatMessage(workspace_id: string, message: string, history: ChatItem[]): Promise<ChatResponse> {
  const transformedItems = history.map(item => {
    return {
        role: item.role,
        parts: item.parts,
    };
  });
  const response = await fetch(`https://seagull-dynamic-bear.ngrok-free.app/api/chat/${workspace_id}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      message: message,
      history: transformedItems,
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: ChatResponse = await response.json();
  return data; 
}