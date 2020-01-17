import React, { useState, useContext } from 'react';
import Link from 'next/link';
import Logo from 'components/Logo';
import SiteContext from 'components/SiteContext';
import OutsideClickHandler from 'react-outside-click-handler';
import { useRouter } from 'next/router';
import { logout } from 'utils/auth';
import useViewerData from 'components/useViewerData';
import useSiteData from 'components/useSiteData';
import useSiteListData from 'components/useSiteListData';
import { useDefaultSite } from 'utils/default-site';

const gearIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
`;

function UserMenu({ viewer }) {
  const [isOpen, setIsOpen] = useState(false);
  const { setSiteId } = useContext(SiteContext);

  const handleLogout = () => {
    setSiteId(null);
    logout();
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleClass = isOpen ? '' : 'hidden';

  return (
    <OutsideClickHandler onOutsideClick={() => setIsOpen(false)}>
      <div className="relative flex z-20">
        <button className="ml-4 flex-shrink-0" onClick={toggleMenu}>
          <img
            src={viewer.avatarUrl}
            className="w-8 h-8 rounded-full shadow-md"
          />
        </button>
        <div
          className={`mt-12 py-2 bg-white absolute right-0 w-32 rounded shadow-menu ${toggleClass}`}
        >
          <ul className="text-gray-700 font-normal">
            <li key="billing">
              <Link href="/billing">
                <a className="block px-4 py-2 w-full hover:bg-gray-200 text-left">
                  Billing
                </a>
              </Link>
            </li>
            <li key="logout" className="mt-2 pt-2 border-t">
              <button
                className="px-4 py-2 w-full hover:bg-gray-200 text-left"
                onClick={handleLogout}
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
        <Link href="/sites/[siteId]" as={`/sites/${site.id}`}>
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

  const { data: sitesData } = useSiteListData();
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
              sitesData.status === 'ok' &&
              sitesData.sites.edges.map(({ node }) => (
                <SiteMenuItem key={node.id} site={node} inApp={inApp} />
              ))}
            <li key="new-site" className="mt-2 pt-2 border-t">
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

const SiteSettingsButton = ({ currentSite, inverted }) => {
  if (!currentSite) return <></>;

  return (
    <Link
      href="/sites/[siteId]/settings"
      as={`/sites/${currentSite.id}/settings`}
    >
      <a className="text-gray-500">
        <div dangerouslySetInnerHTML={{ __html: gearIcon }} />
      </a>
    </Link>
  );
};

const Header = props => {
  const initialViewerData = props.viewerData;
  const initialSiteData = props.siteData;
  const inverted = !!props.inverted;
  const showAppNav = props.showAppNav === false ? false : true;

  const router = useRouter();
  const defaultSiteId = useDefaultSite();

  const { data: viewerData } = useViewerData({
    initialData: initialViewerData
  });

  const { data: siteData } = router.query.siteId
    ? useSiteData(router.query.siteId as string, {
        initialData: initialSiteData
      })
    : useSiteData(defaultSiteId);

  const inApp = router.query.siteId ? true : false;
  const site = siteData && siteData.status === 'ok' ? siteData.site : undefined;
  const textColor = inverted ? 'text-gray-500' : 'text-gray-600';
  const [mainLinkHref, mainLinkAs] = site
    ? ['/sites/[siteId]', `/sites/${site.id}`]
    : ['/', '/'];

  return (
    <div className={`${inverted ? 'bg-gray-900' : ''}`}>
      <header className="mx-auto container px-6 py-4">
        <div className="flex items-center h-10">
          <div>
            <Link href={mainLinkHref} as={mainLinkAs}>
              <a className="flex items-center">
                <Logo inverted={inverted} />
              </a>
            </Link>
          </div>
          <div className="mx-5 flex-grow flex items-center"></div>
          <div
            className={`flex items-center justify-end font-semibold text-sm ${textColor}`}
          >
            {showAppNav && (
              <SiteMenu currentSite={site} inverted={inverted} inApp={inApp} />
            )}

            {showAppNav && (
              <SiteSettingsButton currentSite={site} inverted={inverted} />
            )}
            <GlobalNav viewerData={viewerData} />
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
