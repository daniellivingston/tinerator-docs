import useSWR from 'swr';
import graphql from '../utils/graphql';

export const fetcher = async (_, cookie) => {
  const query = `
    query Viewer {
      viewer {
        email
        avatarUrl
      }
    }
  `;

  const resp = await graphql(query, {}, { cookie });

  if (resp.ok) {
    const body = await resp.json();
    return body.data.viewer;
  } else {
    return 'anonymous';
  }
};

export const useViewer = config => {
  // Cookies are automatically included in client-side requests
  // The authentication cookie is set as HttpOnly, so it's not accessible
  // from JavaScript.
  const cookie = undefined;
  return useSWR(['viewer', cookie], fetcher, config);
};
