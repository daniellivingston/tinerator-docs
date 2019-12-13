import React, { useState, useContext } from 'react';
import Link from 'next/link';
import Logo from './logo';
import SiteContext from '../components/site_context';
import OutsideClickHandler from 'react-outside-click-handler';
import { useRouter } from 'next/router';
import { useViewer } from '../data/viewer';
import { useSite } from '../data/site';
import { useSites } from '../data/sites';
import { logout } from '../utils/auth';

function UserMenu({ viewer }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleClass = isOpen ? '' : 'hidden';

  return (
    <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
      <div className="relative flex">
        <button className="ml-4 flex-shrink-0" onClick={toggleMenu}>
          <img
            src={viewer.avatarUrl}
            className="w-8 h-8 rounded-full shadow-md"
          />
        </button>
        <div
          className={`mt-12 py-2 bg-white absolute right-0 w-32 rounded shadow-menu ${toggleClass}`}
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
    </OutsideClickHandler>
  );
}

const GlobalNav = ({ viewerData }) => {
  if (!viewerData) return <></>;

  if (viewerData.status === 'unauthorized') {
    return (
      <>
        <Link href="/docs">
          <a className="block px-2">Docs</a>
        </Link>

        <Link href="/pricing">
          <a className="block px-2">Pricing</a>
        </Link>

        <Link href="/login">
          <a className="px-2">Sign In</a>
        </Link>

        <Link href="/signup">
          <a className="ml-4 btn btn-sm">Sign Up</a>
        </Link>
      </>
    );
  }

  return <UserMenu viewer={viewerData.viewer} />;
};

const SiteMenuItem = ({ site, inApp }) => {
  const { setSiteId } = useContext(SiteContext);

  if (inApp) {
    return (
      <li>
        <Link href={`/sites/${site.id}`}>
          <a className="block px-4 py-2 w-full hover:bg-gray-200 text-left">
            {site.name}
          </a>
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={() => setSiteId(site.id)}
        className="block px-4 py-2 w-full hover:bg-gray-200 text-left"
      >
        {site.name}
      </button>
    </li>
  );
};

const SiteMenu = ({ currentSite, inverted, inApp }) => {
  if (!currentSite) return <></>;

  const { data: sitesData } = useSites();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleClass = isOpen ? '' : 'hidden';

  return (
    <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
      <div className="relative flex mx-3">
        <button
          className={`flex items-center py-2 border text-sm rounded cursor-pointer font-semibold ${
            inverted
              ? 'border-gray-700 hover:bg-gray-800'
              : 'border-gray-400 hover:bg-gray-200'
          }`}
          onClick={toggleMenu}
        >
          <div className="pl-3 whitespace-no-wrap">{currentSite.name}</div>
          <div className="pointer-events-none inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </button>
        <div
          className={`mt-12 py-2 w-40 bg-white absolute right-0 rounded shadow-menu z-20 font-normal ${toggleClass}`}
        >
          <ul className="text-gray-700">
            {sitesData &&
              sitesData.sites.edges.map(({ node }) => (
                <SiteMenuItem key={node.id} site={node} inApp={inApp} />
              ))}
            <li key="logout" className="mt-2 pt-2 border-t">
              <Link href="/sites/new">
                <a className="block px-4 py-2 w-full hover:bg-gray-200 text-left">
                  Create a new site
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </OutsideClickHandler>
  );
};

const AppNavItem = ({ path, text, inverted }) => {
  const router = useRouter();
  const isCurrent = path == router.asPath;

  return (
    <Link href={path}>
      <a
        className={`px-3 py-2 rounded font-semibold ${
          isCurrent
            ? `${inverted ? 'text-gray-200' : 'text-gray-900'}`
            : `${
                inverted
                  ? 'text-gray-600 hover:text-gray-500'
                  : 'text-gray-600 hover:text-gray-700'
              }`
        }`}
      >
        {text}
      </a>
    </Link>
  );
};

const AppNav = ({ site, inverted }) => {
  if (!site) return <></>;

  return (
    <div className="flex items-center">
      <AppNavItem
        key="plugins"
        path={`/sites/${site.id}`}
        text="Plugins"
        inverted={inverted}
      />
      <AppNavItem
        key="settings"
        path={`/sites/${site.id}/settings`}
        text="Settings"
        inverted={inverted}
      />
    </div>
  );
};

const Header = ({
  viewerData: initialViewerData,
  siteData: initialSiteData,
  inverted,
  showAppNav = true
}) => {
  const { data: viewerData } = useViewer({ initialData: initialViewerData });
  const { siteId } = useContext(SiteContext);

  const { data: siteData } = initialSiteData
    ? useSite(initialSiteData.site.id, { initialData: initialSiteData })
    : useSite(siteId);

  const inApp = initialSiteData ? true : false;

  const site = siteData && siteData.site;
  const textColor = inverted ? 'text-gray-500' : 'text-gray-600';
  const mainLinkPath =
    siteData && siteData.site ? `/sites/${siteData.site.id}` : '/';

  return (
    <div className={`${inverted ? 'bg-gray-900' : ''}`}>
      <header className="mx-auto container px-6 py-4">
        <div className="flex items-center h-10">
          <div>
            <Link href={mainLinkPath}>
              <a className="flex items-center">
                <Logo inverted={inverted} />
              </a>
            </Link>
          </div>
          <div className="mx-5 flex-grow flex items-center">
            {showAppNav && <AppNav site={site} inverted={inverted} />}
          </div>
          <div
            className={`flex items-center justify-end font-semibold text-sm ${textColor}`}
          >
            {showAppNav && (
              <SiteMenu currentSite={site} inverted={inverted} inApp={inApp} />
            )}
            <GlobalNav viewerData={viewerData} />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
