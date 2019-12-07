import React from 'react';
import Header from '../../components/header';
import OpenGraph from '../../components/open_graph';
import graphql from '../../utils/graphql';
import { redirectToLogin } from '../../utils/auth';
import { useSiteData, fetch } from '../../data/site';
import cookies from 'next-cookies';

const fetchData = (_, id, context) => {
  const query = `
    {
      viewer {
        email
        avatarUrl
      }
      sites(first: 1000) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `;

  const variables = { siteId: id };
  const { token } = cookies(context);
  return graphql(query, variables, token);
};

function SitePage({ data: initialData, query }) {
  const { data, error } = useSiteData(query.id, { initialData });
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
    return { data, query };
  } catch (err) {
    console.log(err);
    return redirectToLogin(context);
  }
};

export default SitePage;
