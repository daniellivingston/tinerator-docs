import useSWR, { trigger } from 'swr';
import { graphql } from '../utils/graphql';
import { getToken } from '../utils/auth';

export const fetch = async (siteId, formId, token) => {
  const query = `
    query Form(
      $siteId: ID!
      $formId: String!
    ) {
      site(id: $siteId) {
        form(id: $formId) {
          id
          key
          name
          submissionCount
          displayFields
        }
      }
    }
  `;

  if (!token) return { status: 'unauthorized' };

  try {
    const resp = await graphql(query, { siteId, formId }, token);

    if (resp.status === 401) return { status: 'unauthorized', siteId, formId };
    if (resp.status >= 400 && resp.status < 500)
      return { status: 'clientError', siteId, formId };
    if (resp.status >= 500) return { status: 'serverError', siteId, formId };

    const {
      data: {
        site: { form }
      }
    } = await resp.json();

    if (!form) return { status: 'notFound', siteId, formId };
    return { status: 'ok', form };
  } catch (e) {
    return { status: 'serverError', siteId, formId };
  }
};

export const revalidate = (siteId, formId) => {
  const token = getToken();
  trigger(['form', siteId, formId, token]);
};

export const useForm = (siteId, formId, config = {}) => {
  const token = getToken();

  return useSWR(
    ['form', siteId, formId, token],
    async (_, siteId, formId, token) => await fetch(siteId, formId, token),
    config
  );
};
