import { lazy } from 'react';
import { CodeComponent, CodeProps } from 'react-markdown/lib/ast-to-react';
import coldarkDark from 'react-syntax-highlighter/dist/esm/styles/prism/coldark-dark';
const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter/dist/esm/prism'));

const CodeBlock: CodeComponent = ({ inline, className, children }: CodeProps) => {
  if (inline !== undefined && Boolean(inline)) {
    return <code className={className}>{children}</code>;
  }
  const match = /language-(\w+)/.exec(className ?? '');
  const lang = match === null ? '' : match[1];
  return (
    <SyntaxHighlighter style={coldarkDark} language={lang}>
      {String(children.toString()).replace(/\n$/, '')}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
