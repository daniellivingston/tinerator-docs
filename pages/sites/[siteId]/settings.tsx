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
import { updateSiteName, updatePlan } from 'data/mutations';
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
import moment from 'moment';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

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

const UpgradeForm: React.FC<{ site: Site }> = ({ site }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stripeError, setStripeError] = useState(null);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors([]);

    const { error, token } = await stripe.createToken(
      elements.getElement(CardElement)
    );

    setStripeError(error);

    if (token) {
      const params = {
        siteId: site.id,
        planId: 'v2-monthly-1000',
        stripeCardToken: token.id
      };

      const result = await updatePlan(params, getToken());

      if (result.success) {
        revalidate(site.id);
      } else {
        setErrors(result.errors);
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="pb-4">
        <div className="input-field">
          <CardElement
            onChange={e => setStripeError(e.error)}
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  fontSmoothing: 'antialiased'
                }
              }
            }}
          />
        </div>

        {stripeError && (
          <div className="pt-2 font-bold text-sm text-red-600">
            {stripeError.message}
          </div>
        )}
      </div>

      <button className="btn" disabled={isSubmitting}>
        {isSubmitting ? 'Upgrading...' : 'Upgrade to production'}
      </button>

      <p className="pt-3 leading-snug">
        <small className="text-gray-600 text-sm">
          We&rsquo;ll charge your card $20 and remove sandbox limits right away.
        </small>
      </p>
    </form>
  );
};

const Billing: React.FC<{
  viewerData: ViewerData;
  siteData: SiteData;
  usageData: UsageData;
}> = ({ siteData, usageData }) => {
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

  let total = usage.invocations + usage.submissions;

  return (
    <div className="leading-relaxed">
      <p>
        You&rsquo;re on the <strong>{account.planName}</strong> plan with a{' '}
        {requestLimit} request limit.
      </p>
      <p className="pb-4">Your usage for this billing cycle:</p>
      <ul className="ml-4 pb-4 list-disc list-inside">
        <li>{formatNumber(usage.invocations)} function calls</li>
        <li>{formatNumber(usage.submissions)} form submissions</li>
        <li>{formatNumber(total)} total requests</li>
      </ul>
      <p className="pb-4">
        {account.sandbox
          ? 'Production plans start at $20/month. Be sure to upgrade before going live:'
          : cycleMessage()}
      </p>
      {account.sandbox && <UpgradeForm site={site} />}
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
      <div>
        <Header inverted={false} viewerData={viewerData} siteData={siteData} />
        <div className="container py-16 sm:py-20 mx-auto">
          <div className="mx-auto max-w-3xl">
            <div className="px-6 pb-6">
              <h1 className="pb-2 text-gray-900 text-4xl tracking-snug">
                Site Settings
              </h1>
            </div>

            <div className="mx-auto container py-6">
              <div className="mx-auto sm:flex max-w-3xl py-3">
                <div className="sm:w-1/3 px-6 pb-3">
                  <label className="block pb-1 text-gray-800 font-semibold">
                    Site Name
                  </label>
                  <p className="text-sm text-gray-600">
                    The name of this site.
                  </p>
                </div>
                <div className="sm:w-2/3 px-6 pb-3">
                  <form
                    className="flex input-field p-0"
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
                  <label className="block pb-1 text-gray-800 font-semibold">
                    Site ID
                  </label>
                  <p className="text-sm text-gray-600">
                    The public ID for this site.
                  </p>
                </div>
                <div className="sm:w-2/3 px-6 pb-3">
                  <div className="flex">
                    <div className="flex max-w-full border border-transparent bg-gray-200 leading-tight rounded">
                      <div className="p-3 overflow-auto font-mono text-gray-800 bg-transparent focus:outline-none">
                        {slug}
                      </div>

                      <CopyToClipboard text={slug}>
                        <button
                          type="submit"
                          className="btn btn-sm btn-transparent text-gray-800"
                        >
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
                  <label className="block pb-1 text-gray-800 font-semibold">
                    Deploy Key
                  </label>
                  <p className="text-sm text-gray-600">Keep this secret!</p>
                </div>
                <div className="sm:w-2/3 px-6 pb-3">
                  <div className="flex">
                    <div className="flex max-w-full border border-transparent bg-gray-200 leading-tight rounded">
                      <div className="p-3 overflow-auto font-mono text-gray-800 bg-transparent focus:outline-none">
                        {deployKey}
                      </div>
                      <CopyToClipboard text={deployKey}>
                        <button
                          type="submit"
                          className="btn btn-sm btn-transparent text-gray-800"
                        >
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
                  <label className="block pb-1 text-gray-800 font-semibold">
                    Billing
                  </label>
                  <p className="text-sm text-gray-600">
                    Your plan and usage info.
                  </p>
                </div>
                <div className="sm:w-2/3 px-6 pb-3 text-gray-900">
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
