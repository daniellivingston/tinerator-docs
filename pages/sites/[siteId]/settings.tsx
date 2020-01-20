import React, { useState, useEffect } from 'react';
import { NextPageContext } from 'next';
import Header from 'components/Header';
import HeadMatter from 'components/HeadMatter';
import NextError from 'next/error';
import { useDefaultSite } from 'utils/default-site';
import { useAuthRequired, getToken, redirectToLogin } from 'utils/auth';
import { useRouter } from 'next/router';
import useViewerData from 'components/useViewerData';
import useSiteData, { revalidate } from 'components/useSiteData';
import useUsageData from 'components/useUsageData';
import { updateSiteName } from 'data/mutations';
import { ValidationError } from '@statickit/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  SiteData,
  UsageData,
  ViewerData,
  Viewer,
  Site,
  fetchViewer,
  fetchSite
} from 'data/queries';
import { useStaticKit } from '@statickit/react';
import { requestUpgrade } from '@statickit/functions';
import moment from 'moment';
import QuickLinks from 'components/QuickLinks';

const copyIcon = `
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clipboard"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
`;

const formatNumber = (number: number) => {
  return new Intl.NumberFormat().format(number);
};

const pageTitle = (siteData: SiteData) => {
  if (!siteData || siteData.status !== 'ok') return 'Site Settings';
  return `Site Settings - ${siteData.site.name}`;
};

const formatDate = (dateString: string) => {
  return moment.utc(dateString).format('MMM D, YYYY');
};

const Billing: React.FC<{
  viewerData: ViewerData;
  siteData: SiteData;
  usageData: UsageData;
}> = ({ viewerData, siteData, usageData }) => {
  const client = useStaticKit();
  const [requestingUpgrade, setRequestingUpgrade] = useState(false);
  const [upgradeRequested, setUpgradeRequested] = useState(false);

  if (!siteData || !usageData) {
    return <p>Loading...</p>;
  }

  if (siteData.status !== 'ok' || usageData.status !== 'ok') {
    return <p>An error occurred</p>;
  }

  let site = siteData.site;
  let account = site.account;
  let usage = usageData.usage;

  let requestLimit = account.requestLimit
    ? formatNumber(account.requestLimit)
    : '∞';

  let cycleMessage = () => {
    if (account.currentPeriodEnd) {
      return `Your billing cycle ends on ${formatDate(
        account.currentPeriodEnd
      )}.`;
    }
  };

  let handleUpgradeRequest = async () => {
    if (!viewerData) return;
    if (viewerData.status !== 'ok') return;

    setRequestingUpgrade(true);

    let viewer = viewerData.viewer;

    let resp = await requestUpgrade(client, {
      subject: `${site.name} (${site.id}) requested an upgrade`,
      replyTo: viewer.email,
      fields: {
        invocations: usage.invocations,
        submissions: usage.submissions
      }
    });

    if (resp.status === 'ok') {
      setUpgradeRequested(true);
    } else {
      setRequestingUpgrade(false);
    }
  };

  let upgradeButton = () => {
    if (account.sandbox) {
      if (upgradeRequested) {
        return <p>Thanks! We'll be in touch shortly.</p>;
      } else {
        return (
          <div className="leading-snug">
            <div className="pb-3">
              <button
                className="btn"
                onClick={handleUpgradeRequest}
                disabled={requestingUpgrade}
              >
                Request an upgrade
              </button>
            </div>
            <small className="text-sm text-gray-600">
              We'll reach out quickly to get you on the right plan!
            </small>
          </div>
        );
      }
    }
  };

  let total = usage.invocations + usage.submissions;

  return (
    <div className="leading-relaxed">
      <p>
        You&rsquo;re on the <strong>{account.planName}</strong> plan.
      </p>
      <p>
        {account.sandbox
          ? 'Be sure to upgrade to a production plan before going live.'
          : ''}
      </p>
      <p className="pb-4">Your usage for this billing cycle:</p>
      <ul className="ml-4 pb-4 list-disc list-inside">
        <li>{formatNumber(usage.invocations)} function calls</li>
        <li>{formatNumber(usage.submissions)} form submissions</li>
        <li>{formatNumber(total)} total requests</li>
      </ul>
      <p>Your limit is {requestLimit} requests.</p>
      <p className="pb-4">{cycleMessage()}</p>
      <div>{upgradeButton()}</div>
    </div>
  );
};

function SiteSettingsPage({
  viewer: initialViewer,
  site: initialSite
}: {
  viewer: Viewer;
  site: Site;
}) {
  const router = useRouter();

  const { data: viewerData } = useViewerData({
    initialData: { status: 'ok', viewer: initialViewer }
  });
  const { data: siteData } = useSiteData(router.query.siteId as string, {
    initialData: { status: 'ok', site: initialSite }
  });
  const { data: usageData } = useUsageData(router.query.siteId as string);

  const [name, setName] = useState(initialSite.name);
  const [slug, setSlug] = useState(initialSite.id);
  const [deployKey, setDeployKey] = useState(initialSite.deployKey);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (siteData && siteData.status === 'ok') {
      setName(siteData.site.name);
      setSlug(siteData.site.id);
      setDeployKey(siteData.site.deployKey);
    }
  }, [siteData]);

  useAuthRequired(viewerData);
  useDefaultSite(siteData);

  if (siteData && siteData.status === 'notFound') {
    return <NextError statusCode={404} />;
  }

  const handleNameSaved = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(siteData && siteData.status === 'ok')) return;

    let site = siteData.site;
    let payload = await updateSiteName(site.id, name, getToken());
    if (payload.success) revalidate(payload.site.id);
    setErrors(payload.errors);
  };

  return (
    <main>
      <HeadMatter title={pageTitle(siteData)} />
      <div className="bg-gray-900">
        <Header inverted={true} viewerData={viewerData} siteData={siteData} />
        <div className="container py-16 sm:py-20 mx-auto">
          <div className="mx-auto max-w-3xl">
            <div className="px-6 pb-6">
              <h1 className="pb-2 text-gray-200 text-4xl tracking-snug">
                Site Settings
              </h1>
            </div>

            <div className="mx-auto container py-6">
              <div className="mx-auto sm:flex max-w-3xl py-3">
                <div className="sm:w-1/3 px-6 pb-3">
                  <label className="block pb-1 text-gray-400 font-semibold">
                    Site Name
                  </label>
                  <p className="text-sm text-gray-600">
                    The name of this site.
                  </p>
                </div>
                <div className="sm:w-2/3 px-6 pb-3">
                  <form
                    className="flex input-field-inverse p-0"
                    onSubmit={handleNameSaved}
                  >
                    <input
                      type="text"
                      name="name"
                      className="block p-3 flex-grow bg-transparent focus:outline-none min-w-0"
                      value={name}
                      onChange={e => setName(e.target.value)}
                    />
                    <div className="p-1">
                      <button type="submit" className="btn btn-sm">
                        Save
                      </button>
                    </div>
                  </form>

                  <ValidationError
                    prefix="Name"
                    field="name"
                    errors={errors}
                    className="py-2 text-sm text-red-700 font-bold"
                  />
                </div>
              </div>

              <div className="mx-auto sm:flex max-w-3xl py-3">
                <div className="sm:w-1/3 px-6 pb-3">
                  <label className="block pb-1 text-gray-400 font-semibold">
                    Site ID
                  </label>
                  <p className="text-sm text-gray-600">
                    The public ID for this site.
                  </p>
                </div>
                <div className="sm:w-2/3 px-6 pb-3">
                  <div className="flex">
                    <div className="flex max-w-full border border-transparent bg-gray-800 leading-tight rounded">
                      <div className="p-3 overflow-auto font-mono text-gray-200 bg-transparent focus:outline-none">
                        {slug}
                      </div>

                      <CopyToClipboard text={slug}>
                        <button type="submit" className="btn btn-sm">
                          <span
                            dangerouslySetInnerHTML={{ __html: copyIcon }}
                          />
                        </button>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-auto sm:flex max-w-3xl py-3">
                <div className="sm:w-1/3 px-6 pb-3">
                  <label className="block pb-1 text-gray-400 font-semibold">
                    Deploy Key
                  </label>
                  <p className="text-sm text-gray-600">Keep this secret!</p>
                </div>
                <div className="sm:w-2/3 px-6 pb-3">
                  <div className="flex">
                    <div className="flex max-w-full border border-transparent bg-gray-800 leading-tight rounded">
                      <div className="p-3 overflow-auto font-mono text-gray-200 bg-transparent focus:outline-none">
                        {deployKey}
                      </div>
                      <CopyToClipboard text={deployKey}>
                        <button type="submit" className="btn btn-sm">
                          <span
                            dangerouslySetInnerHTML={{ __html: copyIcon }}
                          />
                        </button>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-auto sm:flex max-w-3xl py-3">
                <div className="sm:w-1/3 px-6 pb-3">
                  <label className="block pb-1 text-gray-400 font-semibold">
                    Billing
                  </label>
                  <p className="text-sm text-gray-600">
                    Your plan and usage info.
                  </p>
                </div>
                <div className="sm:w-2/3 px-6 pb-3 text-gray-400">
                  <Billing
                    viewerData={viewerData}
                    siteData={siteData}
                    usageData={usageData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <QuickLinks />
    </main>
  );
}

SiteSettingsPage.getInitialProps = async (context: NextPageContext) => {
  const token = getToken(context);
  const viewerData = await fetchViewer(token);
  if (viewerData.status === 'unauthorized') redirectToLogin(context);
  const siteData = await fetchSite(context.query.siteId as string, token);

  if (viewerData.status === 'ok' && siteData.status === 'ok') {
    return { viewer: viewerData.viewer, site: siteData.site };
  } else {
    throw new Error('viewer or site not available');
  }
};

export default SiteSettingsPage;
