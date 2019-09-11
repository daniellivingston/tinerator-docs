import React, { useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import OpenGraph from './open_graph';
import { MDXProvider } from '@mdx-js/react';
import Nav from './docs/nav';

import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-diff';

const components = {
  pre: props => {
    useEffect(() => {
      Prism.highlightAll();
    });

    return <pre {...props} />;
  }
};

export default meta => ({ children }) => {
  return (
    <MDXProvider components={components}>
      <div>
        <main>
          <OpenGraph
            title={meta.title}
            description={meta.description}
            path={meta.path}
          />
          <Header pageTitle={meta.title} />

          <div className="mx-auto px-6 py-12 container sm:flex">
            <div className="flex-shrink-0 pb-12 w-48 lg:w-64">
              <Nav currentPath={meta.path} />
            </div>
            <div className="flex-grow-1 min-w-0 markdown max-w-2xl">
              {children}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </MDXProvider>
  );
};
