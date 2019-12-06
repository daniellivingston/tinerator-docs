import React from 'react';
import Header from '../../components/header';
import OpenGraph from '../../components/open_graph';
import graphql from '../../utils/graphql';
import { redirectToSignin } from '../../utils/auth';
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

function SitePage(props) {
  const data = props.data;
  const title = 'Site';

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
  const { id } = context.query;

  try {
    const resp = await fetchData('site', id, context);

    if (resp.ok) {
      const body = await resp.json();
      const data = body.data;
      return { data, query };
    } else {
      return redirectToSignin(context.res);
    }
  } catch (err) {
    console.log(err);
    return redirectToSignin(context.res);
  }
};

export default SitePage;
