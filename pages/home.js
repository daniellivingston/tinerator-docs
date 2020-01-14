import Header from 'components/header';
import OpenGraph from 'components/open_graph';
import CodeBlock from 'components/CodeBlock';
import ReactDemo from 'components/react_demo';
import Link from 'next/link';

const stepOne = `
npm i -g @statickit/cli
statickit forms add newsletter "Newsletter"
statickit deploy
`;

const stepTwo = `
npm i @statickit/react
`;

const optInFormIcon = `
<svg width="45px" height="36px" viewBox="0 0 45 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="mail" transform="translate(1.000000, 1.000000)" stroke="#ED8936" stroke-width="2">
            <path d="M4.3,0 L38.7,0 C41.065,0 43,1.9125 43,4.25 L43,29.75 C43,32.0875 41.065,34 38.7,34 L4.3,34 C1.935,34 0,32.0875 0,29.75 L0,4.25 C0,1.9125 1.935,0 4.3,0 Z" id="Path"></path>
            <polyline id="Path" points="43 4 21.5 19 0 4"></polyline>
        </g>
    </g>
</svg>
`;

const contactFormIcon = `
<svg width="42px" height="42px" viewBox="0 0 42 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="edit-copy-6" transform="translate(1.000000, 1.000000)" stroke="#5A67D8" stroke-width="2">
            <path d="M18,4 L4,4 C1.790861,4 0,5.790861 0,8 L0,36 C0,38.209139 1.790861,40 4,40 L32,40 C34.209139,40 36,38.209139 36,36 L36,22" id="Path"></path>
            <path d="M32.819583,1.23196474 C34.4622027,-0.410654938 37.1254155,-0.41065491 38.7680352,1.2319648 C40.4106549,2.87458452 40.4106549,5.53779727 38.7680353,7.18041702 L19.9312697,26.0171826 L12,28 L13.9828174,20.0687303 L32.819583,1.23196474 Z" id="Path"></path>
        </g>
    </g>
</svg>
`;

const paymentIcon = `
<svg width="45px" height="37px" viewBox="0 0 45 37" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="shopping-bag" transform="translate(1.000000, 1.000000)" stroke="#48BB78" stroke-width="2">
            <path d="M5.33333333,0 L0,7 L0,31.5 C0,33.4329966 1.59187645,35 3.55555556,35 L39.4444444,35 C41.4081236,35 43,33.4329966 43,31.5 L43,7 L37.6666667,0 L5.33333333,0 Z" id="Path"></path>
            <line x1="0" y1="7" x2="43" y2="7" id="Path"></line>
            <path d="M29,14 C29,17.8659932 25.8659932,21 22,21 C18.1340068,21 15,17.8659932 15,14" id="Path"></path>
        </g>
    </g>
</svg>
`;

function HomePage(props) {
  const title = 'Serverless Plugins for Static Sites';
  const description = 'Opt-in forms, contact forms, payments, and more.';

  return (
    <div>
      <main>
        <OpenGraph title={title} description={description} path="/" />
        <div className="bg-gray-900">
          <Header inverted={true} viewerData={props.viewerData} />

          <div className="mx-auto container pt-16 sm:pt-32 pb-10 sm:pb-24">
            <div className="px-6 mx-auto max-w-5xl">
              <h1 className="pb-6 text-5xl sm:text-6xl font-bold leading-none sm:leading-tighter tracking-tight sm:text-center text-white">
                Why write backend code if you don&rsquo;t have to?
              </h1>

              <div className="max-w-xl mx-auto pb-24 text-xl sm:text-2xl text-gray-500 sm:text-center leading-snug sm:tracking-snug">
                <p className="pb-4">
                  Static sites are awesome! But sometimes you{' '}
                  <strong>need</strong> a backend for things like forms and
                  payments.
                </p>

                <p>
                  <strong className="mt-4 text-gray-300">
                    StaticKit is the serverless backend for static sites.
                  </strong>
                </p>
              </div>

              <div className="mx-auto max-w-2xl">
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
                    <div className="text-green-500">
                      Install a client library
                    </div>
                  </h2>

                  <CodeBlock className="language-shell">
                    {stepTwo.trim()}
                  </CodeBlock>

                  <p className="px-4 pt-4 text-sm text-gray-500">
                    We have{' '}
                    <Link href="/docs/forms/react">
                      <a className="text-indigo-400">React</a>
                    </Link>{' '}
                    and{' '}
                    <Link href="/docs/forms/html">
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
        </div>

        <div className="mx-auto container pt-16 sm:pt-24 pb-8 sm:pb-16">
          <div className="px-6 mx-auto max-w-4xl">
            <h1 className="pb-6 text-3xl sm:text-5xl font-bold leading-tight tracking-tight sm:text-center text-gray-900">
              Powerful plugins at your fingertips
            </h1>
            <p className="pb-6 sm:pb-16 text-lg sm:text-xl text-gray-700 sm:text-center mx-auto max-w-2xl">
              We have a growing collection of plugins, so you can skip hacking
              together serverless functions or building a whole backend app.
            </p>
            <div className="-mx-2 sm:flex flex-wrap">
              <div className="sm:w-1/2">
                <div className="mx-2 py-12 sm:px-6">
                  <div className="pb-4 h-16 flex items-end">
                    <div
                      dangerouslySetInnerHTML={{ __html: optInFormIcon }}
                    ></div>
                  </div>

                  <h3 className="pb-2 text-2xl font-semibold tracking-snug leading-snug">
                    <Link href="/opt-in-forms">
                      <a className="text-gray-900 hover:text-indigo-600">
                        Opt-In Forms
                      </a>
                    </Link>
                  </h3>
                  <p className="pb-2 text-gray-700">
                    Collect email addresses and forward them along to your email
                    marketing app.
                  </p>
                  <p>
                    <Link href="/opt-in-forms">
                      <a className="text-indigo-600 font-semibold">
                        Learn more &rarr;
                      </a>
                    </Link>
                  </p>
                </div>
              </div>

              <div className="sm:w-1/2">
                <div className="mx-2 py-12 sm:px-6">
                  <div className="pb-4 h-16 flex items-end">
                    <div
                      dangerouslySetInnerHTML={{ __html: contactFormIcon }}
                    ></div>
                  </div>

                  <h3 className="pb-2 text-2xl font-semibold tracking-snug leading-snug">
                    <Link href="/contact-forms">
                      <a className="text-gray-900 hover:text-indigo-600">
                        Contact Forms
                      </a>
                    </Link>
                  </h3>
                  <p className="pb-2 text-gray-700">
                    Gather contact form submissions and send a notification
                    email to the right people.
                  </p>
                  <p>
                    <Link href="/contact-forms">
                      <a className="text-indigo-600 font-semibold">
                        Learn more &rarr;
                      </a>
                    </Link>
                  </p>
                </div>
              </div>

              <div className="sm:w-1/2">
                <div className="mx-2 py-12 sm:px-6">
                  <div className="pb-4 h-16 flex items-end">
                    <div
                      dangerouslySetInnerHTML={{ __html: paymentIcon }}
                    ></div>
                  </div>

                  <h3 className="pb-2 text-2xl font-semibold tracking-snug leading-snug text-gray-900">
                    Payments
                  </h3>
                  <p className="pb-2 text-gray-700">
                    Build{' '}
                    <a
                      href="https://stripe.com/docs/strong-customer-authentication"
                      className="text-indigo-600"
                      target="_blank"
                    >
                      SCA-ready
                    </a>{' '}
                    purchase flows for one-time purchases, SaaS subscriptions,
                    and more, without writing any backend code.
                  </p>
                  <p>
                    <span className="px-2 py-1 rounded-full bg-green-400 text-white text-xs truncate font-bold">
                      Coming Soon
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto container">
          <div className="max-w-5xl mx-auto px-6 py-20 sm:flex items-center justify-center border-t">
            <div className="mr-6 pb-8 sm:pb-0 text-lg tracking-snug text-gray-700">
              Breathe life into your static site.
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
    </div>
  );
}

export default HomePage;
