import React, { useEffect, useRef, useState } from 'react';
import Header from './header';
import Footer from './footer';
import OpenGraph from './open_graph';
import { MDXProvider } from '@mdx-js/react';
import Nav from './docs/nav';

import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-diff';

import useInterval from './use_interval';

const components = {
  pre: props => {
    useEffect(() => {
      Prism.highlightAll();
    });

    return <pre {...props} />;
  }
};

const HeaderWrapper = props => {
  const injectedClasses = props.className || '';
  const [scrolledTop, setScrolledTop] = useState(true);
  const scrollClass = scrolledTop ? '' : 'shadow-lg';

  useInterval(() => {
    setScrolledTop(window.scrollY == 0);
  }, 100);

  return (
    <div className={`${injectedClasses} ${scrollClass}`}>{props.children}</div>
  );
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
          <HeaderWrapper className="fixed top-0 left-0 right-0 bg-white z-20">
            <Header pageTitle={meta.title} />
          </HeaderWrapper>

          <div className="mx-auto px-6 pt-32 pb-12 container sm:flex">
            <div className="flex-shrink-0 relative pb-12 w-48 lg:w-64">
              <div className="sm:fixed">
                <Nav currentPath={meta.path} />
              </div>
            </div>
            <div className="flex flex-grow-1 min-w-0">
              <div className="flex-grow-1 min-w-0 markdown max-w-2xl">
                {children}
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </MDXProvider>
  );
};
