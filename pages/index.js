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

const formIcon = `
<svg width="33px" height="33px" viewBox="0 0 33 33" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="edit-copy-4" transform="translate(1.500000, 1.500000)" stroke="#5A67D8" stroke-width="2">
            <path d="M13.3714286,3.25714286 L2.97142857,3.25714286 C1.33035389,3.25714286 0,4.58749674 0,6.22857143 L0,27.0285714 C0,28.6696461 1.33035389,30 2.97142857,30 L23.7714286,30 C25.4125033,30 26.7428571,28.6696461 26.7428571,27.0285714 L26.7428571,16.6285714" id="Path"></path>
            <path d="M24.5142857,1.02857143 C25.7450917,-0.202234541 27.7406225,-0.20223452 28.9714285,1.02857148 C30.2022345,2.25937747 30.2022345,4.25490826 28.9714286,5.48571429 L14.8571429,19.6 L8.91428571,21.0857143 L10.4,15.1428571 L24.5142857,1.02857143 Z" id="Path"></path>
        </g>
    </g>
</svg>
`;

const paymentIcon = `
<svg width="30px" height="38px" viewBox="0 0 30 38" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="edit-copy-5" transform="translate(1.500000, 1.500000)" stroke="#38A169" stroke-width="2">
            <path d="M7.6015625,8.25714286 L2.97142857,8.25714286 C1.33035389,8.25714286 0,9.58749674 0,11.2285714 L0,32.0285714 C0,33.6696461 1.33035389,35 2.97142857,35 L23.7714286,35 C25.4125033,35 26.7428571,33.6696461 26.7428571,32.0285714 L26.7428571,25.9143066" id="Path"></path>
            <g id="dollar-sign" transform="translate(12.000000, 0.000000)">
                <line x1="7.5" y1="0" x2="7.5" y2="27" id="Path"></line>
                <path d="M13.7500001,5 L4.37500003,5 C1.95875423,5 0,6.90278981 0,9.25 C0,11.5972102 1.95875423,13.5 4.37500003,13.5 L10.6250001,13.5 C13.0412458,13.5 15,15.4027898 15,17.75 C15,20.0972102 13.0412458,22 10.6250001,22 L0,22" id="Path"></path>
            </g>
        </g>
    </g>
</svg>
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
                  <div className="text-xs text-gray-900 mr-2 py-px px-2 bg-yellow-600 rounded-full whitespace-no-wrap">
                    Step 1
                  </div>{' '}
                  <div className="text-yellow-500">
                    Configure and deploy your plugins
                  </div>
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
                  <div className="text-xs text-gray-900 mr-2 py-px px-2 bg-green-600 rounded-full whitespace-no-wrap">
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
                  <div className="text-xs text-gray-900 mr-2 py-px px-2 bg-pink-600 rounded-full whitespace-no-wrap">
                    Step 3
                  </div>{' '}
                  <div className="text-pink-500">Wire up your front-end</div>
                </h2>

                <ReactDemo />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto container pt-16 sm:pt-24 pb-8 sm:pb-16">
          <div className="px-6 mx-auto max-w-4xl">
            <h1 className="pb-4 text-4xl sm:text-5xl font-bold leading-tight tracking-tight sm:text-center text-gray-900">
              Plugins
            </h1>
            <p className="sm:pb-16 text-lg text-gray-700 sm:text-center">
              A growing collection of pluggable components.
            </p>
            <div className="-mx-2 sm:flex">
              <div className="sm:w-1/2">
                <div className="mx-2 flex rounded-lg py-12 sm:px-6">
                  <div
                    className="mr-4"
                    dangerouslySetInnerHTML={{ __html: formIcon }}
                  ></div>
                  <div>
                    <h3 className="pb-2 text-2xl font-semibold text-gray-900 tracking-snug leading-snug">
                      Forms
                    </h3>
                    <p className="pb-3 text-gray-700">
                      Gather form submissions from your frontend without writing
                      a line of backend code.
                    </p>
                    <p>
                      <Link href="/forms">
                        <a className="text-indigo-600 font-semibold">
                          Learn more &rarr;
                        </a>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              <div className="sm:w-1/2">
                <div className="mx-2 flex rounded-lg py-12 sm:px-6">
                  <div
                    className="-mt-1 mr-4"
                    dangerouslySetInnerHTML={{ __html: paymentIcon }}
                  ></div>
                  <div>
                    <h3 className="flex items-center pb-2 text-2xl font-semibold leading-snug">
                      <div className="text-gray-900 tracking-snug">
                        Payments
                      </div>
                      <div className="ml-3 px-2 py-1 rounded-full bg-green-400 text-white text-xs truncate">
                        Coming Soon
                      </div>
                    </h3>
                    <p className="pb-3 text-gray-700">
                      Implement Stripe payment flows from your frontend and let
                      us take care of the server-side stuff.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto container pb-8">
          <div className="max-w-5xl mx-auto px-6 py-16 sm:flex items-center justify-center border-t">
            <div className="mr-6 pb-8 sm:pb-0 text-lg tracking-snug text-gray-700">
              Make your static site dynamic.
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://app.statickit.com/signup"
                className="btn sm:block whitespace-no-break"
              >
                Get started free
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
