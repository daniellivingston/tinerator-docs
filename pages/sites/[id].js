import React from 'react';
import Header from '../../components/header';
import OpenGraph from '../../components/open_graph';
import { useRouter } from 'next/router';
import { redirectToLogin } from '../../utils/auth';
import { useSiteData, fetch } from '../../data/site';

function SitePage({ data: initialData }) {
  const router = useRouter();
  const { data, error } = useSiteData(router.query.id, { initialData });
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

  try {
    const data = await fetch(query.id, context);
    if (!data) redirectToLogin(context);
    return { data };
  } catch (err) {
    console.log(err);
    return redirectToLogin(context);
  }
};

export default SitePage;
