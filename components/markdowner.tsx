import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';
import React, { useState, useEffect } from 'react';

export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(markdown);
  return result.toString();
}

interface MarkdownContentProps {
  markdown: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ markdown }) => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    markdownToHtml(markdown).then(setHtmlContent);
  }, [markdown]);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

export default MarkdownContent;