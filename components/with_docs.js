import React, { useEffect } from 'react';
import Header from './header';
import Footer from './footer';
import OpenGraph from './open_graph';
import { MDXProvider } from '@mdx-js/react';
import Nav from './docs/nav';
import Link from 'next/link';

import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-diff';

const components = {
  pre: props => {
    useEffect(() => {
      Prism.highlightAll();
    });

    return <pre {...props} />;
  },
  a: props => {
    if (props.href.startsWith('/')) {
      return (
        <Link href={props.href}>
          <a {...props} />
        </Link>
      );
    } else {
      return <a target="_blank" {...props} />;
    }
  }
};

const TOCItem = ({ item }) => {
  const [_level, name, href] = item;

  return (
    <li className="mb-1">
      <a href={href}>{name}</a>
    </li>
  );
};

const TOC = ({ items = [] }) => {
  if (items.length == 0) return <></>;

  return (
    <div>
      <h5 className="pb-3 text-xs uppercase text-gray-600 font-bold tracking-wider">
        On this page
      </h5>
      <ul className="text-gray-700 text-sm">
        {items.map(item => (
          <TOCItem key={item[2]} item={item} />
        ))}
      </ul>
    </div>
  );
};

const PrevLink = props => {
  return (
    <Link href={props.path}>
      <a className="block flex-grow">
        <div className="pb-1 text-sm">Previous</div>
        <div className="text-xl text-indigo-600 font-semibold">
          {props.label}
        </div>
      </a>
    </Link>
  );
};

const NextLink = props => {
  return (
    <Link href={props.path}>
      <a className="block flex-grow text-right">
        <div className="pb-1 text-sm">Next</div>
        <div className="text-xl text-indigo-600 font-semibold">
          {props.label}
        </div>
      </a>
    </Link>
  );
};

const DocumentFooter = ({ prev, next }) => {
  if (!prev && !next) return <></>;
  return (
    <div className="flex my-8 py-6 border-t">
      {prev ? <PrevLink {...prev} /> : ''}
      {next ? <NextLink {...next} /> : ''}
    </div>
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
          <div className="border-b">
            <Header pageTitle={meta.title} />
          </div>
          <div className="mx-auto px-6 pt-6 pb-12 container sm:flex">
            <div className="flex-shrink-0 relative pb-12 sm:w-32 lg:w-40">
              <div className="pt-8 sm:sticky sm:top-0">
                <Nav currentPath={meta.path} />
              </div>
            </div>
            <div className="flex flex-grow min-w-0">
              <div className="pt-8 sm:ml-16 lg:mr-16 flex-grow min-w-0">
                <div className="markdown">{children}</div>
                <DocumentFooter prev={meta.prev} next={meta.next} />
              </div>
              <div className="flex-shrink-0 hidden lg:block relative w-48">
                <div className="pt-8 sticky top-0">
                  <TOC items={meta.toc} />
                </div>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </MDXProvider>
  );
};