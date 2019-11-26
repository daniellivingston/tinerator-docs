import Header from '../components/header';
import Footer from '../components/footer';
import OpenGraph from '../components/open_graph';
import CodeBlock from '../components/code_block';
import ReactDemo from '../components/demos/mailchimp';
import Link from 'next/link';

const stepOne = `
{
  "forms": {
    "newsletter": {
      "name": "Newsletter",
      "actions": [
        { "app": "mailchimp", "type": "addOrUpdateContact" }
      ]
    }
  }
}
`;

const stepTwo = `
statickit secrets add mailchimp-api-key <...>
`;

const stepThree = `
statickit deploy
`;

function OptInFormsPage() {
  const title = 'Email Opt-In Forms';
  const description = 'The easiest way to gather email addresses.';

  return (
    <div>
      <main>
        <OpenGraph title={title} description={description} path="/" />
        <div className="bg-gray-900">
          <Header pageTitle={title} inverted={true} />

          <div className="mx-auto container pt-16 sm:pt-24 pb-10 sm:pb-24">
            <div className="px-6 mx-auto max-w-4xl">
              <div className="mb-12 pb-6 border-b-4 border-gray-800 mx-auto max-w-sm uppercase text-indigo-400 text-sm tracking-widest font-bold text-center">
                Email Opt-In Forms
              </div>
              <h1 className="pb-6 text-5xl sm:text-6xl font-bold leading-none sm:leading-tighter tracking-tight sm:text-center text-white">
                Stop fighting with messy opt-in form markup
              </h1>

              <div className="max-w-2xl mx-auto pb-24 text-xl sm:text-2xl text-gray-500 sm:text-center leading-snug sm:tracking-snug">
                <p className="pb-8">
                  Your email marketing app gives you opt-in forms, but
                  let&rsquo;s be honest: they&rsquo;re a pain to style, you
                  don&rsquo;t have much control over their behavior, and
                  you&rsquo;re never quite sure if you&rsquo;re going to
                  accidentally break them.
                </p>

                <p className="pb-8">
                  <strong class="font-bold text-gray-300">
                    StaticKit makes gathering emails a breeze.
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
                      Connect your form to Mailchimp
                    </div>
                  </h2>

                  <CodeBlock className="language-json">
                    {stepOne.trim()}
                  </CodeBlock>

                  <p className="px-4 pt-4 text-sm text-gray-500">
                    An example of a{' '}
                    <Link href="/docs/config">
                      <a className="text-xs rounded-full mx-1 py-px px-2 font-bold font-mono bg-gray-800 text-gray-500">
                        statickit.json
                      </a>
                    </Link>{' '}
                    file.
                  </p>
                </div>

                <div className="pb-16">
                  <h2 className="ml-2 pb-4 text-base font-bold flex items-center">
                    <div className="text-xs text-gray-900 mr-2 py-px px-2 bg-red-600 rounded-full whitespace-no-wrap">
                      Step 2
                    </div>{' '}
                    <div className="text-red-500">
                      Authenticate your Mailchimp account
                    </div>
                  </h2>

                  <CodeBlock className="language-text">
                    {stepTwo.trim()}
                  </CodeBlock>
                </div>

                <div className="pb-16">
                  <h2 className="ml-2 pb-4 text-base font-bold flex items-center">
                    <div className="text-xs text-gray-900 mr-2 py-px px-2 bg-green-600 rounded-full whitespace-no-wrap">
                      Step 3
                    </div>{' '}
                    <div className="text-green-500">Deploy to StaticKit</div>
                  </h2>

                  <CodeBlock className="language-shell">
                    {stepThree.trim()}
                  </CodeBlock>
                </div>

                <div className="pb-16">
                  <h2 className="ml-2 pb-4 text-base font-bold flex items-center">
                    <div className="text-xs text-gray-900 mr-2 py-px px-2 bg-pink-600 rounded-full whitespace-no-wrap">
                      Step 4
                    </div>{' '}
                    <div className="text-pink-500">Design your interface</div>
                  </h2>

                  <ReactDemo />

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
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto container pb-8">
          <div className="max-w-5xl mx-auto px-6 py-16 sm:flex items-center justify-center border-t">
            <div className="mr-6 pb-8 sm:pb-0 text-lg tracking-snug text-gray-700">
              Start gathering email subscribers.
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

export default OptInFormsPage;
