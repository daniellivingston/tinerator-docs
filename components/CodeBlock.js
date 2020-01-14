import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';

export default ({ children, className }) => {
  const language = className.replace(/language-/, '');

  return (
    <Highlight
      {...defaultProps}
      theme={null}
      code={children}
      language={language}
    >
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre className={className}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};
