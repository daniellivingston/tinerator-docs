import React from 'react';
import Header from '../../components/header';
import OpenGraph from '../../components/open_graph';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { getToken, redirectToLogin } from '../../utils/auth';
import { useSite, fetch as fetchSite } from '../../data/site';

function SitePage({ data: initialData }) {
  const router = useRouter();
  const { data, error } = useSite(router.query.id, { initialData });

  if (data.status === 'notFound') {
    return <Error statusCode={404} />;
  }

  const title = data && data.site ? data.site.name : 'Site';

  return (
    <div>
      <main>
        <OpenGraph title={title} description={''} path="/sites/[id]" />
        <div className="bg-gray-900">
          <Header pageTitle={title} inverted={true} />
        </div>
      </main>
    </div>
  );
}

SitePage.getInitialProps = async context => {
  const { query } = context;
  const token = getToken(context);

  try {
    const resp = await fetchSite(query.id, token);
    if (resp.status == 'unauthorized') redirectToLogin(context);
    return { data: resp };
  } catch (err) {
    console.log(err);
    return redirectToLogin(context);
  }
};

export default SitePage;
