import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Logo from './logo';

const AuthControls = ({ signedIn }) => {
  if (signedIn) {
    return (
      <a href="https://app.statickit.com/" className="ml-4 btn btn-sm">
        Dashboard
      </a>
    );
  }

  return (
    <>
      <a href="https://app.statickit.com/signin" className="px-2">
        Sign In
      </a>
      <a href="https://app.statickit.com/signup" className="ml-4 btn btn-sm">
        Sign Up
      </a>
    </>
  );
};

const Nav = () => {
  const [signedIn, setSignedIn] = useState(null);

  useEffect(() => {
    setSignedIn(
      document.cookie.split(';').filter(item => item.includes('signed_in=true'))
        .length > 0
    );
  });

  if (signedIn == null) {
    return <></>;
  }

  return (
    <>
      <Link href="/docs">
        <a className="px-2">Docs</a>
      </Link>

      <Link href="/pricing">
        <a className="px-2">Pricing</a>
      </Link>

      <AuthControls signedIn={signedIn} />
    </>
  );
};

export default props => (
  <header className="mx-auto container px-6 py-4">
    <Head>
      <title>{props.pageTitle} · StaticKit</title>
      <link rel="shortcut icon" href="/favicon.png"></link>
    </Head>
    <div className="flex items-center h-10">
      <div className="flex-grow">
        <Link href="/">
          <a className="flex items-center">
            <Logo inverted={props.inverted} />
          </a>
        </Link>
      </div>
      <div className="hidden sm:block font-semibold text-gray-600 text-sm">
        <Nav />
      </div>
    </div>
  </header>
);
