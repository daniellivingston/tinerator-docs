import useSWR, { trigger } from 'swr';
import graphql from '../utils/graphql';
import { getToken } from '../utils/auth';

export const fetch = async context => {
  const query = `
    query Viewer {
      viewer {
        email
        avatarUrl
      }
    }
  `;

  const token = getToken(context);
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

export const revalidate = () => {
  trigger('viewer');
};

export const useViewer = config => {
  return useSWR('viewer', async _ => await fetch(), config);
};
