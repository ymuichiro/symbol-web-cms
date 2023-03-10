import { CSSProperties, lazy } from 'react';
import { CodeComponent, CodeProps } from 'react-markdown/lib/ast-to-react';
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/vs-dark';
const SyntaxHighlighter = lazy(() => import('react-syntax-highlighter/dist/cjs/prism'));

const codeStyle: CSSProperties = {
  color: '#42a5f5',
  borderRadius: '4px',
  backgroundColor: '#212121',
  paddingLeft: '3px',
  paddingRight: '3px',
};

const CodeBlock: CodeComponent = ({ inline, className, children }: CodeProps) => {
  if (inline !== undefined && Boolean(inline)) {
    return (
      <code className={className} style={codeStyle}>
        {children}
      </code>
    );
  }
  const match = /language-(\w+)/.exec(className ?? '');
  const lang = match === null ? '' : match[1];
  return (
    <SyntaxHighlighter style={dark} language={lang}>
      {String(children.toString()).replace(/\n$/, '')}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
