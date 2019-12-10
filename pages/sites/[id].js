import React from 'react';
import Header from '../../components/header';
import OpenGraph from '../../components/open_graph';
import CodeBlock from '../../components/code_block';
import Error from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getToken, redirectToLogin } from '../../utils/auth';
import { useViewer, fetch as fetchViewer } from '../../data/viewer';
import { useSite, fetch as fetchSite } from '../../data/site';
import { stripIndent } from 'common-tags';

const firstDeploy = token => stripIndent`
npm i -g @statickit/cli
statickit forms add contact-form "Contact Form"
statickit deploy -k ${token}
`;

function SitePage({
  viewerData: initialViewerData,
  siteData: initialSiteData
}) {
  const router = useRouter();

  const { data: viewerData } = useViewer({
    initialData: initialViewerData
  });

  const { data: siteData, error } = useSite(router.query.id, {
    initialData: initialSiteData
  });

  if (siteData.status === 'notFound') {
    return <Error statusCode={404} />;
  }

  const site = siteData.site;
  const title = site.name;

  return (
    <div>
      <main>
        <OpenGraph title={title} description={''} path="/sites/[id]" />
        <div className="bg-gray-900">
          <Header
            pageTitle={title}
            inverted={true}
            viewerData={viewerData}
            siteData={siteData}
          />
          <div className="mx-auto container px-6 pt-6 pb-12">
            <div className="">
              <div className="w-full md:w-2/3 py-16 text-gray-500">
                <h2 className="pb-4 text-2xl font-semibold text-gray-300 tracking-snug">
                  Your site is ready to configure!
                </h2>
                <p className="pb-4">
                  From your console,{' '}
                  <code className="inline-code-inverse">cd</code> into your
                  project directory and run these commands to install the CLI,
                  generate a config file, and deploy it:
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
      fetchSite(query.id, token)
    ]);

    if (viewerData.status == 'unauthorized') {
      redirectToLogin(context);
    }

    return { viewerData, siteData };
  } catch (err) {
    console.log(err);
    return redirectToLogin(context);
  }
};

export default SitePage;
