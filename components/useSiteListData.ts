import useSWR, { trigger, mutate } from 'swr';
import { getToken } from 'utils/auth';
import { SiteListData, fetchSiteList } from 'data/queries';

export const revalidate = () => {
  const token = getToken();
  trigger(['siteList', token]);
};

export const setInitialState = (data: SiteListData) => {
  const token = getToken();
  mutate(['siteList', token], data, false);
};

const useSiteListData = (config = {}) => {
  const token = getToken();

  return useSWR(
    ['siteList', token],
    async (_, token) => await fetchSiteList(token),
    config
  );
};

export default useSiteListData;
