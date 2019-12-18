import useSWR, { trigger } from 'swr';
import graphql from '../utils/graphql';
import { getToken } from '../utils/auth';

export const fetch = async (siteId, key, token) => {
  const query = `
    query Form(
      $siteId: ID!
      $key: String!
    ) {
      site(id: $siteId) {
        form(key: $key) {
          id
          name
          submissionCount
          displayFields
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
        site: { form }
      }
    } = await resp.json();

    if (!form) return { status: 'notFound', siteId, key };
    return { status: 'ok', form };
  } catch (e) {
    return { status: 'serverError', siteId, key };
  }
};

export const revalidate = (siteId, key) => {
  const token = getToken();
  trigger(['form', siteId, key, token]);
};

export const useForm = (siteId, key, config = {}) => {
  const token = getToken();

  return useSWR(
    ['form', siteId, key, token],
    async (_, siteId, key, token) => await fetch(siteId, key, token),
    config
  );
};
