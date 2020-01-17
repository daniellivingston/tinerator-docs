import { graphql } from 'utils/graphql';

interface Unauthorized {
  status: 'unauthorized';
}

interface ServerError {
  status: 'serverError';
}

interface ClientError {
  status: 'clientError';
}

interface NotFound {
  status: 'notFound';
}

type ErrorResponse = Unauthorized | ServerError | ClientError | NotFound;

interface Site {
  id: string;
  name: string;
  deployKey: string;
  forms: {
    edges: Array<{
      node: {
        id: string;
        name: string;
        key: string;
        submissionCount: number;
      };
    }>;
  };
}

export type SiteData = { status: 'ok'; site: Site } | ErrorResponse;

const unauthorized: Unauthorized = { status: 'unauthorized' };
const serverError: ServerError = { status: 'serverError' };
const clientError: ClientError = { status: 'clientError' };
const notFound: NotFound = { status: 'notFound' };

/**
 * Fetches a site by id.
 * @param id - the site id
 * @param token - the auth token
 */
export const fetchSite = async (
  id: string,
  token: string
): Promise<SiteData> => {
  const query = `
    query Site(
      $id: String
    ) {
      site(id: $id) {
        id
        name
        deployKey
        forms(first: 100) {
          edges {
            node {
              id
              name
              key
              submissionCount
            }
          }
        }
      }
    }
  `;

  if (!token) return unauthorized;

  try {
    const resp = await graphql(query, { id }, token);

    if (resp.status >= 400) {
      if (resp.status === 401) return unauthorized;
      if (resp.status < 500) return clientError;
      return serverError;
    }

    const {
      data: { site: site }
    } = await resp.json();

    if (!site) return notFound;
    return { status: 'ok', site };
  } catch (e) {
    return serverError;
  }
};
