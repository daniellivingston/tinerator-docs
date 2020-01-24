import Link from 'next/link';

const QuickLinks = () => {
  return (
    <div>
      <div className="mx-auto container">
        <div className="flex flex-wrap py-12">
          <div className="px-6 py-6 w-full md:w-1/2 lg:w-1/3">
            <h2 className="flex items-center pb-3 text-xl font-semibold text-gray-800">
              <div className="mr-3">Introduction</div>
              <div className="px-2 py-px bg-orange-200 text-orange-600 text-xs font-bold rounded-full">
                Docs
              </div>
            </h2>
            <p className="pb-4 text-gray-700">
              Learn the essentials about how to install StaticKit in your
              project and make a Hello World function call.
            </p>
            <p>
              <Link href="/docs">
                <a className="text-indigo-600 font-bold">
                  Follow the guide &rarr;
                </a>
              </Link>
            </p>
          </div>

          <div className="px-6 py-6 w-full md:w-1/2 lg:w-1/3">
            <h2 className="flex items-center pb-3 text-xl font-semibold text-gray-800">
              <div className="mr-3">Functions</div>
              <div className="px-2 py-px bg-orange-200 text-orange-600 text-xs font-bold rounded-full">
                Docs
              </div>
            </h2>
            <p className="pb-4 text-gray-700">
              StaticKit functions are configurable server-side functions that
              you can call directly from your client-side JavaScript code.
            </p>
            <p>
              <Link href="/docs/functions">
                <a className="text-indigo-600 font-bold">
                  Learn about functions &rarr;
                </a>
              </Link>
            </p>
          </div>

          <div className="px-6 py-6 w-full md:w-1/2 lg:w-1/3">
            <h2 className="flex items-center pb-3 text-xl font-semibold text-gray-800">
              <div className="mr-3">CLI</div>
              <div className="px-2 py-px bg-orange-200 text-orange-600 text-xs font-bold rounded-full">
                Docs
              </div>
            </h2>
            <p className="pb-4 text-gray-700">
              The StaticKit command line interface (CLI) comes with helpful
              commands for managing your site.
            </p>
            <p>
              <Link href="/docs/cli">
                <a className="text-indigo-600 font-bold">
                  Learn about the CLI &rarr;
                </a>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickLinks;
