import { graphql } from 'utils/graphql';

type Ok<T> = { status: 'ok' } & T;

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

interface Viewer {
  email: string;
  avatarUrl: string;
  defaultSite: {
    id: string;
  };
}

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

export type ViewerData = Ok<{ viewer: Viewer }> | ErrorResponse;
export type SiteData = Ok<{ site: Site }> | ErrorResponse;
export type FormData = Ok<{ form: Form }> | ErrorResponse;

const unauthorized: Unauthorized = { status: 'unauthorized' };
const serverError: ServerError = { status: 'serverError' };
const clientError: ClientError = { status: 'clientError' };
const notFound: NotFound = { status: 'notFound' };

/**
 * Fetches the currently logged-in viewer.
 *
 * @param token - the auth token
 */
export const fetchViewer = async (token: string): Promise<ViewerData> => {
  const query = `
    query Viewer {
      viewer {
        email
        avatarUrl
        defaultSite {
          id
        }
      }
    }
  `;

  if (!token) return unauthorized;

  try {
    const resp = await graphql(query, {}, token);

    if (resp.status >= 400) {
      if (resp.status === 401) return unauthorized;
      if (resp.status < 500) return clientError;
      return serverError;
    }

    const {
      data: { viewer }
    } = await resp.json();

    if (!viewer) return notFound;
    return { status: 'ok', viewer };
  } catch (e) {
    return serverError;
  }
};

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
