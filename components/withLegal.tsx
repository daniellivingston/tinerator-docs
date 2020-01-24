import React from 'react';
import Header from 'components/Header';
import HeadMatter from 'components/HeadMatter';
import { MDXProvider } from '@mdx-js/react';
import Link from 'next/link';
import CodeBlock from './CodeBlock';

const components = {
  a: props => {
    if (props.href.startsWith('/') || props.href.startsWith('#')) {
      return (
        <Link href={props.href}>
          <a {...props} />
        </Link>
      );
    } else {
      return <a target="_blank" {...props} />;
    }
  },
  pre: props => <div {...props} />,
  code: props => <CodeBlock {...props} />
};

export default meta => ({ children }) => {
  return (
    <MDXProvider components={components}>
      <div>
        <main>
          <HeadMatter title={meta.title} description={meta.description} />
          <div className="border-b">
            <Header />
          </div>
          <div className="mx-auto max-w-2xl px-6 py-16">
            <div className="markdown">{children}</div>
          </div>
        </main>
      </div>
    </MDXProvider>
  );
};
