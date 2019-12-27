import useSWR, { trigger } from 'swr';
import { graphql } from '../utils/graphql';
import { getToken } from '../utils/auth';

export const fetch = async (siteId, formId, before, after, token) => {
  const forwardQuery = `
    query Submissions(
      $siteId: ID!,
      $formId: ID!,
      $first: Int,
      $after: String
    ) {
      site(id: $siteId) {
        form(id: $formId) {
          submissions(
            first: $first,
            after: $after
          ) {
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
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

  const backwardQuery = `
    query Submissions(
      $siteId: ID!,
      $formId: ID!,
      $last: Int,
      $before: String,
    ) {
      site(id: $siteId) {
        form(key: $formId) {
          submissions(
            last: $last,
            before: $before,
          ) {
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
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
    const query = before ? backwardQuery : forwardQuery;
    const [first, last] = before ? [null, 100] : [100, null];
    const resp = await graphql(
      query,
      { siteId, formId, first, last, before, after },
      token
    );

    if (resp.status === 401) return { status: 'unauthorized', siteId, key };
    if (resp.status >= 400 && resp.status < 500)
      return { status: 'clientError', siteId, key };
    if (resp.status >= 500) return { status: 'serverError', siteId, key };

    const body = await resp.json();

    const {
      data: {
        site: {
          form: { submissions }
        }
      }
    } = body;

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

export const useSubmissions = (
  { siteId, formId, before, after },
  config = {}
) => {
  const token = getToken();

  return useSWR(
    ['submissions', siteId, formId, before, after, token],
    async (_, siteId, formId, before, after, token) =>
      await fetch(siteId, formId, before, after, token),
    config
  );
};
