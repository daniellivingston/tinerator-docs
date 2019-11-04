import { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import OpenGraph from '../components/open_graph';
import CodeBlock from '../components/code_block';
import ReactDemo from '../components/react_demo';
import Link from 'next/link';

const stepOne = `
npm i -g @statickit/cli
statickit forms add newsletter "Newsletter"
statickit deploy
`;

const stepTwo = `
npm i @statickit/react
`;

function HomePage() {
  const title = 'Serverless plugins for static sites';
  const description =
    'StaticKit is a helpful companion to your favorite static site generator';

  return (
    <div>
      <main>
        <OpenGraph title={title} description={description} path="/" />
        <div className="bg-gray-900">
          <Header pageTitle={title} inverted={true} />

          <div className="mx-auto container pt-16 sm:pt-32 pb-10 sm:pb-24">
            <div className="px-6 mx-auto max-w-2xl">
              <h1 className="pb-6 text-5xl sm:text-6xl font-bold leading-tight tracking-tight sm:text-center text-gray-300">
                Serverless plugins
                <br />
                for static sites
              </h1>

              <p className="pb-24 text-lg sm:text-xl text-gray-500 sm:text-center max-w-xl mx-auto leading-relaxed">
                Static sites are awesome! But sometimes you need dynamic
                functionality, like embedded forms and payment collection.{' '}
                <strong>StaticKit is the backend you need.</strong>
              </p>

              <div className="pb-16">
                <h2 className="ml-2 pb-4 text-base font-bold flex items-center">
                  <div className="text-xs text-gray-900 mr-2 py-px px-2 bg-yellow-600 rounded-full">
                    Step 1
                  </div>{' '}
                  <div className="text-yellow-500">Provision your plugins</div>
                </h2>

                <CodeBlock className="language-shell">
                  {stepOne.trim()}
                </CodeBlock>

                <p className="px-4 pt-4 text-sm text-gray-500">
                  You can use the CLI helper commands or edit your{' '}
                  <Link href="/docs/config">
                    <a className="text-xs rounded-full mx-1 py-px px-2 font-bold font-mono bg-gray-800 text-gray-500">
                      statickit.json
                    </a>
                  </Link>{' '}
                  file by hand.
                </p>
              </div>

              <div className="pb-16">
                <h2 className="ml-2 pb-4 text-base font-bold flex items-center">
                  <div className="text-xs text-gray-900 mr-2 py-px px-2 bg-green-600 rounded-full">
                    Step 2
                  </div>{' '}
                  <div className="text-green-500">Install a client library</div>
                </h2>

                <CodeBlock className="language-shell">
                  {stepTwo.trim()}
                </CodeBlock>

                <p className="px-4 pt-4 text-sm text-gray-500">
                  We have{' '}
                  <Link href="/docs/react">
                    <a className="text-indigo-400">React</a>
                  </Link>{' '}
                  and{' '}
                  <Link href="/docs/html">
                    <a className="text-indigo-400">HTML</a>
                  </Link>{' '}
                  client libraries.
                </p>
              </div>

              <div className="pb-16">
                <h2 className="ml-2 pb-4 text-base font-bold flex items-center">
                  <div className="text-xs text-gray-900 mr-2 py-px px-2 bg-pink-600 rounded-full">
                    Step 3
                  </div>{' '}
                  <div className="text-pink-500">Wire up your front-end</div>
                </h2>

                <ReactDemo />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto container pt-16 sm:pt-24 pb-10 sm:pb-24">
          <div className="px-6 mx-auto max-w-2xl">
            <h1 className="pb-6 text-4xl sm:text-5xl font-bold leading-tight tracking-tight sm:text-center text-gray-900">
              Plugins
            </h1>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
