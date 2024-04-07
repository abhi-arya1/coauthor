 
interface ChatHistory {
    items: ChatItem[]
}

interface ChatItem {
    role: string 
    parts: string[]
}

interface ChatResponse { 
    role: string 
    parts: string[]
    id: string 
}