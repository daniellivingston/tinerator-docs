import useSWR, { trigger } from 'swr';
import graphql from '../utils/graphql';
import { getToken } from '../utils/auth';

export const fetch = async (id, token) => {
  const query = `
    query Site(
      $id: String
    ) {
      site(id: $id) {
        id
        name
        deployKey
      }
    }
  `;

  if (!token) return { status: 'unauthorized' };

  try {
    const resp = await graphql(query, { id }, token);

    if (resp.status === 401) return { status: 'unauthorized', id };
    if (resp.status >= 400 && resp.status < 500)
      return { status: 'clientError', id };
    if (resp.status >= 500) return { status: 'serverError', id };

    const {
      data: { site }
    } = await resp.json();

    if (!site) return { status: 'notFound', id };
    return { status: 'ok', site, id };
  } catch (e) {
    return { status: 'serverError', id };
  }
};

export const revalidate = id => {
  const token = getToken();
  trigger(['site', id, token]);
};

export const useSite = (id, config = {}) => {
  const token = getToken();

  return useSWR(
    ['site', id, token],
    async (_, id, token) => await fetch(id, token),
    config
  );
};
