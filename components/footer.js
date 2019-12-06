import Link from 'next/link';

export default props => (
  <footer className="bg-gray-900">
    <div className="mx-auto container px-4 py-12">
      <div className="flex flex-wrap pb-12 text-gray-500 text-base font-semibold">
        <Link href="/docs">
          <a className="px-3 pb-1 whitespace-no-wrap">Docs</a>
        </Link>

        <a
          href="https://jsfiddle.net/user/StaticKit/fiddles/"
          className="px-3 pb-1 whitespace-no-wrap"
          target="_blank"
        >
          Examples
        </a>

        <Link href="/pricing">
          <a className="px-3 pb-1">Pricing</a>
        </Link>

        <a
          href="https://github.com/unstacked/legal/blob/master/privacy-policy.md"
          target="_blank"
          className="px-3 pb-1 whitespace-no-wrap"
        >
          Privacy Policy
        </a>

        <Link href="/support">
          <a className="px-3 pb-1 whitespace-no-wrap">Support</a>
        </Link>
      </div>

      <div className="px-3 flex items-center">
        <div className="flex-grow text-sm text-gray-500">
          <span className="mr-5">Copyright &copy; 2019 Unstack, LLC</span>
        </div>
      </div>
    </div>
  </footer>
);
