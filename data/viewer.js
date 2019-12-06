import useSWR from 'swr';
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
  if (!token) return 'anonymous';
  const resp = await graphql(query, {}, token);

  if (resp.ok) {
    const body = await resp.json();
    return body.data.viewer;
  } else {
    return 'anonymous';
  }
};

export const useViewer = config => {
  return useSWR('viewer', async _ => await fetch(), config);
};

export default { useViewer, fetch };
