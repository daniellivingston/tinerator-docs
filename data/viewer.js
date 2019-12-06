import useSWR from 'swr';
import graphql from '../utils/graphql';

export const fetch = async cookie => {
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
  return useSWR('viewer', async _ => await fetch(), config);
};

export default { useViewer, fetch };
