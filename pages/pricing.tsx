import Header from 'components/Header';
import HeadMatter from 'components/HeadMatter';
import Link from 'next/link';

function PricingPage() {
  const title = 'Pricing';
  const description = 'Get started for free.';

  return (
    <div>
      <main>
        <HeadMatter title={title} description={description} />
        <Header />

        <div className="mx-auto px-6 pt-12 container">
          <div className="pt-6 md:pt-10 pb-12 md:pb-16">
            <h1 className="pb-4 text-4xl sm:text-5xl font-black leading-tight tracking-tight text-center">
              Fair &amp; Simple Pricing
            </h1>
            <p className="text-lg text-gray-700 text-center">
              Free in development &amp; affordable in production.
            </p>
          </div>

          <div className="md:flex max-w-5xl mx-auto border-t border-b">
            <div className="px-6 py-16 md:w-1/2 border-b md:border-b-0 md:border-r">
              <h2 className="text-center text-sm uppercase font-bold tracking-wide text-indigo-600">
                Sandbox
              </h2>
              <div className="text-center text-4xl sm:text-5xl tracking-tight font-bold">
                Free
              </div>
              <p className="text-center text-base text-gray-700">
                Great for developing your site.
              </p>
              <p className="text-center text-base text-gray-700">
                Up to 100{' '}
                <a href="#requests" className="border-b border-dashed">
                  requests
                </a>{' '}
                / month.
              </p>
              <p className="pb-2 text-center text-base text-gray-700">
                <a href="#sandbox-limits" className="border-b border-dashed">
                  Sandbox limits
                </a>{' '}
                apply.
              </p>
            </div>
            <div className="px-6 py-16 md:w-1/2">
              <h2 className="text-center text-sm uppercase font-bold tracking-wide text-indigo-600">
                Production
              </h2>
              <div className="flex items-center justify-center flex-wrap">
                <div className="py-2 sm:text-lg text-gray-600">Starts at</div>
                <div className="px-3 text-4xl sm:text-5xl font-bold tracking-tight">
                  $20
                </div>
                <div className="py-2 sm:text-lg text-gray-600">/ month</div>
              </div>
              <p className="text-center text-base text-gray-700">
                Great for live production sites.
              </p>
              <p className="text-center text-base text-gray-700">
                <a href="#requests" className="border-b border-dashed">
                  Request
                </a>{' '}
                limits scale as you grow.
              </p>
              <p className="text-center text-base text-gray-700">
                No{' '}
                <a href="#sandbox-limits" className="border-b border-dashed">
                  sandbox limits
                </a>
                .
              </p>
            </div>
          </div>

          <div className="py-16 text-center border-b">
            <Link href="/signup">
              <a className="btn focus:shadow-outline">Get started free</a>
            </Link>
          </div>

          <div className="py-16 max-w-md mx-auto">
            <dl>
              <dt>
                <h2
                  id="requests"
                  className="pb-3 text-xl font-semibold tracking-snug"
                >
                  How do request limits work?
                </h2>
              </dt>
              <dd className="pb-16">
                <p className="pb-6 text-gray-700">
                  A{' '}
                  <Link href="/docs/functions">
                    <a className="text-indigo-600">function call</a>
                  </Link>{' '}
                  and a{' '}
                  <Link href="/docs/forms">
                    <a className="text-indigo-600">form submission</a>
                  </Link>{' '}
                  each constitute a request. Here are the production tiers:
                </p>
                <div className="pb-12">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="px-3 py-3 text-center border-b text-sm">
                          Requests
                        </th>
                        <th className="px-3 py-3 text-center border-b text-sm">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 pt-3 text-center">1,000</td>
                        <td className="px-3 pt-3 text-center">
                          <span className="text-lg font-bold">$20</span>{' '}
                          <span className="text-base text-gray-600">
                            / month
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 text-center">5,000</td>
                        <td className="px-3 text-center">
                          <span className="text-lg font-bold">$50</span>{' '}
                          <span className="text-base text-gray-600">
                            / month
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-3 text-center">10,000</td>
                        <td className="px-3 text-center">
                          <span className="text-lg font-bold">$100</span>{' '}
                          <span className="text-base text-gray-600">
                            / month
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="text-gray-700">
                  Please{' '}
                  <Link href="/support">
                    <a className="text-indigo-600">reach out</a>
                  </Link>{' '}
                  if you need higher limits.
                </div>
              </dd>

              <dt>
                <h2
                  id="sandbox-limits"
                  className="pb-3 text-xl font-semibold tracking-snug"
                >
                  What are the sandbox limits?
                </h2>
              </dt>
              <dd className="pb-16">
                <p className="text-gray-700">
                  In development, requests are capped at 100 per month and some
                  functions come with specific limitations (consult the docs for
                  details). It&rsquo;s best to upgrade to a production plan
                  before going live.
                </p>
              </dd>
            </dl>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PricingPage;
