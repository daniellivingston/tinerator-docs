import useSWR, { trigger, mutate } from 'swr';
import graphql from '../utils/graphql';
import { getToken } from '../utils/auth';

export const fetch = async token => {
  const query = `
    query Viewer {
      viewer {
        email
        avatarUrl
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
      data: { viewer }
    } = await resp.json();

    if (!viewer) return { status: 'notFound' };
    return { status: 'ok', viewer };
  } catch (e) {
    return { status: 'serverError' };
  }
};

export const revalidate = token => {
  trigger(['viewer', token]);
};

export const prefetch = async token => {
  mutate(['viewer', token], await fetch(token));
};

export const useViewer = config => {
  const token = getToken();
  return useSWR(
    ['viewer', token],
    async (_, token) => await fetch(token),
    config
  );
};
