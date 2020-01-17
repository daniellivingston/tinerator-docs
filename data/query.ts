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

interface Form {
  id: string;
  name: string;
  key: string;
  submissionCount: number;
  displayFields: string[];
}

interface Site {
  id: string;
  name: string;
  deployKey: string;
  forms: {
    edges: Array<{
      node: Form;
    }>;
  };
}

export type SiteData = { status: 'ok'; site: Site } | ErrorResponse;
export type FormData = { status: 'ok'; form: Form } | ErrorResponse;

const unauthorized: Unauthorized = { status: 'unauthorized' };
const serverError: ServerError = { status: 'serverError' };
const clientError: ClientError = { status: 'clientError' };
const notFound: NotFound = { status: 'notFound' };

/**
 * Fetches a site by id.
 *
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
              displayFields
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
      data: { site }
    } = await resp.json();

    if (!site) return notFound;
    return { status: 'ok', site };
  } catch (e) {
    return serverError;
  }
};

/**
 * Fetches a form by id.
 *
 * @param id - the form id
 * @param token - the auth token
 */
export const fetchForm = async (
  id: string,
  token: string
): Promise<FormData> => {
  const query = `
    query Form(
      $id: ID!
    ) {
      form(id: $id) {
        id
        key
        name
        submissionCount
        displayFields
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
      data: { form }
    } = await resp.json();

    if (!form) return notFound;
    return { status: 'ok', form };
  } catch (e) {
    return serverError;
  }
};
