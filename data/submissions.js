import useSWR, { trigger } from 'swr';
import graphql from '../utils/graphql';
import { getToken } from '../utils/auth';

export const fetch = async (siteId, key, token) => {
  const query = `
    query Submissions(
      $siteId: ID!
      $key: String!
    ) {
      site(id: $siteId) {
        form(key: $key) {
          submissions(first: 100) {
            edges {
              node {
                id
                data {
                  name
                  value
                }
                occurredAt
              }
            }
          }
        }
      }
    }
  `;

  if (!token) return { status: 'unauthorized' };

  try {
    const resp = await graphql(query, { siteId, key }, token);

    if (resp.status === 401) return { status: 'unauthorized', siteId, key };
    if (resp.status >= 400 && resp.status < 500)
      return { status: 'clientError', siteId, key };
    if (resp.status >= 500) return { status: 'serverError', siteId, key };

    const {
      data: {
        site: {
          form: { submissions }
        }
      }
    } = await resp.json();

    if (!submissions) return { status: 'notFound', siteId, key };
    return { status: 'ok', submissions };
  } catch (e) {
    return { status: 'serverError', siteId, key };
  }
};

export const revalidate = (siteId, key) => {
  const token = getToken();
  trigger(['submissions', siteId, key, token]);
};

export const useSubmissions = (siteId, key, config = {}) => {
  const token = getToken();

  return useSWR(
    ['submissions', siteId, key, token],
    async (_, siteId, key, token) => await fetch(siteId, key, token),
    config
  );
};
