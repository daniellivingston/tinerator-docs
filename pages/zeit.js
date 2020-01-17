import Header from 'components/Header';
import HeadMatter from 'components/HeadMatter';

const checkIcon = `
<svg width="31px" height="31px" viewBox="0 0 31 31" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
        <g id="check-circle-inside-copy" transform="translate(1.500000, 1.500000)">
            <circle id="Oval" stroke="#5A67D8" stroke-width="2" fill="#5A67D8" cx="14" cy="14" r="14"></circle>
            <path d="M20.3,10.5 L12.6000004,18.2" id="Path" stroke="#FFFFFF" stroke-width="3"></path>
            <path d="M9.1,14.7 L12.6,18.2" id="Path" stroke="#FFFFFF" stroke-width="3"></path>
        </g>
    </g>
</svg>
`;

function ZeitPage() {
  const title = 'StaticKit + ZEIT Integration';
  const description =
    'Provision new forms right from your ZEIT account with our first-class integration.';

  return (
    <div>
      <main>
        <HeadMatter
          title={title}
          description={description}
          image="https://statickit.com/static/zeit-og.jpg"
          twitterCard="summary_large_image"
        />
        <Header pageTitle={title} />

        <div className="mx-auto pt-16 container">
          <div className="pb-16 md:pb-32 lg:flex items-start flex-wrap">
            <div className="px-6 pb-24 sm:pt-16 w-full lg:w-1/2 xl:w-2/5">
              <h1 className="flex flex-wrap justify-start pb-6 text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                <div>StaticKit</div>
                <div className="relative mx-3 w-12">
                  <div className="absolute text-red-600 heartbeat">♥️</div>
                </div>
                <div>ZEIT</div>
              </h1>

              <p className="pb-8 lg:pr-24 text-lg lg:text-xl text-gray-700">
                {description}
              </p>

              <ul className="pb-12 text-lg lg:text-xl text-gray-900 font-bold">
                <li key="contact-forms" className="pb-2 flex items-center">
                  <div
                    className="mr-3"
                    dangerouslySetInnerHTML={{ __html: checkIcon }}
                  />
                  Contact forms
                </li>

                <li key="landing-pages" className="pb-2 flex items-center">
                  <div
                    className="mr-3"
                    dangerouslySetInnerHTML={{ __html: checkIcon }}
                  />
                  Email opt-in forms
                </li>

                <li key="feedback-surveys" className="pb-2 flex items-center">
                  <div
                    className="mr-3"
                    dangerouslySetInnerHTML={{ __html: checkIcon }}
                  />
                  Feedback surveys
                </li>
              </ul>

              <a
                href="https://zeit.co/integrations/statickit"
                className="btn btn-lg focus:shadow-outline"
              >
                Install in ZEIT
              </a>
            </div>

            <div className="relative px-6 py-6 w-full lg:w-1/2 xl:w-3/5 overflow-hidden">
              <div className="relative w-full z-20">
                <img
                  src="/static/zeit-screenshot.jpg"
                  alt="ZEIT screenshot"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="pb-24">
            <h2 className="px-6 pb-8 text-4xl lg:text-5xl leading-tight tracking-tight font-bold">
              Batteries Included
            </h2>

            <div className="flex flex-wrap">
              <div className="px-6 py-4 sm:py-8 sm:w-1/2 lg:w-1/4">
                <h3 className="pb-3 text-2xl leading-tight tracking-tight font-semibold">
                  Built-In React Support
                </h3>

                <p className="text-gray-700">
                  Our <code className="inline-code">useForm</code> hook works
                  great with Next.js, Gatsby, and other React environments.
                </p>
              </div>

              <div className="px-6 py-4 sm:py-8 sm:w-1/2 lg:w-1/4">
                <h3 className="pb-3 text-2xl leading-tight tracking-tight font-semibold">
                  Storage and Exports
                </h3>

                <p className="text-gray-700">
                  We store your submissions for you and allow you to export them
                  to CSV.
                </p>
              </div>

              <div className="px-6 py-4 sm:py-8 sm:w-1/2 lg:w-1/4">
                <h3 className="pb-3 text-2xl leading-tight tracking-tight font-semibold">
                  Spam Protection
                </h3>

                <p className="text-gray-700">
                  Our proprietary spam algorithm keeps bots away, without
                  subjecting users to reCAPTCHA.
                </p>
              </div>

              <div className="px-6 py-4 sm:py-8 sm:w-1/2 lg:w-1/4">
                <h3 className="pb-3 text-2xl leading-tight tracking-tight font-semibold">
                  Email Notifications
                </h3>

                <p className="text-gray-700">
                  Configure one or more email notifications any time your form
                  is submitted.
                </p>
              </div>

              <div className="px-6 py-4 sm:py-8 sm:w-1/2 lg:w-1/4">
                <h3 className="pb-3 text-2xl leading-tight tracking-tight font-semibold">
                  Server-Side Rules
                </h3>

                <p className="text-gray-700">
                  Ensure invalid submissions don't slip through by setting rules
                  on the server-side.
                </p>
              </div>

              <div className="px-6 py-4 sm:py-8 sm:w-1/2 lg:w-1/4">
                <h3 className="pb-3 text-2xl leading-tight tracking-tight font-semibold">
                  Field Whitelisting
                </h3>

                <p className="text-gray-700">
                  Block unwanted fields from coming through, to keep your
                  dataset squeaky clean.
                </p>
              </div>

              <div className="px-6 py-4 sm:py-8 sm:w-1/2 lg:w-1/4">
                <h3 className="pb-3 text-2xl leading-tight tracking-tight font-semibold">
                  Zapier Integration
                </h3>

                <p className="text-gray-700">
                  Forward your form submissions anywhere with our first-class
                  Zapier integration.
                </p>
              </div>

              <div className="px-6 py-4 sm:py-8 sm:w-1/2 lg:w-1/4">
                <h3 className="pb-3 text-2xl leading-tight tracking-tight font-semibold">
                  Webhooks
                </h3>

                <p className="text-gray-700">
                  POST to an HTTP endpoint of your choosing any time your form
                  submitted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ZeitPage;
