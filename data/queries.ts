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

interface Account {
  subscriptionState:
    | 'NONE'
    | 'TRIALING'
    | 'ACTIVE'
    | 'PAST_DUE'
    | 'CANCELED'
    | 'UNPAID'
    | 'INCOMPLETE'
    | 'INCOMPLETE_EXPIRED';
  planName: string;
  requestLimit: number;
  sandbox: boolean;
  currentPeriodStart: string;
  currentPeriodEnd: string;
}

interface Site {
  id: string;
  name: string;
  deployKey: string;
  account: Account;
  forms: {
    edges: Array<{
      node: Form;
    }>;
  };
}

interface SiteList {
  edges: Array<{
    node: {
      id: string;
      name: string;
      deployKey: string;
    };
  }>;
}

interface Submissions {
  pageInfo: {
    hasPrevPage: boolean;
    hasNextPage: boolean;
    startCursor: string;
    endCursor: string;
  };
  edges: Array<{
    node: {
      id: string;
      data: {
        name: string;
        value: string;
      };
      occurredAt: string;
    };
  }>;
}

interface Usage {
  invocations: number;
  submissions: number;
}

export type ViewerData = Ok<{ viewer: Viewer }> | ErrorResponse;
export type SiteData = Ok<{ site: Site }> | ErrorResponse;
export type FormData = Ok<{ form: Form }> | ErrorResponse;
export type SiteListData = Ok<{ sites: SiteList }> | ErrorResponse;
export type SubmissionsData = Ok<{ submissions: Submissions }> | ErrorResponse;
export type UsageData = Ok<{ usage: Usage }> | ErrorResponse;

const unauthorized: Unauthorized = { status: 'unauthorized' };
const serverError: ServerError = { status: 'serverError' };
const clientError: ClientError = { status: 'clientError' };
const notFound: NotFound = { status: 'notFound' };

interface SubmissionsInput {
  formId: string;
  before?: string;
  after?: string;
}

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
        account {
          subscriptionState
          planName
          requestLimit
          sandbox
          currentPeriodStart
          currentPeriodEnd
        }
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

/**
 * Fetches sites accessible by the logged-in user.
 *
 * @param token - the auth token
 */
export const fetchSiteList = async (token: string): Promise<SiteListData> => {
  const query = `
    query Sites {
      sites(first: 1000) {
        edges {
          node {
            id
            name
            deployKey
          }
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
      data: { sites }
    } = await resp.json();

    if (!sites) return notFound;
    return { status: 'ok', sites };
  } catch (e) {
    return serverError;
  }
};

/**
 * Fetches a form submissions.
 *
 * @param props
 */
export const fetchSubmissions = async (
  { formId, before, after }: SubmissionsInput,
  token: string
): Promise<SubmissionsData> => {
  const forwardQuery = `
    query Submissions(
      $formId: ID!,
      $first: Int,
      $after: String
    ) {
      form(id: $formId) {
        submissions(
          first: $first,
          after: $after
        ) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              data {
                name
                value
              }
              occurredAt
            }
          }
        }
      }
    }
  `;

  const backwardQuery = `
    query Submissions(
      $formId: ID!,
      $last: Int,
      $before: String,
    ) {
      form(id: $formId) {
        submissions(
          last: $last,
          before: $before,
        ) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
          edges {
            node {
              id
              data {
                name
                value
              }
              occurredAt
            }
          }
        }
      }
    }
  `;

  if (!token) return unauthorized;

  const query = before ? backwardQuery : forwardQuery;
  const [first, last] = before ? [null, 50] : [50, null];

  // try {
  const resp = await graphql(
    query,
    { formId, first, last, before, after },
    token
  );

  if (resp.status >= 400) {
    if (resp.status === 401) return unauthorized;
    if (resp.status < 500) return clientError;
    return serverError;
  }

  const {
    data: {
      form: { submissions }
    }
  } = await resp.json();

  if (!submissions) return notFound;
  return { status: 'ok', submissions };
  // } catch (e) {
  //   return serverError;
  // }
};

/**
 * Fetches site usage metrics.
 *
 * @param id - the site id
 * @param token - the auth token
 */
export const fetchUsage = async (
  id: string,
  token: string
): Promise<UsageData> => {
  const query = `
    query Site(
      $id: String
    ) {
      site(id: $id) {
        usage {
          invocations
          submissions
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
      data: {
        site: { usage }
      }
    } = await resp.json();

    if (!usage) return notFound;
    return { status: 'ok', usage };
  } catch (e) {
    return serverError;
  }
};
