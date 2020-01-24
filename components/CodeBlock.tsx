import React, { useState, useEffect } from 'react';
import Highlight, { Language, defaultProps } from 'prism-react-renderer';
import { useDefaultSite } from 'utils/default-site';
import useSiteData from 'components/useSiteData';
import useViewerData from 'components/useViewerData';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const copyIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clipboard"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
`;

interface Props {
  className: string;
  children: string;
  highlight?: string;
}

const CodeBlock: React.FC<Props> = ({ children, className, highlight }) => {
  const language = className.replace(/language-/, '') as Language;
  const siteId = useDefaultSite();
  const { data: siteData } = useSiteData(siteId);
  const { data: viewerData } = useViewerData();
  const [code, setCode] = useState(children.trim());

  const highlightedLines = highlight ? highlight.split(',') : [];

  useEffect(() => {
    let newCode = children;

    if (siteId) {
      newCode = newCode.replace(/\{your-site-id\}/g, siteId);
    }

    if (siteData && siteData.status == 'ok') {
      newCode = newCode.replace(/<your-deploy-key>/g, siteData.site.deployKey);
    }

    if (viewerData && viewerData.status == 'ok') {
      newCode = newCode.replace(
        /\{your-email-address\}/g,
        viewerData.viewer.email
      );
    }

    setCode(newCode.trim());
  }, [siteId, siteData, viewerData]);

  return (
    <div className="code-block relative">
      <Highlight {...defaultProps} theme={null} code={code} language={language}>
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <pre className={className}>
            {tokens.map((line, i) => {
              let isHighlighted = highlightedLines.includes((i + 1).toString());
              let className = isHighlighted ? 'px-4 bg-gray-700' : 'px-4';

              return (
                <div key={i} {...getLineProps({ line, className, key: i })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token, key })} />
                  ))}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>

      <CopyToClipboard text={code}>
        <button className="absolute top-0 right-0 flex p-3 text-gray-300 bg-gray-800 rounded-tr-lg">
          <span dangerouslySetInnerHTML={{ __html: copyIcon }} />
        </button>
      </CopyToClipboard>
    </div>
  );
};

export default CodeBlock;
