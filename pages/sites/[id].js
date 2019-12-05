import React from 'react';
import Header from '../../components/header';
import OpenGraph from '../../components/open_graph';
import graphql from '../../utils/graphql';
import cookie from '../../utils/cookie';
import { redirectToSignin } from '../../utils/auth';

const fetchData = ([_, id, cookie]) => {
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

  return graphql(query, variables, { cookie });
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

SitePage.getInitialProps = async ({ query, req, res }) => {
  const { id } = query;

  try {
    const resp = await fetchData(['site', id, cookie(req)]);

    if (resp.ok) {
      const body = await resp.json();
      const data = body.data;
      return { data, query };
    } else {
      return redirectToSignin(res);
    }
  } catch (err) {
    console.log(err);
    return redirectToSignin(res);
  }
};

export default SitePage;
