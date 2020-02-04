import React, { useState } from 'react';
import Link from 'next/link';
import Header from 'components/Header';
import HeadMatter from 'components/HeadMatter';
import CodeBlock from 'components/CodeBlock';
import { ViewerData } from 'data/queries';
import { useStaticKit } from '@statickit/react';
import { sendSupportEmail } from '@statickit/functions';

interface Props {
  viewerData?: ViewerData;
}

function RequestForm() {
  const client = useStaticKit();
  const [email, setEmail] = useState('');
  const [useCase, setUseCase] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitted(true);

    const resp = await sendSupportEmail(client, {
      subject: `${email} requested access to payments`,
      replyTo: email,
      fields: { useCase }
    });

    if (resp.status === 'ok') setIsSubmitted(true);
    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <p>
          <span style={{ fontSize: '80px' }}>👍</span>
        </p>
        <p className="font-bold text-gray-900 text-xl">
          Thanks for requesting access!
        </p>
        <p className="text-gray-700 text-lg">We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="pb-12 text-lg text-gray-400">
        This feature is currently in early access.
        <br />
        Ready to start building? Let us know and we'll hook you up.
      </p>
      <div className="pb-8">
        <label htmlFor="email" className="text-gray-200 pb-2 block font-bold">
          What's your email address? <span className="text-red-600">*</span>
        </label>
        <input
          id="email"
          type="email"
          className="input-field-inverse w-full"
          placeholder="me@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="pb-4">
        <label htmlFor="message" className="text-gray-200 pb-2 block font-bold">
          Briefly describe your use case <span className="text-red-600">*</span>
        </label>
        <textarea
          id="message"
          className="input-field-inverse leading-normal w-full h-32 resize-none"
          value={useCase}
          onChange={e => setUseCase(e.target.value)}
          required
        ></textarea>
      </div>

      <button type="submit" className="btn" disabled={isSubmitting}>
        Request access
      </button>
    </form>
  );
}

const PaymentsPage: React.FC<Props> = ({ viewerData }) => {
  const title = 'Payments';
  const description =
    'Charge customers and start subscriptions without writing backend code.';

  return (
    <main>
      <HeadMatter title={title} description={description} />
      <Header viewerData={viewerData} />

      <div className="mx-auto container pt-16 sm:pt-32 pb-10 sm:pb-16">
        <div className="px-6 mx-auto max-w-5xl">
          <h1 className="pb-8 text-5xl sm:text-6xl font-bold leading-none sm:leading-tighter tracking-tight sm:text-center text-gray-900">
            Accept payments without writing a line of backend code
          </h1>

          <div className="max-w-3xl mx-auto pb-12 sm:pb-24 text-xl sm:text-2xl text-gray-700 sm:text-center leading-normal sm:tracking-snug">
            <p className="pb-10">
              Our Stripe integration allows you to design custom flows for
              one-time and recurring payments, hosted directly on your website.
            </p>

            <p>
              <a href="#request-access" className="btn btn-lg">
                Request early access
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 border-b border-gray-800">
        <div className="mx-auto container py-16 sm:py-24">
          <div className="px-6 pb-16 sm:pb-24 mx-auto max-w-4xl">
            <h1 className="pb-4 text-4xl sm:text-5xl font-bold leading-tight tracking-tight sm:text-center text-gray-300">
              How It Works, In a Nutshell
            </h1>
            <p className="pb-6 text-lg sm:text-xl text-gray-500 sm:text-center mx-auto max-w-3xl">
              Configure your Stripe functions in your{' '}
              <code className="mx-1 px-3 py-1 text-base rounded-full bg-gray-800">
                statickit.json
              </code>{' '}
              file and we&rsquo;ll generate a custom npm package with
              TypeScript-enabled function definitions. This means you
              don&rsquo;t have to make any{' '}
              <code className="mx-1 px-3 py-1 text-base rounded-full bg-gray-800">
                fetch
              </code>{' '}
              calls or learn any new low-level APIs.
            </p>
            <p className="text-lg sm:text-xl text-gray-300 font-bold sm:text-center mx-auto max-w-3xl">
              All you have to do is call your functions.
            </p>
          </div>
          <div className="px-6 mx-auto max-w-5xl">
            <div className="mx-auto max-w-2xl">
              <div className="pb-16">
                <h2 className="ml-2 pb-4 text-base font-bold flex items-center">
                  <div className="text-xs text-gray-900 mr-2 py-px px-2 bg-yellow-600 rounded-full whitespace-no-wrap">
                    Step 1
                  </div>{' '}
                  <div className="text-yellow-500">Configure your backend</div>
                </h2>

                <CodeBlock className="language-json" copy={false}>
                  {`
{
  "functions": {
    "createCharge": {
      "app": "stripe",
      "type": "createCharge"
    }
  }
}
                  `}
                </CodeBlock>

                <p className="px-4 pt-4 text-sm text-gray-500">
                  This is what a
                  <span className="text-xs rounded-full mx-1 py-px px-2 font-bold font-mono bg-gray-800 text-gray-500">
                    statickit.json
                  </span>{' '}
                  file might look like.
                </p>
              </div>

              <div className="pb-16">
                <h2 className="ml-2 pb-4 text-base font-bold flex items-center">
                  <div className="text-xs text-gray-900 mr-2 py-px px-2 bg-green-600 rounded-full whitespace-no-wrap">
                    Step 2
                  </div>{' '}
                  <div className="text-green-500">Deploy your config</div>
                </h2>

                <CodeBlock className="language-shell" copy={false}>
                  {`$ statickit deploy`}
                </CodeBlock>

                <p className="px-4 pt-4 text-sm text-gray-500">
                  We'll install a
                  <span className="text-xs rounded-full mx-1 py-px px-2 font-bold font-mono bg-gray-800 text-gray-500">
                    @statickit/functions
                  </span>
                  package for you.
                </p>
              </div>

              <div className="pb-16">
                <h2 className="ml-2 pb-4 text-base font-bold flex items-center">
                  <div className="text-xs text-gray-900 mr-2 py-px px-2 bg-pink-600 rounded-full whitespace-no-wrap">
                    Step 3
                  </div>{' '}
                  <div className="text-pink-500">
                    Talk to your backend with functions
                  </div>
                </h2>

                <CodeBlock className="language-jsx" copy={false}>
                  {`
import { createCharge } from '@statickit/functions';

let { status } = await createCharge(client, {
  source: 'tok_vjf8d98ds8', // a card token from Stripe.js
  amount: 2500
});
                  `}
                </CodeBlock>
              </div>

              <p className="text-center text-lg">
                <a
                  href="https://stripe-react.statickit.now.sh/"
                  className="text-indigo-500 font-bold"
                >
                  Check out our live examples &rarr;
                </a>
              </p>
            </div>
          </div>
        </div>
        <div
          id="request-access"
          className="mx-auto container border-t border-gray-800"
        >
          <div className="mx-auto px-6 py-24 max-w-3xl">
            <RequestForm />
          </div>
          {/* <div className="max-w-5xl mx-auto px-6 py-20 sm:flex items-center justify-center border-t border-gray-800">
            <div className="mr-6 pb-8 sm:pb-0 text-lg tracking-snug text-gray-500">
              Ready to start building?
            </div>
            <div className="flex-shrink-0">
              <a href="#request-access" className="btn sm:block">
                Request access
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </main>
  );
};

export default PaymentsPage;
