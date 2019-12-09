import React, { useState } from 'react';
import Link from 'next/link';
import Logo from './logo';
import { useRouter } from 'next/router';
import { useViewer } from '../data/viewer';
import { logout } from '../utils/auth';

function UserMenu({ viewer }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleClass = isOpen ? '' : 'hidden';

  return (
    <div className="relative flex">
      <button className="mx-4" onClick={toggleMenu}>
        <img
          src={viewer.avatarUrl}
          className="w-8 h-8 rounded-full shadow-md"
        />
      </button>
      <div
        className={`mt-12 mr-4 py-2 bg-white absolute right-0 w-32 rounded shadow-menu ${toggleClass}`}
      >
        <ul className="text-gray-700">
          <li key="logout">
            <button
              className="px-4 py-2 w-full hover:bg-gray-200 text-left"
              onClick={logout}
            >
              Log out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

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

  return <></>;
};

const SiteSwitcher = ({ currentSite }) => {
  if (!currentSite) return <></>;

  return (
    <div className="flex items-center mx-3 py-2 border border-gray-700 text-sm rounded">
      <div className="pl-3">{currentSite.name}</div>
      <div className="pointer-events-none inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

const SiteNavLink = ({ path, text }) => {
  const router = useRouter();
  const isCurrent = path == router.asPath;

  return (
    <Link href={path}>
      <a
        className={`px-3 py-2 rounded font-semibold ${
          isCurrent
            ? 'text-gray-200 bg-gray-900'
            : 'text-gray-600 hover:text-gray-500'
        }`}
      >
        {text}
      </a>
    </Link>
  );
};

const SiteNav = ({ site }) => {
  if (!site) return <></>;

  return (
    <div className="flex items-center">
      <SiteNavLink key="forms" path={`/sites/${site.id}`} text="Forms" />
      <SiteNavLink
        key="forms"
        path={`/sites/${site.id}/settings`}
        text="Settings"
      />
    </div>
  );
};

const Header = props => {
  const { data: viewerData } = useViewer({ initialData: props.viewerData });
  const textColor = props.inverted ? 'text-gray-500' : 'text-gray-600';
  const mainLinkPath = props.site ? `/sites/${props.site.id}` : '/';

  return (
    <header className="mx-auto container px-6 py-4">
      <div className="flex items-center h-10">
        <div>
          <Link href={mainLinkPath}>
            <a className="flex items-center">
              <Logo inverted={props.inverted} />
            </a>
          </Link>
        </div>
        <div className="mx-5 flex-grow flex items-center">
          <SiteNav site={props.site} />
        </div>
        <div
          className={`hidden sm:flex items-center justify-end font-semibold text-sm ${textColor}`}
        >
          <SiteSwitcher currentSite={props.site} />
          <NavLinks viewerData={viewerData} />
          <AuthControls viewerData={viewerData} />
        </div>
      </div>
    </header>
  );
};

export default Header;
