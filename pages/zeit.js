import Header from '../components/header';
import Footer from '../components/footer';
import OpenGraph from '../components/open_graph';
import FeatureGrid from '../components/feature_grid';

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
        <OpenGraph
          title={title}
          description={description}
          path="/"
          image="https://statickit.com/static/zeit-og-image.jpg"
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
              <div
                className="absolute w-64 h-64 bg-gray-stripes z-10"
                style={{ left: -10, bottom: -5 }}
              ></div>

              <div
                className="absolute w-64 h-64 bg-gray-stripes z-10"
                style={{ right: -10, top: -5 }}
              ></div>

              <div className="relative w-full z-20">
                <img
                  src="/static/zeit-screenshot.jpg"
                  alt="ZEIT screenshot"
                  className="rounded-lg"
                />
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

export default ZeitPage;
