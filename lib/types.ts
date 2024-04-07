 
interface ChatHistory {
    items: ChatItem[]
}

interface ChatItem {
    role: string 
    parts: string[]
    pages: string[]
}

interface Page { 
    title: string, 
    authors: string, 
    url: string, 
    date: string,
    abstract: string,
    citation: string,
    summary?: string, 
}

interface ChatResponse { 
    role: string 
    parts: string[]
    pages: Page[]
    furtherData: any
    id: string 
}