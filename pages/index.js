import { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import OpenGraph from '../components/open_graph';
import ReactDemo from '../components/react_demo';
import StandaloneDemo from '../components/standalone_demo';

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

function HomePage() {
  const title = 'Modern forms for static sites';
  const description =
    'Gather form submissions from your frontend without writing a line of backend code.';

  const [tab, setTab] = useState(1);

  const tabClass = (idx, selected) => {
    if (idx == selected) {
      return 'px-4 py-3 font-bold text-white focus:outline-none bg-code';
    } else {
      return 'px-4 py-3 font-bold text-white focus:outline-none';
    }
  };

  const tabContent = selected => {
    switch (selected) {
      case 0:
        return <StandaloneDemo />;
      case 1:
        return <ReactDemo />;
      default:
        return '';
    }
  };

  return (
    <div>
      <main>
        <OpenGraph title={title} description={description} path="/" />
        <Header pageTitle={title} />

        <div className="mx-auto pt-16 container">
          <div className="pb-16 sm:pb-32 flex flex-wrap">
            <div className="px-6 pb-16 sm:pt-16 sm:pb-0 w-full sm:w-1/2 xl:w-2/5">
              <h1 className="pb-6 text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
                {title}
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
                href="https://app.statickit.com/signup"
                className="btn btn-lg focus:shadow-outline"
              >
                Get started now
              </a>
            </div>

            <div className="relative px-6 py-6 w-full sm:w-1/2 xl:w-3/5">
              <div
                className="absolute w-64 h-64 bg-gray-stripes z-10 bottom-0"
                style={{ marginLeft: -40, marginBottom: -5 }}
              ></div>

              <div
                className="absolute w-64 h-64 bg-gray-stripes z-10 right-0 top-0"
                style={{ marginRight: -10, marginTop: -5 }}
              ></div>

              <div className="relative mb-2 w-full rounded-lg text-sm leading-relaxed overflow-auto bg-code z-20">
                <div className="flex bg-gray-700 rounded-t">
                  <button
                    className={tabClass(1, tab)}
                    onClick={() => setTab(1)}
                  >
                    React
                  </button>
                  <button
                    className={tabClass(0, tab)}
                    onClick={() => setTab(0)}
                  >
                    Plain HTML
                  </button>
                </div>

                <div>{tabContent(tab)}</div>
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

      <Footer />
    </div>
  );
}

export default HomePage;
