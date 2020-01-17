import useSWR, { trigger, mutate } from 'swr';
import { getToken } from 'utils/auth';
import { FormData, fetchForm } from 'data/query';

type Key = ['form', string, string] | null;

export const revalidate = (id: string) => {
  const token = getToken();
  trigger(['form', id, token]);
};

export const setInitialState = (id: string, data: FormData) => {
  const token = getToken();
  mutate(['form', id, token], data, false);
};

const useSiteData = (id: string, config = {}) => {
  const token = getToken();

  let key: Key = null;

  if (id && token) {
    key = ['form', id, token];
  }

  return useSWR(
    key,
    async (_, id, token) => await fetchForm(id, token),
    config
  );
};

export default useSiteData;
