import useSWR, { trigger, mutate } from 'swr';
import { getToken } from 'utils/auth';
import { UsageData, fetchUsage } from 'data/queries';

type Key = ['usage', string, string] | null;

export const revalidate = (id: string) => {
  const token = getToken();
  trigger(['usage', id, token]);
};

export const setInitialState = (id: string, data: UsageData) => {
  const token = getToken();
  mutate(['usage', id, token], data, false);
};

const useUsageData = (id: string, config = {}) => {
  const token = getToken();

  let key: Key = null;

  if (id && token) {
    key = ['usage', id, token];
  }

  return useSWR(
    key,
    async (_, id, token) => await fetchUsage(id, token),
    config
  );
};

export default useUsageData;
