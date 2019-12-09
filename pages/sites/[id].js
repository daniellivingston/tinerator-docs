import React from 'react';
import Header from '../../components/header';
import OpenGraph from '../../components/open_graph';
import Error from 'next/error';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getToken, redirectToLogin } from '../../utils/auth';
import { useViewer, fetch as fetchViewer } from '../../data/viewer';
import { useSite, fetch as fetchSite } from '../../data/site';

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
            site={site}
          />
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
