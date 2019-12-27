import React, { useEffect, useContext } from 'react';
import Header from 'components/header';
import OpenGraph from 'components/open_graph';
import CodeBlock from 'components/code_block';
import Error from 'next/error';
import Link from 'next/link';
import SiteContext from 'components/site_context';
import { useRouter } from 'next/router';
import { getToken, redirectToLogin } from 'utils/auth';
import { useViewer, fetch as fetchViewer } from 'data/viewer';
import { useSite, fetch as fetchSite } from 'data/site';
import { stripIndent } from 'common-tags';

const firstDeploy = token => stripIndent`
npm i -g @statickit/cli
statickit forms add contact-form "Contact Form"
statickit deploy -k ${token}
`;

const BlankSlate = ({ site }) => {
  return (
    <div className="mx-auto container px-6 pt-6 pb-12">
      <div className="mx-auto max-w-2xl text-gray-500">
        <div className="py-16">
          <h2 className="pb-4 text-2xl font-semibold text-gray-300 tracking-snug">
            Your site is ready to configure!
          </h2>
          <p className="pb-4 leading-relaxed">
            From your command line,{' '}
            <code className="inline-code-inverse">cd</code> into your project
            directory and run these commands to install the CLI, generate a
            config file, and deploy it to StaticKit:
          </p>

          <div className="pb-4">
            <CodeBlock className="language-shell">
              {firstDeploy(site.deployKey).trim()}
            </CodeBlock>
          </div>

          <p>
            <Link href="/docs">
              <a className="text-indigo-500 font-bold">
                Learn more about configuration &rarr;
              </a>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const FormItem = ({ site, form }) => {
  let submissionLabel;

  if (form.submissionCount == 0) {
    submissionLabel = 'No submissions yet';
  } else if (form.submissionCount == 1) {
    submissionLabel = '1 submission';
  } else {
    submissionLabel = `${form.submissionCount} submissions`;
  }

  return (
    <Link
      href="/sites/[siteId]/forms/[formId]"
      as={`/sites/${site.id}/forms/${form.id}`}
    >
      <a className="block w-full md:w-1/2 lg:w-1/3 p-3">
        <div className="flex px-5 py-4 bg-gray-800 hover:bg-gray-700 hover:bg-transition rounded-lg shadow-lg">
          <div className="flex-grow">
            <h3 className="pb-1 text-lg font-semibold text-gray-300 tracking-snug">
              {form.name}
            </h3>
            <p className="text-sm text-gray-500">{submissionLabel}</p>
          </div>
          <div className="flex-shrink-0">
            <span className="font-bold text-gray-600">&rarr;</span>
          </div>
        </div>
      </a>
    </Link>
  );
};

const FormList = ({ siteData: initialSiteData }) => {
  const router = useRouter();
  const { data: siteData, error } = useSite(router.query.siteId, {
    initialData: initialSiteData
  });

  if (!siteData) return <div className="h-32"></div>;
  if (error) return <></>;

  const site = siteData.site;
  const forms = site.forms.edges.map(edge => edge.node);

  if (forms.length == 0) {
    return <BlankSlate site={siteData.site} />;
  }

  return (
    <div className="mx-auto container px-3 pt-6 pb-12">
      <div className="sm:flex">
        <div className="sm:w-56 px-3 py-3 pb-3">
          <h2 className="pb-1 text-xl font-semibold text-white">Forms</h2>
          <p className="text-sm text-gray-600">
            The form resources you&rsquo;ve configured for your site.
          </p>
        </div>
        <div className="sm:flex-grow flex flex-wrap">
          {forms.map(form => (
            <FormItem key={form.id} site={site} form={form} />
          ))}
        </div>
      </div>
    </div>
  );
};

function SitePage({
  viewerData: initialViewerData,
  siteData: initialSiteData
}) {
  const router = useRouter();
  const { setSiteId } = useContext(SiteContext);
  const { data: viewerData } = useViewer({ initialData: initialViewerData });
  const { data: siteData } = useSite(router.query.siteId, {
    initialData: initialSiteData
  });

  if (siteData && siteData.status === 'notFound') {
    return <Error statusCode={404} />;
  }

  useEffect(() => {
    if (!siteData) return;

    if (siteData.status === 'ok') {
      setSiteId(siteData.site.id);
    }
  }, [siteData]);

  if (!siteData) return <></>;
  const site = siteData.site;
  const title = site.name;

  return (
    <div>
      <main>
        <OpenGraph title={title} description={''} />
        <div className="bg-gray-900">
          <Header inverted={true} viewerData={viewerData} siteData={siteData} />
          <FormList siteData={siteData} />
        </div>
      </main>
    </div>
  );
}

SitePage.getInitialProps = async context => {
  const { query } = context;
  const token = getToken(context);

  try {
    const [viewerData, siteData] = await Promise.all([
      fetchViewer(token),
      fetchSite(query.siteId, token)
    ]);

    if (viewerData.status === 'unauthorized') {
      redirectToLogin(context);
    }

    return { viewerData, siteData };
  } catch (err) {
    console.log(err);
    return redirectToLogin(context);
  }
};

export default SitePage;
