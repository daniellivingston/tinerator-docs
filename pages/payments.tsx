import React from 'react';
import Link from 'next/link';
import Header from 'components/Header';
import HeadMatter from 'components/HeadMatter';

const PaymentsPage: React.FC<{}> = () => {
  const title = 'Payments';
  const description =
    'Charge customers and start subscriptions without writing backend code.';

  return (
    <main>
      <HeadMatter title={title} description={description} />
      <Header />

      <div className="mx-auto container pt-16 sm:pt-32 pb-10 sm:pb-16">
        <div className="px-6 mx-auto max-w-5xl">
          <h1 className="pb-8 text-5xl sm:text-6xl font-black leading-none sm:leading-tighter tracking-tight sm:text-center text-gray-900">
            Payment Forms
          </h1>

          <div className="max-w-5xl mx-auto pb-12 sm:pb-24 text-xl sm:text-2xl text-gray-700 sm:text-center leading-normal sm:tracking-snug">
            <p className="mx-auto pb-12 max-w-3xl">
              Our Stripe integration allows you to design custom flows for
              one-time and recurring payments, hosted directly on your website.
            </p>

            <div className="pb-16">
              <iframe
                className="mx-auto w-full rounded-lg"
                style={{ height: '600px' }}
                src="https://stripe-react.statickit.now.sh"
              ></iframe>
            </div>

            <p>
              <Link href="/guides/stripe-payments-react">
                <a className="btn btn-lg">Read the guide</a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PaymentsPage;
