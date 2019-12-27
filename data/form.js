import useSWR, { trigger } from 'swr';
import { graphql } from '../utils/graphql';
import { getToken } from '../utils/auth';

export const fetch = async (formId, token) => {
  const query = `
    query Form(
      $formId: ID!
    ) {
      form(id: $formId) {
        id
        key
        name
        submissionCount
        displayFields
      }
    }
  `;

  if (!token) return { status: 'unauthorized' };

  try {
    const resp = await graphql(query, { formId }, token);

    if (resp.status === 401) return { status: 'unauthorized', formId };
    if (resp.status >= 400 && resp.status < 500)
      return { status: 'clientError', formId };
    if (resp.status >= 500) return { status: 'serverError', formId };

    const {
      data: { form }
    } = await resp.json();

    if (!form) return { status: 'notFound', formId };
    return { status: 'ok', form };
  } catch (e) {
    return { status: 'serverError', formId };
  }
};

export const revalidate = formId => {
  const token = getToken();
  trigger(['form', formId, token]);
};

export const useFormData = (formId, config = {}) => {
  const token = getToken();

  let key;

  if (formId && token) {
    key = ['form', formId, token];
  } else {
    key = null;
  }

  const { data, ...rest } = useSWR(
    key,
    async (_, formId, token) => await fetch(formId, token),
    config
  );

  return { formData: data, ...rest };
};
