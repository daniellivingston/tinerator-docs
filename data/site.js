import useSWR, { trigger } from 'swr';
import graphql from '../utils/graphql';
import { getToken } from '../utils/auth';

export const fetch = async (id, context) => {
  const query = `
    query Site(
      $id: String
    ) {
      site(id: $id) {
        id
        name
      }
    }
  `;

  const token = getToken(context);
  if (!token) return null;
  const resp = await graphql(query, { id }, token);

  if (resp.ok) {
    const { data } = await resp.json();
    return data;
  } else {
    return null;
  }
};

export const revalidate = id => {
  trigger(['site', id]);
};

export const useSiteData = (id, config) => {
  return useSWR(['site', id], async (_, id) => await fetch(id), config);
};

export default { useSiteData, fetch, revalidate };
