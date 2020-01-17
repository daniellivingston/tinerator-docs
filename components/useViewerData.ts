import useSWR, { trigger, mutate } from 'swr';
import { getToken } from 'utils/auth';
import { ViewerData, fetchViewer } from 'data/query';

export const revalidate = (id: string) => {
  const token = getToken();
  trigger(['viewer', token]);
};

export const setInitialState = (data: ViewerData) => {
  const token = getToken();
  mutate(['viewer', token], data, false);
};

export const prefetch = async (token: string) => {
  mutate(['viewer', token], await fetchViewer(token));
};

const useViewerData = (config = {}) => {
  const token = getToken();

  return useSWR(
    ['viewer', token],
    async (_, token) => await fetchViewer(token),
    config
  );
};

export default useViewerData;
