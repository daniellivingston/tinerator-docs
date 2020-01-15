import React, { useState, useEffect } from 'react';
import Highlight, { Language, defaultProps } from 'prism-react-renderer';
import { useDefaultSite } from 'utils/default-site';

interface Props {
  className: string;
  trim: boolean;
  children: string;
}

const CodeBlock: React.FC<Props> = ({ children, className, trim }) => {
  const language = className.replace(/language-/, '') as Language;
  const siteId = useDefaultSite();
  const [code, setCode] = useState(children);

  useEffect(() => {
    let newCode = children;

    if (siteId) {
      newCode = newCode.replace(/\{your-site-id\}/g, siteId);
    }

    setCode(newCode);
  }, [siteId]);

  return (
    <Highlight {...defaultProps} theme={null} code={code} language={language}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre className={className}>
          {tokens.map((line, i) => {
            if (trim && i === tokens.length - 1) return <></>;

            return (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
