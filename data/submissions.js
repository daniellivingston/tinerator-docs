import useSWR, { trigger } from 'swr';
import { graphql } from '../utils/graphql';
import { getToken } from '../utils/auth';

export const fetch = async ({ formId, before, after, token }) => {
  const forwardQuery = `
    query Submissions(
      $formId: ID!,
      $first: Int,
      $after: String
    ) {
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
  `;

  const backwardQuery = `
    query Submissions(
      $formId: ID!,
      $last: Int,
      $before: String,
    ) {
      form(id: $formId) {
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
  `;

  if (!token) return { status: 'unauthorized' };

  try {
    const query = before ? backwardQuery : forwardQuery;
    const [first, last] = before ? [null, 50] : [50, null];
    const resp = await graphql(
      query,
      { formId, first, last, before, after },
      token
    );

    if (resp.status === 401) return { status: 'unauthorized' };
    if (resp.status >= 400 && resp.status < 500)
      return { status: 'clientError' };
    if (resp.status >= 500) return { status: 'serverError' };

    const body = await resp.json();

    const {
      data: {
        form: { submissions }
      }
    } = body;

    if (!submissions) return { status: 'notFound' };
    return { status: 'ok', submissions };
  } catch (e) {
    return { status: 'serverError' };
  }
};

export const revalidate = ({ formId, before, after }) => {
  const token = getToken();
  trigger(['submissions', formId, before, after, token]);
};

export const useSubmissionsData = ({ formId, before, after }, config = {}) => {
  const token = getToken();

  let key;

  if (formId && token) {
    key = ['submissions', formId, before, after, token];
  } else {
    key = null;
  }

  const { data, ...rest } = useSWR(
    key,
    async (_, formId, before, after, token) =>
      await fetch({ formId, before, after, token }),
    config
  );

  return { submissionsData: data, ...rest };
};
