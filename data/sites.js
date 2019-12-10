import useSWR, { trigger } from 'swr';
import graphql from '../utils/graphql';
import { getToken } from '../utils/auth';

export const fetch = async token => {
  const query = `
    query Sites {
      sites(first: 1000) {
        edges {
          node {
            id
            name
            deployKey
          }
        }
      }
    }
  `;

  if (!token) return { status: 'unauthorized' };

  try {
    const resp = await graphql(query, {}, token);

    if (resp.status === 401) return { status: 'unauthorized' };
    if (resp.status >= 400 && resp.status < 500)
      return { status: 'clientError' };
    if (resp.status >= 500) return { status: 'serverError' };

    const {
      data: { sites }
    } = await resp.json();

    return { status: 'ok', sites };
  } catch (e) {
    return { status: 'serverError' };
  }
};

export const revalidate = () => {
  const token = getToken();
  trigger(['sites', token]);
};

export const useSites = (config = {}) => {
  const token = getToken();

  return useSWR(
    ['sites', token],
    async (_, token) => await fetch(token),
    config
  );
};
