import React from 'react';
import Link from 'next/link';
import Logo from './logo';
import { useViewer } from '../data/viewer';
import UserMenu from '../components/user_menu';

const AuthControls = ({ viewerData }) => {
  const endpoint =
    process.env.NODE_ENV === 'production'
      ? 'https://app.statickit.com'
      : 'http://localhost:4000';

  // Waiting on the request
  if (!viewerData) return <></>;

  // User is not logged-in
  if (viewerData.status === 'unauthorized') {
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

  return <UserMenu viewer={viewerData.viewer} />;
};

const NavLinks = ({ viewerData }) => {
  if (!viewerData || viewerData.status === 'unauthorized') {
    return (
      <>
        <Link href="/docs">
          <a className="block px-2">Docs</a>
        </Link>

        <Link href="/pricing">
          <a className="block px-2">Pricing</a>
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

const Header = props => {
  const { data: viewerData } = useViewer({ initialData: props.viewerData });

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
          <NavLinks viewerData={viewerData} />
          <AuthControls viewerData={viewerData} />
        </div>
      </div>
    </header>
  );
};

export default Header;
