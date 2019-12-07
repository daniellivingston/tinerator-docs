import React from 'react';
import Link from 'next/link';
import Logo from './logo';
import { useViewer } from '../data/viewer';
import UserMenu from '../components/user_menu';

const AuthControls = ({ viewer }) => {
  const endpoint =
    process.env.NODE_ENV === 'production'
      ? 'https://app.statickit.com'
      : 'http://localhost:4000';

  // Waiting on the request
  if (!viewer) return <></>;

  // User is not logged-in
  if (viewer === 'anonymous') {
    return (
      <>
        <Link href="/login">
          <a className="px-2">Sign In</a>
        </Link>

        <a href={`${endpoint}/signup`} className="ml-4 btn btn-sm">
          Sign Up
        </a>
      </>
    );
  }

  return <UserMenu viewer={viewer} />;
};

const NavLinks = ({ viewer }) => {
  if (!viewer || viewer === 'anonymous') {
    return (
      <>
        <Link href="/docs">
          <a className="px-2">Docs</a>
        </Link>

        <Link href="/pricing">
          <a className="px-2">Pricing</a>
        </Link>
      </>
    );
  }

  return (
    <>
      <Link href="/docs">
        <a className="px-2">Docs</a>
      </Link>
    </>
  );
};

export default props => {
  const { data: viewer } = useViewer({ initialData: props.viewer });

  return (
    <header className="mx-auto container px-6 py-4">
      <div className="flex items-center h-10">
        <div className="flex-grow">
          <Link href="/">
            <a className="flex items-center">
              <Logo inverted={props.inverted} />
            </a>
          </Link>
        </div>
        <div className="hidden sm:flex items-center justify-end font-semibold text-gray-600 text-sm">
          <NavLinks viewer={viewer} />
          <AuthControls viewer={viewer} />
        </div>
      </div>
    </header>
  );
};
