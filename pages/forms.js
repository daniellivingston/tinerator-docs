import { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import OpenGraph from '../components/open_graph';
import ReactDemo from '../components/react_demo';
import StandaloneDemo from '../components/standalone_demo';
import FeatureGrid from '../components/forms_features';

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

function FormsPage() {
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
              <div className="pb-3">
                <span className="bg-indigo-600 text-sm text-white font-bold px-3 py-1 rounded-full">
                  Forms
                </span>
              </div>
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

            <div className="relative px-6 py-6 w-full sm:w-1/2 xl:w-3/5 overflow-hidden">
              <div className="relative w-full rounded-lg text-sm leading-relaxed overflow-auto bg-code z-20">
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

          <FeatureGrid />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FormsPage;
