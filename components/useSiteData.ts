import useSWR, { trigger, mutate } from 'swr';
import { getToken } from 'utils/auth';
import { SiteData, fetchSite } from 'data/queries';

type Key = ['site', string, string] | null;

export const revalidate = (id: string) => {
  const token = getToken();
  trigger(['site', id, token]);
};

export const setInitialState = (id: string, data: SiteData) => {
  const token = getToken();
  mutate(['site', id, token], data, false);
};

const useSiteData = (id: string, config = {}) => {
  const token = getToken();

  let key: Key = null;

  if (id && token) {
    key = ['site', id, token];
  }

  return useSWR(
    key,
    async (_, id, token) => await fetchSite(id, token),
    config
  );
};

export default useSiteData;
