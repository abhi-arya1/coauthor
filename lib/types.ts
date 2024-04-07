 
interface ChatHistory {
    items: ChatItem[]
}

interface ChatItem {
    role: string 
    parts: string[]
    pages: Page[]
}

interface Page { 
    title: string, 
    authors: string, 
    url: string, 
    date: string,
    abstract: string
}

interface ChatResponse { 
    role: string 
    parts: string[]
    pages: Page[]
    id: string 
}