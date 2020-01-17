import useSWR, { trigger } from 'swr';
import { getToken } from 'utils/auth';
import { fetchSubmissions } from 'data/queries';

interface Variables {
  formId: string;
  before?: string;
  after?: string;
}

export const revalidate = (variables: Variables) => {
  const token = getToken();
  trigger([
    'submissions',
    variables.formId,
    variables.before,
    variables.after,
    token
  ]);
};

const useSubmissionsData = (variables: Variables, config = {}) => {
  const token = getToken();

  let key: ['submissions', string, string, string, string];

  if (variables.formId && token) {
    key = [
      'submissions',
      variables.formId,
      variables.before,
      variables.after,
      token
    ];
  } else {
    key = null;
  }

  return useSWR(
    key,
    async (_, formId, before, after, token) =>
      await fetchSubmissions({ formId, before, after }, token),
    config
  );
};

export default useSubmissionsData;
